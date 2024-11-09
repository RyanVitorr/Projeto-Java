let dataLivros;

const fetchAjax = ()=>{
    $.ajax({
        url: 'livro/livro',
        type: 'GET',
        cache: false,
        success: function(data) {
            console.log(data);
            dataLivros = data;
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição:', xhr.responseText);
            reject(error); 
        }
    });
    
};

$(document).ready(function() { 
    $('body').on('click', '.navbar ul li a:contains("Emprestimo"), #alugarLivro', function () {
        $('.navbar ul li a').removeClass('toggleBackground');
        $('.navbar ul li a:contains("Emprestimo")').addClass('toggleBackground');

        if($('#formEmprestarLivro').length > 0){
            return;
        }
        fetchAjax();

        $('.main-content').html(`
                    <form id="formEmprestarLivro">
                        
                        <div class="container-form">
                            <section id="section-form-container" >
                                <h3>Emprestar Livro</h3>
                                <div id="container-section-form">
                                    <div>
                                        <label for="clientePesquisa">Pesquisar Cliente:</label>
                                        <input type="text" id="clientePesquisa" placeholder="Pesquise o cliente...">
                                        <ul id="clienteLista"></ul>

                                        <div class="container-form-cadastroCliente">
                                            <div>
                                                <label for="nomeCompleto">Nome Completo:</label>
                                                <input type="text" id="nomeCompleto" name="nomeCompleto" required>
                                            </div>
                                            
                                            <div>
                                                <label for="email">Email:</label>
                                                <input type="email" id="email" name="email" required>
                                            </div>
                                        </div>

                                        <div class="container-form-cadastroCliente">
                                            <div>
                                                <label for="cpf">CPF:</label>
                                                <input type="text" id="cpf" name="cpf" required>
                                            </div>

                                            <div>
                                                <label for="telefone">Telefone:</label>
                                                <input type="text" id="telefone" name="telefone" required>
                                            </div>

                                            <div>
                                                <label for="idade">Nascimento:</label>
                                                <input type="date" id="idade" name="idade" required>
                                            </div>
                                        </div>
                                        
                                        <label for="endereco">Endereço:</label>
                                        <input type="text" id="endereco" name="endereco" required>
                                            
                                    </div>
                                    <div>
                                        <label for="livroPesquisa">Pesquisar Livro:</label>
                                        <input type="text" id="livroPesquisa" placeholder="Pesquise o livro...">
                                        <div class="div-lista-relative"><ul id="livroLista"></ul></div>
                                        

                                        
                                        <div id="container-lista-livros"></div>

                                       
                                        <div id="div-principal-preco-mes">
                                            <div id="contain-preco-mes">
                                                <div id="div-mes">
                                                    <label for="tempoAluguel">Tempo de aluguel:</label>
                                                    <select id="tempoAluguel">
                                                        <option value="1">1 Mês</option>
                                                        <option value="2">2 Meses</option>
                                                        <option value="3">3 Meses</option>
                                                    </select>
                                                </div>
                                                <div id="div-total-p">
                                                    <span>Total: </span>
                                                    <p id="precoTotalContain"></p>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                </div>
                            </section>

                            <section id="section-pagamento-container">
                                <h3>Metodos de pegamento</h3>
                                <div id="container-section-pagamento">FAZENDO HTML!!!</div>
                            </section>
                        </div>
                        <button type="submit">Confirmar Empréstimo</button>
                    </form>
        `);
    
        $('#cancelBtnP').off('click').on('click', function () {
            console.log("clicou")
            $('.container-form-transp').remove();
        });


        
        $("#section-form-container h3").click(function() {
            $("#container-section-form").slideToggle(); 
            $("#container-section-form").toggleClass("expanded"); 
        });

        $("#section-pagamento-container h3").click(function() {
            $("#container-section-pagamento").slideToggle(); 
            $("#container-section-pagamento").toggleClass("expanded"); 
        });
        
        // Adiciona evento para pesquisa de cliente (exemplo básico)
        $('#clientePesquisa').on('input', function() {
            const searchValue = $(this).val().toLowerCase();
            const filteredClients = dataClientes.filter(client => 
                client.nome.toLowerCase().includes(searchValue)
            );
    
            if (filteredClients.length > 0) {
                let clientListHtml = "";
                filteredClients.forEach(client => {
                    clientListHtml += `
                        <li data-nome="${client.nome}" data-cpf="${client.cpf}" data-telefone="${client.telefone}">
                            <strong>Nome:</strong> ${client.nome} <br>
                            <strong>CPF:</strong> ${client.cpf} <br>
                            <strong>Telefone:</strong> ${client.telefone}
                        </li>
                    `;
                });
                $('#clienteLista').html(clientListHtml); 
            } else {
                $('#clienteLista').html('<li>Nenhum cliente encontrado</li>');
            }
    
            $('#clienteLista li').on('click', function() {
                $('#nomeCliente').val($(this).data('nome'));
                $('#cpfCliente').val($(this).data('cpf'));
                $('#telefoneCliente').val($(this).data('telefone'));
                $('#clienteLista').html('');
            });
        });
    
        // Adiciona evento para pesquisa de livro (usando os dados já recebidos)
        $('#livroPesquisa').on('input', function() {
            let precoLivro;
            console.log("input livro");
            console.log(dataLivros);
            const searchValue = $(this).val().toLowerCase();
            const filteredLivros = dataLivros.filter(livro => 
                livro.nome.toLowerCase().includes(searchValue)
            );
            console.log(searchValue);
            console.log(filteredLivros);
    
            if (filteredLivros.length > 0) {
                let livroListHtml = "";
                filteredLivros.forEach(livro => {
                    livroListHtml += `
                        <li data-id="${livro.idLivro}" data-nome="${livro.nome}" data-autor="${livro.autor}" data-idade="${livro.idadeIndicativa}" data-genero="${livro.genero}" data-preco="${livro.preco}" data-qtd="${livro.qtdDisponivel}">
                            <strong>Nome:</strong> ${livro.nome} <br>
                            <strong>Autor:</strong> ${livro.autor} <br>
                            <strong>Idade Indicativa:</strong> ${livro.idadeIndicativa} <br>
                            <strong>Gênero:</strong> ${livro.genero} <br>
                            <strong>Preço:</strong> ${livro.preco} <br>
                            <strong>Qtd Disponível:</strong> ${livro.qtdDisponivel}<br>
                        </li>
                    `;
                });
                $('#livroLista').html(livroListHtml);  
            } else {
                $('#livroLista').html('<li>Nenhum livro encontrado</li>');  
            }
    
            $('#livroLista li').on('click', function() {
                let idLivro = $(this).data('id');
                let nomeLivro = $(this).data('nome');
                let nomeAutor = $(this).data('autor');
                let generoLivro = $(this).data('genero');
                let precoLivro = $(this).data('preco'); 
                let precoFormatado = precoLivro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
                let html = `
                    <div class="contain-livro" data-id="${idLivro}" data-precoUni="${precoLivro}">
                        <div class="id-contain">
                            <span>Id</span>
                            <p class="idLivroEmprestimo">${idLivro}</p>
                        </div>
        
                        <div class="nome-contain">
                            <span>Nome livro</span>
                            <p class="nomeLivroEmprestimo">${nomeLivro}</p>
                        </div>
        
                        <div class="autor-contain">
                            <span>Autor</span>
                            <p class="autorLivroEmprestimo">${nomeAutor}</p>
                        </div>
        
                        <div class="genero-contain">
                            <span>Gênero</span>
                            <p class="generoLivroEmprestimo">${generoLivro}</p>
                        </div>
        
                        <div class="preco-contain">
                            <span>Preço</span>
                            <p class="precoFormLivroEmprestimo">${precoFormatado}</p>
                        </div>
        
                        <div class="qtd-contain">
                            <span>Quantidade:</span>
                            <input type="number" class="qtdDesejadaEmprestimo" name="qtdDesejadaEmprestimo" min="1" value="1">
                        </div>
        
                    </div>
                `;
        
                $("#container-lista-livros").append(html);
        
                $('#livroLista').html('');
        
                
                const calcularPrecoPorDuracao = (meses)=>{
                    switch (meses) {
                        case 1: return 5.00;
                        case 2: return 9.00;
                        case 3: return 12.00;
                        default: return 0;
                    }
                }
                   
                const calcularTaxaExtra = (quantidadeLivros)=>{
                    return (quantidadeLivros - 1) * 1.00;
                }
        
                const calcularTotal = () => {
                    console.log("executou calcularTotal");
                    let totalGeral = 0;

                    let quantidadeInput = parseInt($(this).find('.qtdDesejadaEmprestimo').val());
                
                    let meses = parseInt($('#tempoAluguel').val());
                
                    if (isNaN(meses)) {
                        console.warn("Tempo de aluguel inválido.");
                        return;
                    }
                
                    $('.contain-livro').each(function(index) {
                        let quantidade = parseInt($(this).find('.qtdDesejadaEmprestimo').val());
                        
                        if (!isNaN(quantidade)) { 
                            if(quantidade < 1){
                                quantidade = 1;
                                $(this).find('.qtdDesejadaEmprestimo').val(quantidade);
                            }
                            let precoPorMeses = calcularPrecoPorDuracao(meses);
                            let precoLivroTotal = quantidade * precoPorMeses;
                
                            
                            let taxaExtra = (quantidade - 1) * 1.50; 
                            let valorTotalComTaxa = precoLivroTotal + taxaExtra;
                
                            console.log(`Valor total com taxa para livro: ${valorTotalComTaxa}`);
                            $(this).find('.precoFormLivroEmprestimo').html(valorTotalComTaxa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
                            
                            totalGeral += valorTotalComTaxa;
                        } else {
                            console.warn("Erro ao calcular: quantidade inválida.");
                        }
                    });
                    
                    $('#precoTotalContain').html(`${totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
                };
        
                
                $('#container-lista-livros').off('input').on('input', '.qtdDesejadaEmprestimo', calcularTotal);
                $('#container-lista-livros').off('change').on('change', '#tempoAluguel', calcularTotal);
                calcularTotal();
        
            });

           
        });
    }); 

});
