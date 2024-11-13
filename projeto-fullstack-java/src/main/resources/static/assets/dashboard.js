$(document).ready(function () {

    $('.navbar ul li a:contains("Dashboard")').off('click').on('click', function() {
        generetHtml();
    });

    const generetHtml = ()=>{
        $('.navbar ul li a').removeClass('toggleBackground');
        $('.navbar ul li a:contains("Dashboard")').addClass('toggleBackground');
        const dashboardHTML = `
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h1>Dashboard Biblioteca</h1>
            </div>

            <div class="stats-container">
                <div class="stat-card total-livros">
                    <h3>Total de Livros</h3>
                    <p id="totalLivros">0</p>
                </div>

                <div class="stat-card total-usuarios">
                    <h3>Total de Clientes</h3>
                    <p id="totalClientes">0</p>
                </div>
            
            
                <div class="stat-card total-livros-alugados">
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

                <div class="stat-card total-a-receber">
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
                            <th>Preço</th>
                            <th>Qtd</th>
                            <th>Data Empréstimo</th>
                            <th>Data Devolução</th>
                            <th>Data prev Devolução</th>
                            <th>Multa</th>
                        </tr>
                    </thead>
                    <tbody id="tbody" class="list">
                    </tbody>
                </table>
            </div>
        </div>`;

        $('.main-content').html(dashboardHTML); 
        
       
        fetchDashboardData(null);
        fetchDashboardHistorico(null);
    };

  
    function updateDashboard(data, historico) {
        console.log("chamou update");
        console.log("data é: " + data);
        console.log("historico é: " + historico);
    
        if (data && data.length > 0) {
            $('#totalLivros').text(data[0].totalLivros);
            $('#totalLivrosAlugados').text(data[0].totaLivrosAlugados);
            $('#totalRecebido').text(`R$ ${data[0].lucroTotal.toFixed(2)}`);
            $('#totalAtraso').text(data[0].livrosAtrasados);
            $('#totalClientes').text(data[0].totalUsuarios);
        }
    
        if (historico && Array.isArray(historico)) {
            let totalMulta = 0;
            console.log("verificou historico");
            historico.forEach(emprestimo => {
                console.log('Empréstimo:', emprestimo); 
                const row = `
                    <tr>
                        <td>${emprestimo.usuario.nome}</td>
                        <td>${emprestimo.usuario.email}</td>
                        <td>${emprestimo.livro.idLivro}</td>
                        <td>${emprestimo.livro.nome}</td>
                        <td>R$ ${emprestimo.preco.toFixed(2)}</td>
                        <td>${emprestimo.quantidade}</td>
                        <td>${new Date(emprestimo.dataEmprestimo).toLocaleDateString('pt-BR')}</td>
                        <td>${emprestimo.dataDevolucao ? new Date(emprestimo.dataDevolucao).toLocaleDateString('pt-BR') : 'Não Devolvido'}</td>
                        <td>${new Date(emprestimo.dataPrevDevolucao).toLocaleDateString('pt-BR')}</td>
                        <td>R$ ${emprestimo.valorMulta.toFixed(2)}</td>
                    </tr>
                `;
                totalMulta = totalMulta + emprestimo.valorMulta;
                $('#tbody').append(row);
            });
    
            $('#totalAreceber').text(`R$ ${totalMulta.toFixed(2)}`);
        }
    }
    
    function fetchDashboardData(dataEmprestimo) {
        console.log("no fetch data: " + dataEmprestimo)
        $.ajax({
            url: '/emprestimos/dadosDash', 
            method: 'GET',  
            data: {
                dataEmprestimo: dataEmprestimo || null, 
            },
            success: function (data) {
                console.log(data);
                updateDashboard(data, null); 
            },
            error: function (xhr, status, error) {
                console.error('Erro ao buscar dados do dashboard:', error);
            }
        });
    }
    
    function fetchDashboardHistorico(dataEmprestimo) {
        $.ajax({
            url: '/emprestimos/historico', 
            method: 'GET',  
            data: {
                dataEmprestimo: dataEmprestimo || null, 
            },
            success: function (historico) {
                updateDashboard(null, historico); 
            },
            error: function (xhr, status, error) {
                console.error('Erro ao buscar dados do dashboard:', error);
            }
        });
    }
    
    // Função para filtrar por data
    $('.main-content').on('click', '#filterBtn', function () {
        const startDate = $('#startDate').val();  
        console.log(startDate);
    
        if (startDate) {
            fetchDashboardData(startDate);  
            fetchDashboardHistorico(startDate);  
        } else {
            console.error("Data de início não selecionada.");
        }
    });
    generetHtml();
});
