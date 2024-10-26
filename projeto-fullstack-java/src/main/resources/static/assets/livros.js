$(document).ready(function() { 
    // Quando clicar na opção "Livros" no menu lateral
    let dataLivros;

    $('.navbar ul li a:contains("Livros")').on('click', function() {
        
        $('.main-content').html(`
            <h2>Gestão de Livros</h2>
            <button id="registrarLivro">Registrar Novo Livro</button>
            <button id="emprestarLivro">Emprestar Livro</button>
            <div id="formContainer"></div>
            <div id="conteudo-principal"></div>
        `);

        // Quando clicar no botão "Registrar Novo Livro"
        $('#registrarLivro').on('click', function() {
            if ($("#formNovoLivro").length) {  
                $("#formNovoLivro").remove();  
            } else {

                $('#formContainer').html(`
                    <div class="container-form-transp">
                        <form id="formNovoLivro">
                            <h3>Registrar Novo Livro</h3>
                            <label for="nomeLivro">Nome do Livro:</label>
                            <input type="text" id="nomeLivro" name="nomeLivro" required>
                            <label for="autorLivro">Autor:</label>
                            <input type="text" id="autorLivro" name="autorLivro" required>
                            <label for="idadeIndicativa">Idade Indicativa:</label>
                            <input type="number" id="idadeIndicativa" name="idadeIndicativa" required>
                            <label for="generoLivro">Gênero:</label>
                            <input type="text" id="generoLivro" name="generoLivro" required>
                            <label for="qtdDisponivel">Quantidade Disponível:</label>
                            <input type="number" id="qtdDisponivel" name="qtdDisponivel" required>
                            <button type="submit">Registrar Livro</button>
                        </form>
                    </div>
                `).find('#formNovoLivro').show();

                $('.container-form-transp').off('click').on('click', function () {
                    $($(this)).remove();
                });
            }
        });

        // Quando clicar no botão "Emprestar Livro"
        $('#emprestarLivro').on('click', function () {
            if ($("#formEmprestarLivro").length) {  
                $("#formEmprestarLivro").remove();  
            } else {
                
                $('#formContainer').html(`
                    <div class="container-form-transp">
                        <form id="formEmprestarLivro">
                            <h3>Emprestar Livro</h3>
                            <div class="container-form">
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
                                    <label for="nomeLivroEmprestimo">Nome do Livro:</label>
                                    <input type="text" id="nomeLivroEmprestimo" name="nomeLivroEmprestimo" readonly>
                                    <label for="autorLivroEmprestimo">Autor:</label>
                                    <input type="text" id="autorLivroEmprestimo" name="autorLivroEmprestimo" readonly>
                                    <label for="idadeIndicativaEmprestimo">Idade Indicativa:</label>
                                    <input type="number" id="idadeIndicativaEmprestimo" name="idadeIndicativaEmprestimo" readonly>
                                    <label for="generoLivroEmprestimo">Gênero:</label>
                                    <input type="text" id="generoLivroEmprestimo" name="generoLivroEmprestimo" readonly>
                                    <label for="qtdDisponivelEmprestimo">Quantidade Disponível:</label>
                                    <input type="number" id="qtdDisponivelEmprestimo" name="qtdDisponivelEmprestimo" readonly>
                                </div>
                            </div>
                            <button type="submit">Confirmar Empréstimo</button>
                        </form>
                    </div>
                `).find('#formEmprestarLivro').show();

                $('.container-form-transp').off('click').on('click', function () {
                    $($(this)).remove();
                });
                
            };

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
                const searchValue = $(this).val().toLowerCase();
                const filteredLivros = dataLivros.filter(livro => 
                    livro.nome.toLowerCase().includes(searchValue)
                );

                if (filteredLivros.length > 0) {
                    let livroListHtml = "";
                    filteredLivros.forEach(livro => {
                        livroListHtml += `
                            <li data-nome="${livro.nome}" data-autor="${livro.autor}" data-idade="${livro.idade}" data-genero="${livro.genero}" data-qtd="${livro.qtd}">
                                <strong>Nome:</strong> ${livro.nome} <br>
                                <strong>Autor:</strong> ${livro.autor} <br>
                                <strong>Idade Indicativa:</strong> ${livro.idade} <br>
                                <strong>Gênero:</strong> ${livro.genero} <br>
                                <strong>Qtd Disponível:</strong> ${livro.qtd}
                            </li>
                        `;
                    });
                    $('#livroLista').html(livroListHtml);  
                } else {
                    $('#livroLista').html('<li>Nenhum livro encontrado</li>');  
                }

                $('#livroLista li').on('click', function() {
                    $('#nomeLivroEmprestimo').val($(this).data('nome'));
                    $('#autorLivroEmprestimo').val($(this).data('autor'));
                    $('#idadeIndicativaEmprestimo').val($(this).data('idade'));
                    $('#generoLivroEmprestimo').val($(this).data('genero'));
                    $('#qtdDisponivelEmprestimo').val($(this).data('qtd'));
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
                                <th>Nome</th>
                                <th>Autor</th>
                                <th>Gênero</th>
                                <th>Idade Indicativa</th>
                                <th>Descrição</th>
                                <th>Preço</th>
                                <th>Qtd. Disponível</th>
                                <th>Qtd. Total</th>
                                <th>Disponivel</th>
                                <th>Ações</th>
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

        const fetchLivros = ()=> {
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
        
        
        fetchLivros().then(dataLivros => {
            console.log(dataLivros);  
            renderBooks(dataLivros);
        }).catch(error => {
            console.error('Erro ao buscar livros:', error);  
        });

        // Função para adicionar um novo livro ao array de objetos ao enviar o formulário (vou modificar. ass: Ryan)
        $(document).on('submit', '#add-book-form', function(e) {
            e.preventDefault(); 
           
            const bookName = $('#name').val();
            const bookAuthor = $('#book-author').val();
            const bookGenre = $('#book-genre').val();
            const bookAge = $('#book-age').val();
            const bookDescription = $('#book-description').val();
            const bookQuantityAvailable = $('#book-quantity-available').val();
            const bookQuantityTotal = $('#book-quantity-total').val();
    
            
            let newBook = {
                id: dataLivros.length + 1, 
                name: bookName,
                author: bookAuthor,
                genre: bookGenre,
                age: bookAge,
                description: bookDescription,
                quantityAvailable: bookQuantityAvailable,
                quantityTotal: bookQuantityTotal
            };
    
            dataLivros.push(newBook);
    
            console.log(dataLivros);
    
            $('#add-book-form')[0].reset();
            $('#add-book-form-section').hide(); 
    
            renderBooks(dataLivros);
        });

        // Função para renderizar os livros na tabela
        async function renderBooks(bookItems) {
            let rowsPerPage = parseInt($("#entries").val());
            let currentPage = 1;
            let totalRows = bookItems.length;
            let totalPages = Math.ceil(totalRows / rowsPerPage);
        
            // Função para buscar clientes para um livro
            async function fetchClientesForBook(bookId) {
                console.log("bookId:", bookId); 
            
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: 'emprestimos/porLivro',
                        type: 'GET',
                        cache: false,
                        data: { idLivro: bookId },
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
                let rowsToDisplay = bookItems.slice(start, end);
        
                // Limpar a tabela atual
                $(".list").html('');
        
                // Adicionar cada livro como uma nova linha na tabela
                for (const book of rowsToDisplay) {
                    let disponivel;
                    book.qtdDisponivel >= 1 ? disponivel = true : disponivel = false;
                    let row = `
                        <tr class="row" data-id="${book.idLivro}">
                            <td>${book.nome}</td>
                            <td>${book.autor}</td>
                            <td>${book.genero}</td>
                            <td>${book.idadeIndicativa}</td>
                            <td>${book.descricao}</td>
                            <td>R$ ${book.preco.toFixed(2)}</td>
                            <td>${book.qtdDisponivel}</td>
                            <td>${book.qtdTotal}</td>
                            <td>${disponivel}</td>
                            <td class="td-perso">
                                <button class="btn-edit">✏️</button>
                                <button class="btn-delete">🗑️</button>
                            </td>
                        </tr>
                        
                    `;
        
                    $(".list").append(row);

                    // Buscar clientes para cada livro assim que a linha é adicionada
                    const clientes = await fetchClientesForBook(book.idLivro);
                    if (clientes.length > 0) {
                        clientes.forEach(cliente => {
                            let clienteRow = `
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
