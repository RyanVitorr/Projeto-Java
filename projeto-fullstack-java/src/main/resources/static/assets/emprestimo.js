let dataLivros;

const fetchAjax = ()=>{
    $.ajax({
        url: 'livro/todos',
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
                        <h3>Emprestar Livro</h3>
                        <div class="container-form">
                            <section id="section-form-container" >
                                
                                <div id="container-section-form">
                                    <div>
                                        <label for="clientePesquisa">Pesquisar Cliente:</label>
                                        <input type="text" id="clientePesquisa" placeholder="Pesquise o cliente...">
                                        <ul id="clienteLista"></ul>

                                        <label for="nomeCliente">Nome Completo:</label>
                                        <input type="text" id="nomeCliente" name="nomeCliente" readonly>

                                        <label for="cpfCliente">CPF:</label>
                                        <input type="text" id="cpfCliente" name="cpfCliente" readonly>

                                        <label for="telefoneCliente">Telefone:</label>
                                        <input type="text" id="telefoneCliente" name="telefoneCliente" readonly>
                                    </div>
                                    <div>
                                        <label for="livroPesquisa">Pesquisar Livro:</label>
                                        <input type="text" id="livroPesquisa" placeholder="Pesquise o livro...">
                                        <ul id="livroLista"></ul>

                                        <label for="idLivroEmprestimo">Id do Livro:</label>
                                        <input type="text" id="idLivroEmprestimo" name="idLivroEmprestimo" readonly>

                                        <label for="nomeLivroEmprestimo">Nome do Livro:</label>
                                        <input type="text" id="nomeLivroEmprestimo" name="nomeLivroEmprestimo" readonly>

                                        <label for="autorLivroEmprestimo">Autor:</label>
                                        <input type="text" id="autorLivroEmprestimo" name="autorLivroEmprestimo" readonly>

                                        <label for="idadeIndicativaEmprestimo">Idade Indicativa:</label>
                                        <input type="number" id="idadeIndicativaEmprestimo" name="idadeIndicativaEmprestimo" readonly>

                                        <label for="generoLivroEmprestimo">Gênero:</label>
                                        <input type="text" id="generoLivroEmprestimo" name="generoLivroEmprestimo" readonly>

                                        <label for="precoFormLivroEmprestimo">Preço:</label>
                                        <input type="text" id="precoFormLivroEmprestimo" name="precoFormLivroEmprestimo">

                                        <label for="qtdDesejadaEmprestimo">Quantidade:</label>
                                        <input type="number" id="qtdDesejadaEmprestimo" name="qtdDesejadaEmprestimo" min="1">
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
                $('#idLivroEmprestimo').val($(this).data('id'));
                $('#nomeLivroEmprestimo').val($(this).data('nome'));
                $('#autorLivroEmprestimo').val($(this).data('autor'));
                $('#idadeIndicativaEmprestimo').val($(this).data('idade'));
                $('#generoLivroEmprestimo').val($(this).data('genero'));
                let precoLivroOrig = parseFloat($(this).data('preco'));
                let precoFormatado = precoLivroOrig.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                $('#precoFormLivroEmprestimo').val(precoFormatado);
                precoLivro = precoLivroOrig ;
                console.log(precoLivro);
                $('#qtdDesejadaEmprestimo').val(1);
                $('#livroLista').html('');
            });

            $('#qtdDesejadaEmprestimo').on('input', function() {
                let quantidade = $(this).val();
                if(quantidade <= 0){
                    quantidade = 1;
                    $('#qtdDesejadaEmprestimo').val(quantidade);
                }
                console.log("input click");
                if (!isNaN(quantidade) && !isNaN(precoLivro)) {
                    let valorTotal = quantidade * precoLivro;
                    console.log(valorTotal);
                    $('#precoFormLivroEmprestimo').val(valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })); 
                }
            });
        });
    }); 

});
