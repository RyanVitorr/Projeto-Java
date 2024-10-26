$(document).ready(function () {
    // Função para gerar o HTML dinamicamente
    $('.navbar ul li a:contains("Dashboard")').off('click').on('click', function() {
        const dashboardHTML = `
            <div class="dashboard-container">
                <div class="dashboard-header">
                    <h1>Dashboard Biblioteca</h1>
                    <div class="date-filter">
                        <label for="dateRange">Filtrar por Data:</label>
                        <input type="date" id="startDate" placeholder="Data de Início"> 
                        <input type="date" id="endDate" placeholder="Data de Fim">
                        <button id="filterBtn">Filtrar</button>
                    </div>
                </div>

                <div class="stats-container">
                    <div class="stat-card total-livros">
                        <h3>Total de Livros Alugados</h3>
                        <p id="totalLivrosAlugados">0</p>
                    </div>
                    <div class="stat-card total-recebido">
                        <h3>Total Recebido</h3>
                        <p id="totalRecebido">R$ 0,00</p>
                    </div>
                    <div class="stat-card total-atraso">
                        <h3>Total de Livros em Atraso</h3>
                        <p id="totalAtraso">0</p>
                    </div>
                </div>

                <div class="charts-container">
                    <h3>Livros Devolvidos / Em Atraso</h3>
                    <canvas id="devolucaoAtrasoChart"></canvas>
                </div>
            </div>
        `;
        $('.main-content').html(dashboardHTML); // Insere o HTML no elemento dashboard
        
        // Chama a função para buscar os dados via AJAX após o HTML ser inserido
        fetchDashboardData();
    });

    // Função para atualizar os dados do dashboard
    function updateDashboard(data) {
        $('#totalLivrosAlugados').text(data.totalLivrosAlugados);
        $('#totalRecebido').text(`R$ ${data.totalRecebido.toFixed(2)}`);
        $('#totalAtraso').text(data.totalAtraso);
        renderChart(data.devolvidos, data.atrasados);
    }

    // Função para renderizar o gráfico
    function renderChart(devolvidos, atrasados) {
        const ctx = document.getElementById('devolucaoAtrasoChart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Devolvidos', 'Atrasados'],
                datasets: [{
                    label: 'Livros',
                    data: [devolvidos, atrasados],
                    backgroundColor: ['#28a745', '#dc3545'],
                    borderColor: ['#28a745', '#dc3545'],
                    borderWidth: 2,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                size: 14,
                                family: 'Arial'
                            }
                        }
                    },
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }

    // Função para buscar os dados do dashboard via AJAX
    function fetchDashboardData(dataEmprestimo) {
        $.ajax({
            url: 'livros/dashboard', 
            type: 'GET',
            data: {
                dataEmprestimo: dataEmprestimo || null, 
            },
            success: function (data) {
                updateDashboard(data); 
            },
            error: function (xhr, status, error) {
                console.error('Erro ao buscar dados do dashboard:', error);
            }
        });
    }
    
    

    // Função para filtrar por data
    $('.main-content').on('click', '#filterBtn', function () {
        const startDate = $('#startDate').val();
        const endDate = $('#endDate').val();

        // Faz a requisição AJAX para obter os dados filtrados
        fetchDashboardData(startDate, endDate);
    });
});
