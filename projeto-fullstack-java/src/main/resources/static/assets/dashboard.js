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
                        <h3>Total de Livros</h3>
                        <p id="totalLivros">0</p>
                    </div>
                
                    <div class="stat-card total-livros">
                        <h3>Total de Livros Alugados</h3>
                        <p id="totalLivrosAlugados">0</p>
                    </div>
                 
                    <div class="stat-card total-atraso">
                        <h3>Total de Livros em Atraso</h3>
                        <p id="totalAtraso">0</p>
                    </div>

                    <div class="stat-card total-recebido">
                        <h3>Total Recebido</h3>
                        <p id="totalRecebido">R$ 0,00</p>
                    </div>

                    <div class="stat-card total-arecer">
                        <h3>Total a receber pelos atrasos</h3>
                        <p id="totalAreceber">R$ 0,00</p>
                    </div>

                </div>
    
                <h3 id="alugueis-table-title">Histórico de Aluguéis</h3>
                <div class="table-container table-dashboard">
                   
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nome do Usuário</th>
                                <th>Email</th>
                                <th>ID do Livro</th>
                                <th>Nome do Livro</th>
                                <th>Data do Empréstimo</th>
                                <th>Data de Devolução</th>
                            </tr>
                        </thead>
                        <tbody id="tbody" class="list">
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        $('.main-content').html(dashboardHTML); // Insere o HTML no elemento dashboard
        
        // Chama a função para buscar os dados via AJAX após o HTML ser inserido
        fetchDashboardData();
    });

    // Função para atualizar os dados do dashboard
    function updateDashboard(data) {
        $('#totalLivros').text(data[0].totaLivros);
        $('#totalLivrosAlugados').text(data[0].totaLivrosAlugados);
        $('#totalRecebido').text(`R$ ${data[0].livrosAtrasados.toFixed(2)}`);
        $('#totalAtraso').text(data[0].livrosAtrasados);
        $('#totalAreceber').text(`R$ ${data[0].livrosAtrasados.toFixed(2)}`);
        
        data.forEach(emprestimo => {
            console.log('Empréstimo:', emprestimo); // Verifique o que está sendo iterado
            const row = `
                <tr>
                    <td>${emprestimo.usuario.nome}</td>
                    <td>${emprestimo.usuario.email}</td>
                    <td>${emprestimo.livro.idLivro}</td>
                    <td>${emprestimo.livro.nome}</td>
                    <td>${new Date(emprestimo.dataEmprestimo).toLocaleDateString('pt-BR')}</td>
                    <td>${emprestimo.dataDevolucao ? new Date(emprestimo.dataDevolucao).toLocaleDateString('pt-BR') : 'Não Devolvido'}</td>
                </tr>
            `;
            $('#tbody').append(row);
        });
    };

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
            url: '/emprestimos/dashboard', 
            type: 'GET',
            data: {
                dataEmprestimo: dataEmprestimo || null, 
            },
            success: function (data) {
                console.log(data);
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
