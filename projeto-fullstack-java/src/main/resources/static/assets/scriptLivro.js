//------------------------------- livros -------------------------
$(document).ready(function() {
    let bookDataArrayApi = [];
    // Fazer a requisição AJAX para buscar todos os livros
    $.get('/livro/todos', function(data) {
        console.log(data); 
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
        function renderBooks(bookItems) {
            let rowsPerPage = parseInt($("#entries").val());
            let currentPage = 1;
            let totalRows = bookItems.length;
            let totalPages = Math.ceil(totalRows / rowsPerPage);
        
            // Função para buscar os clientes relacionados ao ID do livro
            function fetchClientesForBook(bookId) {
                return new Promise((resolve) => {
                    // Simulação de dados retornados pela API (exemplo)
                    let fakeClientes = [
                        { name: "João Silva", cpf: "123.456.789-00", telefone: "9999-9999", endereco: "Rua A, 123", preco: "50", qtdAlugada: 1, dataAluguel: "2024-01-10", dataDevolucao: "2024-01-20" },
                        { name: "Maria Souza", cpf: "987.654.321-00", telefone: "8888-8888", endereco: "Rua B, 456", preco: "60", qtdAlugada: 2, dataAluguel: "2024-01-15", dataDevolucao: "2024-01-25" }
                    ];
        
                    // Resolve a promessa com os dados simulados
                    resolve(fakeClientes);
                });
            }
        
            // Função para exibir uma página
            function displayPage(page) {
                let start = (page - 1) * rowsPerPage;
                let end = start + rowsPerPage;
                let rowsToDisplay = bookItems.slice(start, end);
        
                // Limpar a tabela atual
                $(".list").html('');
        
                // Adicionar cada livro como uma nova linha na tabela
                rowsToDisplay.forEach(function(book) {
                    // Cria uma linha para a tabela de livros
                    let row = `
                        <tr class="row" data-id="${book.id}">   
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.genre}</td>
                            <td>${book.age}</td>
                            <td>${book.description}</td>
                            <td>${book.quantityAvailable}</td>
                            <td>${book.quantityTotal}</td>
                            <td>
                                <button class="btn-edit">✏️</button>
                                <button class="btn-delete">🗑️</button>
                            </td>
                        </tr>
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
                                    <tbody class="customer-list"></tbody>
                                </table>
                            </td>
                        </tr>
                    `;
        
                    $(".list").append(row);
        
                    // Buscar clientes para cada livro assim que a linha é adicionada
                    fetchClientesForBook(book.id).then(clientes => {
                        // Adicionar clientes à tabela de clientes
                        let customerRow = $('.row[data-id="' + book.id + '"]').next('.customer-table');
                        clientes.forEach(cliente => {
                            let clienteRow = `
                                <tr>
                                    <td>${cliente.name}</td>
                                    <td>${cliente.cpf}</td>
                                    <td>${cliente.telefone}</td>
                                    <td>${cliente.endereco}</td>
                                    <td>${cliente.preco}</td>
                                    <td>${cliente.qtdAlugada}</td>
                                    <td>${cliente.dataAluguel}</td>
                                    <td>${cliente.dataDevolucao}</td>
                                </tr>
                            `;
                            customerRow.find('.customer-list').append(clienteRow);
                        });
                    });
                });
        
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
                    totalPages = Math.ceil(totalRows / rowsPerPage); // Recalcular o total de páginas
                    displayPage(1); // Reiniciar na primeira página
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