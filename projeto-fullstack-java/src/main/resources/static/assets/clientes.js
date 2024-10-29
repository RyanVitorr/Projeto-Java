$(document).ready(function() {
    // Quando clicar na opção "Clientes" no menu lateral
    let dataClientes;
    let dataEmprestimos;

    $('.navbar ul li a:contains("Clientes")').on('click', function() {

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
        
        $('#conteudo-principal').html(`
            <div class="table-wrapper">
                <div id="div-filter">
                    <label for="entries">Exibir</label>
                    <select id="entries">
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <span>resultados por página</span>
                    <input type="text" id="search" placeholder="Buscar...">
                </div>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Nome do Cliente</th>
                                <th>CPF</th>
                                <th>Telefone</th>
                                <th>Endereço</th>
                                <th>Preço</th>
                                <th>Qtd. Alugada</th>
                                <th>Data de Aluguel</th>
                                <th>Data de Devolução</th>
                            </tr>
                        </thead>
                        <tbody class="list"></tbody>
                    </table>
                </div>
                <div class="pagination">
                    <button class="prev">Anterior</button>
                    <span>Página <span id="current-page">1</span></span>
                    <button class="next">Próxima</button>
                </div>
            </div>
        `);

        const fetchClientes = ()=> {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: 'livro/todos',
                    type: 'GET',
                    cache: false,
                    success: function(data) {
                        resolve(data);
                    },
                    error: function(xhr, status, error) {
                        console.error('Erro na requisição:', xhr.responseText);
                        reject(error); 
                    }
                });
            });
        }
        
        fetchClientes().then(dataClientes => {
            console.log(dataClientes);  
            renderClientes(dataLClientes);
        }).catch(error => {
            console.error('Erro ao buscar Clientes:', error);  
        });

        // Função para adicionar um novo client ao array de objetos ao enviar o formulário (Ryan vai modificar)
        $(document).on('submit', '#add-book-form', function(e) {
            e.preventDefault(); 
           
            const clienteName = $('#name').val();
            const clienteCpf = $('#book-author').val();
            const clienteTelefone = $('#book-genre').val();
    
            
            let newCliente = {
                nome: clienteName,
                cpf: clienteCpf,
            };
    
            dataClientes.push(newCliente);
    
            console.log(dataClientes);
    
            $('#add-book-form')[0].reset();
            $('#add-book-form-section').hide(); 
    
            renderClientes(dataClientes);
        });

         // Função para renderizar os livros na tabela
         async function renderClientes(clienteItems) {
            let rowsPerPage = parseInt($("#entries").val());
            let currentPage = 1;
            let totalRows = clienteItems.length;
            let totalPages = Math.ceil(totalRows / rowsPerPage);
        
            // Função para buscar clientes para um livro
            async function fetchLivrosForClientes(clienteId) {
                console.log("clienteId:", clienteId); 
            
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: 'emprestimos/porCliente',
                        type: 'GET',
                        cache: false,
                        data: { idLivro: clienteId },
                        success: function(data) {
                            console.log("Dados recebidos:", data);  
                            resolve(data);      
                        },
                        error: function(xhr, status, error) {
                            console.error('Erro na requisição:', xhr.responseText); 
                            reject(error);     
                        }
                    });
                });
            }

            // Função para exibir uma página
            async function displayPage(page) {
                let start = (page - 1) * rowsPerPage;
                let end = start + rowsPerPage;
                let rowsToDisplay = clienteItems.slice(start, end);
        
                // Limpar a tabela atual
                $(".list").html('');
        
                // Adicionar cada cliente como uma nova linha na tabela
                for (const cliente of rowsToDisplay) {
                    // Cria uma linha para a tabela de clientes
                    let row = `
                        <tr class="row" data-id="${cliente.idLivro}">
                            <td>${cliente.nome}</td>
                            <td>${cliente.autor}</td>
                            <td>${cliente.genero}</td>
                            <td>${cliente.idadeIndicativa}</td>
                            <td>${cliente.descricao}</td>
                            <td>${cliente.qtdDisponivel}</td>
                            <td>${cliente.qtdTotal}</td>
                            <td>${cliente.disponivel}</td>
                            <td class="td-perso">
                                <button class="btn-edit">✏️</button>
                                <button class="btn-delete">🗑️</button>
                            </td>
                        </tr>
                        
                    `;
        
                    $(".list").append(row);

                    // Buscar livros para cada cliente assim que a linha é adicionada
                    const livros = await fetchLivrosForClientes(cliente.idCliente);
                    if (livros.length > 0) {
                        livros.forEach(livro => {
                            let livroRow = `
                            <tr class="customer-table" style="display: none;">
                                <td colspan="8">
                                    <table class="table customer-list-table">
                                        <thead>
                                            <tr>
                                                <th>Nome do Cliente</th>
                                                <th>CPF</th>
                                                <th>Telefone</th>
                                                <th>Endereço</th>
                                                <th>Preço</th>
                                                <th>Qtd. Alugada</th>
                                                <th>Data de Aluguel</th>
                                                <th>Data de Devolução</th>
                                            </tr>
                                        </thead>
                                        <tbody class="customer-list">
                                        <tr>
                                            <td>${cliente.usuario.nome}</td>
                                            <td>${cliente.usuario.cpf}</td>
                                            <td>${cliente.usuario.telefone}</td>
                                            <td>${cliente.usuario.endereco}</td>
                                            <td>${cliente.preco}</td>
                                            <td>${cliente.qtdAlugada}</td>
                                            <td>${cliente.dataEmprestimo}</td>
                                            <td>${cliente.dataDevolucao}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>`;
                            $('.list').append(clienteRow);
                        });
                    } else {
                        console.log(`Nenhum cliente encontrado para o livro ID: ${book.idLivro}`);
                    }
                }
        
                // Atualiza a exibição da página atual
                $("#current-page").text(page);
        
                // Adiciona eventos de clique nas linhas dos livros
                $('.row').off('click').on('click', function() {
                    let customerRow = $(this).next('.customer-table');
        
                    // Se a linha de clientes já estiver visível, ocultar e sair
                    if (customerRow.is(':visible')) {
                        customerRow.hide();
                        return;
                    }
        
                    // Exibir a linha de clientes
                    customerRow.show();
                });
            }
        
            // Função para lidar com a paginação
            function handlePagination() {
                $('.prev').off('click').on('click', function() {
                    if (currentPage > 1) {
                        currentPage--;
                        displayPage(currentPage);
                    }
                });
        
                $('.next').off('click').on('click', function() {
                    if (currentPage < totalPages) {
                        currentPage++;
                        displayPage(currentPage);
                    }
                });
        
                $("#entries").off("change").on("change", function() {
                    rowsPerPage = parseInt($(this).val());
                    totalPages = Math.ceil(totalRows / rowsPerPage); 
                    displayPage(1); 
                });
        
                // Atualiza a exibição inicial
                displayPage(currentPage);
            }
        
            handlePagination();
        }

        
        
    });
});


