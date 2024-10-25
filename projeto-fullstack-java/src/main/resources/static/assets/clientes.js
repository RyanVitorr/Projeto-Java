$(document).ready(function() {
    // Quando clicar na opção "Clientes" no menu lateral
    let dataClientes;
    let dataEmprestimos;

    $('.navbar ul li a:contains("Clientes")').on('click', function() {

        $.ajax({
            url: 'emprestimos/todos',
            type: 'GET',
            cache: false,
            success: function(data) {
                console.log("Dados recebidos:", data);  
                dataEmprestimos = data;
            },
            error: function(xhr, status, error) {
                console.error('Erro na requisição:', xhr.responseText); 
                reject(error);     
            }
        });

        $.ajax({
            url: 'usuarios/todos',
            type: 'GET',
            cache: false,
            success: function(data) {
                console.log("Dados recebidos:", data);  
                dataClientes = data;
            },
            error: function(xhr, status, error) {
                console.error('Erro na requisição:', xhr.responseText); 
                reject(error);     
            }
        });
        
        $('.main-content').html(`
            <h2>Gestão de Clientes</h2>
            <button id="registrarCliente">Registrar Novo Cliente</button>
            <button id="alugarLivro">Alugar Livro</button>
            <div id="formContainer"></div>
            <div id="conteudo-principal"></div>
        `);

        // Quando clicar no botão "Registrar Novo Cliente"
        $('#registrarCliente').on('click', function() {
            if ($("#formNovoCliente").length) {  
                $("#formNovoCliente").remove();  
            } else {

                $('#formContainer').html(`
                    <form id="formNovoCliente">
                        <h3>Registrar Novo Cliente</h3>
                        <label for="nomeCompleto">Nome Completo:</label>
                        <input type="text" id="nomeCompleto" name="nomeCompleto" required>

                        <label for="cpf">CPF:</label>
                        <input type="text" id="cpf" name="cpf" required>

                        <label for="idade">Idade:</label>
                        <input type="number" id="idade" name="idade" required>

                        <label for="telefone">Telefone:</label>
                        <input type="text" id="telefone" name="telefone" required>

                        <label for="endereco">Endereço:</label>
                        <input type="text" id="endereco" name="endereco" required>

                        <button type="submit">Registrar Cliente</button>
                    </form>
                `).find('#formNovoCliente').show();
            }
        });

        // Quando clicar no botão "Alugar Livro"
        $('#alugarLivro').on('click', function () {
            if ($("#formAlugarLivro").length) {  
                $("#formAlugarLivro").remove();  
            } else {
                
                $('#formContainer').html(`
                    <form id="formAlugarLivro">
                        <h3>Alugar Livro</h3>
                        <div class="container-form">
                            <div>
                                <label for="clientePesquisa">Pesquisar Cliente:</label>
                                <input type="text" id="clientePesquisa" placeholder="Pesquise o cliente...">
                                <ul id="clienteLista"></ul>
                                
                                <label for="nomeCompletoAluguel">Nome Completo:</label>
                                <input type="text" id="nomeCompletoAluguel" name="nomeCompleto" readonly>
                                <label for="cpfAluguel">CPF:</label>
                                <input type="text" id="cpfAluguel" name="cpf" readonly>
                                <label for="telefoneAluguel">Telefone:</label>
                                <input type="text" id="telefoneAluguel" name="telefone" readonly>
                            </div>


                            <div>
                                <label for="livroPesquisa">Pesquisar Livro:</label>
                                <input type="text" id="livroPesquisa" placeholder="Pesquise o livro...">
                                <ul id="livroLista"></ul>

                                <label for="nomeLivro">Nome do Livro:</label>
                                <input type="text" id="nomeLivro" name="nomeLivro" readonly>
                                <label for="autorLivro">Autor:</label>
                                <input type="text" id="autorLivro" name="autorLivro" readonly>
                                <label for="idadeIndicativa">Idade Indicativa:</label>
                                <input type="number" id="idadeIndicativa" name="idadeIndicativa" readonly>
                                <label for="generoLivro">Gênero:</label>
                                <input type="text" id="generoLivro" name="generoLivro" readonly>
                                <label for="qtdDisponivel">Quantidade Disponível:</label>
                                <input type="number" id="qtdDisponivel" name="qtdDisponivel" readonly>
                            </div>


                        </div>
    
                        <button type="submit">Confirmar Aluguel</button>
                    </form>
                `).find('#formAlugarLivro').show();
            }

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
                    $('#nomeCompletoAluguel').val($(this).data('nome'));
                    $('#cpfAluguel').val($(this).data('cpf'));
                    $('#telefoneAluguel').val($(this).data('telefone'));
                    $('#clienteLista').html(''); 
                });
            });

            // Adiciona evento para pesquisa de livro (exemplo básico)
            $('#livroPesquisa').on('input', function() {
                const dataLivrosArray = [
                    { nome: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", idade: "12", genero: "Fantasia", qtd: "5" },
                    { nome: "1984", autor: "George Orwell", idade: "16", genero: "Distopia", qtd: "3" },
                    { nome: "Dom Casmurro", autor: "Machado de Assis", idade: "14", genero: "Romance", qtd: "7" },
                    { nome: "A Revolução dos Bichos", autor: "George Orwell", idade: "12", genero: "Satira", qtd: "4" },
                    { nome: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", idade: "10", genero: "Fantasia", qtd: "8" }
                   
                ];
            
                const searchValue = $(this).val().toLowerCase();

                
                const filteredLivros = dataLivrosArray.filter(livro => 
                    livro.nome.toLowerCase().includes(searchValue)
                );
        
                // Exibe os livros filtrados na lista
                if (filteredLivros.length > 0) {
                    let livroListHtml = "";
                    filteredLivros.forEach(livro => {
                        livroListHtml += `
                            <li data-nome="${livro.nome}" data-autor="${livro.autor}" data-idade="${livro.idade}" data-genero="${livro.genero}" data-qtd=" ${livro.qtd}">
                                <strong>Nome:</strong> ${livro.nome} <br>
                                <strong>Autor:</strong> ${livro.autor} <br>
                                <strong>Idade indicativa:</strong> ${livro.idade}
                                <strong>Gênero:</strong> ${livro.genero}
                                <strong>Qtd disponivel:</strong> ${livro.qtd}
                            </li>
                        `;
                    });
                    $('#livroLista').html(livroListHtml);  
                } else {
                    $('#livroLista').html('<li>Nenhum livro encontrado</li>');  
                }

                // Quando selecionar um livro
                $('#livroLista li').on('click', function() {
                    $('#nomeLivro').val($(this).data('nome'));
                    $('#autorLivro').val($(this).data('autor'));
                    $('#idadeIndicativa').val($(this).data('idade'));
                    $('#generoLivro').val($(this).data('genero'));
                    $('#qtdDisponivel').val($(this).data('qtd'));
                    $('#livroLista').html(''); 
                });
            });
        });  
        
        
        
    });
});


