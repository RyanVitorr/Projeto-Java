//------------------------------- livros -------------------------
$(document).ready(function() {
    let bookDataArrayApi;
    // Fazer a requisição AJAX para buscar todos os livros
    $.get('/livro/todos', function(data) {
         
        bookDataArrayApi = data;
        console.log("O DATA: " + JSON.stringify(bookDataArrayApi, null, 2));

        $('#livros').on('click', function() {
            $('#containerPrincipal').html(`
                <div class="add-container">
                    <button class="btn-add"> + Adicionar Livro</button>
    
                    <section id="add-form-section" style="display: none;">
                        <form id="add-form">
                            <label for="name">Nome:</label>
                            <input type="text" id="name" name="name" required><br>
    
                            <label for="book-author">Autor:</label>
                            <input type="text" id="book-author" name="book-author" required><br>
    
                            <label for="genre">Gênero:</label>
                            <input type="text" id="genre" name="genre" required><br>
    
                            <label for="age">Idade Indicativa:</label>
                            <input type="text" id="age" name="age" required><br>
    
                            <label for="book-description">Descrição:</label>
                            <input type="text" id="book-description" name="book-description" required><br>
    
                            <label for="book-quantity-available">Qtd. Disponível:</label>
                            <input type="number" id="book-quantity-available" name="book-quantity-available" required><br>
    
                            <label for="book-quantity-total">Qtd. Total:</label>
                            <input type="number" id="book-quantity-total" name="book-quantity-total" required><br>
    
                            <button type="submit">Adicionar</button>
                        </form>
                    </section>
                </div>
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
    
            // Chamar a função de renderização inicial para a tabela
            renderBooks(bookDataArrayApi);
        });
    
        // Mostrar o formulário quando clicar no botão "Adicionar Livro"
        $(document).on('click', '.btn-add', function() {
            // Alterna o display do formulário
            $('#add-book-form-section').toggle();
        
            // Verifica o display atual do formulário
            let formSectionDisplay = $('#add-book-form-section').css('display');
        
            // Ajusta a altura da div #table-container
            if (formSectionDisplay === 'none') {
                $('.table-container').css('height', '46rem'); // Se o formulário estiver oculto
            } else {
                $('.table-container').css('height', '25rem'); // Se o formulário estiver visível
            }
        });
    
        // Função para adicionar um novo livro ao array de objetos ao enviar o formulário
        $(document).on('submit', '#add-book-form', function(e) {
            e.preventDefault(); // Evita o envio do formulário padrão
    
            // Pegar os valores do formulário
            const bookName = $('#name').val();
            const bookAuthor = $('#book-author').val();
            const bookGenre = $('#book-genre').val();
            const bookAge = $('#book-age').val();
            const bookDescription = $('#book-description').val();
            const bookQuantityAvailable = $('#book-quantity-available').val();
            const bookQuantityTotal = $('#book-quantity-total').val();
    
            // Criar um objeto para o novo livro
            let newBook = {
                id: bookDataArray.length + 1, // ID gerado automaticamente
                name: bookName,
                author: bookAuthor,
                genre: bookGenre,
                age: bookAge,
                description: bookDescription,
                quantityAvailable: bookQuantityAvailable,
                quantityTotal: bookQuantityTotal
            };
    
            // Adicionar o novo livro ao array
            bookDataArray.push(newBook);
    
            // Exibir o array no console (apenas para verificação)
            console.log(bookDataArray);
    
            // Limpar o formulário após a submissão
            $('#add-book-form')[0].reset();
            $('#add-book-form-section').hide(); // Esconder o formulário
    
            // Atualizar a tabela
            renderBooks(bookDataArray);
        });
        
        // Função para renderizar os livros na tabela
        async function renderBooks(bookItems) {
            let rowsPerPage = parseInt($("#entries").val());
            let currentPage = 1;
            let totalRows = bookItems.length;
            let totalPages = Math.ceil(totalRows / rowsPerPage);
        
            // Função para buscar clientes para um livro
            async function fetchClientesForBook(bookId) {
                console.log(`Buscando clientes para o livro ID: ${bookId}`);
                const response = await $.get('/emprestimo/porUsuario', { idUsuario: bookId });
                console.log('Empréstimos recebidos:', response);
                
                return response;
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
                    // Cria uma linha para a tabela de livros
                    let row = `
                        <tr class="row" data-id="${book.idLivro}">
                            <td>${book.nome}</td>
                            <td>${book.autor}</td>
                            <td>${book.genero}</td>
                            <td>${book.idadeIndicativa}</td>
                            <td>${book.descricao}</td>
                            <td>${book.qtdDisponivel}</td>
                            <td>${book.qtdTotal}</td>
                            <td>${book.disponivel}</td>
                            <td>
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
                                    <table class="customer-list-table">
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
                                            <td>${cliente.nomeUsuario}</td>
                                            <td>${cliente.cpf}</td>
                                            <td>${cliente.telefone}</td>
                                            <td>${cliente.endereco}</td>
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
        
        
    }).fail(function(error) {
        console.error('Erro ao buscar livros:', error); 
    });
    

    
});

// ------------------------------- clientes ----------------------------------