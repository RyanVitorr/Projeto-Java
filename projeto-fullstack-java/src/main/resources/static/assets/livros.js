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
                        <div class="cancelBtn">
                            <p id="cancelBtnP">
                                X
                            </p>
                        </div>
                            
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

                $('#cancelBtnP').off('click').on('click', function () {
                    console.log("clicou")
                    $('.container-form-transp').remove();
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
                            <div class="cancelBtn">
                                <p id="cancelBtnP">
                                    X
                                </p>
                            </div>
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
                                    <label for="qtdDesejadaEmprestimo">Quantidade:</label>
                                    <input type="number" id="qtdDesejadaEmprestimo" name="qtdDesejadaEmprestimo">
                                </div>
                            </div>
                            <button type="submit">Confirmar Empréstimo</button>
                        </form>
                    </div>
                `).find('#formEmprestarLivro').show();

                $('#cancelBtnP').off('click').on('click', function () {
                    console.log("clicou")
                    $('.container-form-transp').remove();
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
                            <li data-id="${livro.idLivro}" data-nome="${livro.nome}" data-autor="${livro.autor}" data-idade="${livro.idadeIndicativa}" data-genero="${livro.genero}" data-qtd="${livro.qtdDisponivel}">
                                <strong>Nome:</strong> ${livro.nome} <br>
                                <strong>Autor:</strong> ${livro.autor} <br>
                                <strong>Idade Indicativa:</strong> ${livro.idadeIndicativa} <br>
                                <strong>Gênero:</strong> ${livro.genero} <br>
                                <strong>Qtd Disponível:</strong> ${livro.qtdDisponivel}
                            </li>
                        `;
                    });
                    $('#livroLista').html(livroListHtml);  
                } else {
                    $('#livroLista').html('<li>Nenhum livro encontrado</li>');  
                }

                $('#livroLista li').on('click', function() {
                    $('#idLivroEmprestimo').val($(this).data('id'))
                    $('#nomeLivroEmprestimo').val($(this).data('nome'))
                    $('#autorLivroEmprestimo').val($(this).data('autor'))
                    $('#idadeIndicativaEmprestimo').val($(this).data('idade'))
                    $('#generoLivroEmprestimo').val($(this).data('genero'))
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
                        console.log(data);
                        dataLivros = data;
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
            async function displayPage(page, filteredBooks = bookItems) {
                let start = (page - 1) * rowsPerPage;
                let end = start + rowsPerPage;
                let rowsToDisplay = filteredBooks.slice(start, end);
        
                // Limpar a tabela atual
                $(".list").html('');
        
                // Adicionar cada livro como uma nova linha na tabela
                for (const book of rowsToDisplay) {
                    let disponivel = book.qtdDisponivel >= 1 ? "Sim" : "Não";
                    let row = `
                        <tr class="row" data-id="${book.idLivro}" data-nome="${book.nome}"  data-autor="${book.autor}" data-genero="${book.genero}" data-idade="${book.idadeIndicativa}" data-descricao="${book.descricao}" data-qtdDisponivel="${book.qtdDisponivel}" data-qtdTotal="${book.qtdTotal}" data-preco="${book.preco}">
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
                                                <th>Data Prev.Devolução</th>
                                            </tr>
                                        </thead>
                                        <tbody class="customer-list">
                                        <tr>
                                            <td>${cliente.usuario.nome}</td>
                                            <td>${cliente.usuario.cpf}</td>
                                            <td>${cliente.usuario.telefone}</td>
                                            <td>${cliente.usuario.endereco}</td>
                                            <td>${cliente.livro.preco}</td>
                                            <td>${cliente.totaLivrosAlugados}</td>
                                            <td>${cliente.dataEmprestimo}</td>
                                            <td>${cliente.dataDevolucao}</td>
                                            <td>${cliente.dataPrevDevolucao}</td>

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
                $('.row').off('click').on('click', function(event) {

                    if ($(event.target).is('.btn-edit')) {
                        event.stopPropagation();
                        
                        let row = $(event.target).closest('.row');

                        let bookData = {
                            id: row.data('id'),
                            nome: row.data('nome'),
                            autor: row.data('autor'),
                            genero: row.data('genero'),
                            idade: row.data('idade'),
                            descricao: row.data('descricao'),
                            qtdDisponivel: row.data('qtddisponivel'),
                            qtdTotal: row.data('qtdtotal'),
                            preco: row.data('preco')
                        };

                        editar(bookData);
                        return;
                    } else if ($(event.target).is('.btn-delete')) {
                        event.stopPropagation();
                        let row = $(event.target).closest('.row');

                        let bookData = {
                            id: row.data('id'),
                            nome: row.data('nome')
                        };

                        excluir(bookData);
                        return;
                    }

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

            const editar = (data)=>{
                $('#formContainer').html(`
                    <div class="container-form-transp"> 
                        
                        <form id="formEditarLivro">
                        <div class="cancelBtn">
                            <p id="cancelBtnP">
                                X
                            </p>
                        </div>
                            
                            <h3>Editar Livro</h3>

                            <label for="nomeLivro">Nome do Livro:</label>
                            <input type="text" id="nomeLivro" name="nomeLivro" required>

                            <label for="autorLivro">Autor:</label>
                            <input type="text" id="autorLivro" name="autorLivro" required>

                            <label for="descricao">Descrição:</label>
                            <input type="text" id="descricao" name="descricao" required>

                            <label for="preco">Preço:</label>
                            <input type="number" id="preco" name="preco" required step="0.1">

                            <label for="idadeIndicativa">Idade Indicativa:</label>
                            <input type="number" id="idadeIndicativa" name="idadeIndicativa" required>

                            <label for="generoLivro">Gênero:</label>
                            <input type="text" id="generoLivro" name="generoLivro" required>

                            <label for="qtdDisponivel">Quantidade Disponível:</label>
                            <input type="number" id="qtdDisponivel" name="qtdDisponivel" required>

                            <label for="qtdTotal">Quantidade Total:</label>
                            <input type="number" id="qtdTotal" name="qtdTotal" required>

                            <button type="submit" id="editarLivarBtn">Confirmar</button>
                        </form>
                    </div>
                `);

                $('#nomeLivro').val(data.nome);
                $('#autorLivro').val(data.autor);
                $('#descricao').val(data.descricao);
                $('#preco').val(data.preco);
                $('#idadeIndicativa').val(data.idade);
                $('#generoLivro').val(data.genero);
                $('#qtdDisponivel').val(data.qtdDisponivel);
                $('#qtdTotal').val(data.qtdTotal);

                $('#cancelBtnP').off('click').on('click', function () {
                    console.log("clicou")
                    $('.container-form-transp').remove();
                });
            };

            const excluir = (data)=>{
                $('#formContainer').html(`
                    <div class="container-form-transp"> 
                        
                        <div class="container-excluir">
                        
                            <h3>Você deseja excluir o livro "${data.nome}" do banco de dados?</h3>



                            <div>
                                <button id="confirmBtnConfirm">SIM</button>
                                <button id="cancelBtnConfirtmCancel">NÃO</button>
                            </div>
                        
                        </div>
                    </div>
                `);

                $("#cancelBtnConfirtmCancel").off('click').on('click', function() {
                    $('.container-form-transp').remove();
                });

                $("#confirmBtnConfirm").off('click').on('click', function() {
                    $('.container-form-transp').remove();
                });
            };

            function filterBooks(term) {
                return bookItems.filter(book => 
                    book.nome.toLowerCase().includes(term.toLowerCase())
                );
            }

            $("#search").off("input").on("input", function() {
                const searchTerm = $(this).val().trim();
                const filteredBooks = filterBooks(searchTerm);
                totalRows = filteredBooks.length;
                totalPages = Math.ceil(totalRows / rowsPerPage);
                currentPage = 1; 
                displayPage(currentPage, filteredBooks);
            });
        
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
