//------------------------------- clientes -------------------------
$(document).ready(function() {
    // Array para armazenar os dados dos clientes
    let clientDataArray = [];

    $('#clientes').on('click', function() {
        $('#containerPrincipal').html('');

        $('#containerPrincipal').html(`
            <div class="add-container">
                <button class="btn-add"> + Adicionar Cliente</button>

                <section id="add-form-section" style="display: none;">
                    <form id="add-form">
                        <label for="name">Nome:</label>
                        <input type="text" id="name" name="name" required><br>

                        <label for="book-author">Cpf:</label>
                        <input type="text" id="book-author" name="book-author" required><br>

                        <label for="genre">Gênero:</label>
                        <input type="text" id="genre" name="genre" required><br>

                        <label for="age">Idade:</label>
                        <input type="text" id="age" name="age" required><br>

                        <label for="endereco">Endereço:</label>
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
                                <th>Cpf</th>
                                <th>Gênero</th>
                                <th>Idade</th>
                                <th>Endereço</th>
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
        renderClient(clientDataArrayApi);
    });

    // Mostrar o formulário quando clicar no botão "Adicionar Livro"
    $(document).on('click', '.btn-add', function() {
        // Alterna o display do formulário
        $('#add-form-section').toggle();
    
        // Verifica o display atual do formulário
        let formSectionDisplay = $('#add-form-section').css('display');
    
        // Ajusta a altura da div #table-container
        if (formSectionDisplay === 'none') {
            $('.table-container').css('height', '46rem'); // Se o formulário estiver oculto
        } else {
            $('.table-container').css('height', '25rem'); // Se o formulário estiver visível
        }
    });

    // Função para adicionar um novo livro ao array de objetos ao enviar o formulário
    $(document).on('submit', '#add-form', function(e) {
        e.preventDefault(); // Evita o envio do formulário padrão

        // Pegar os valores do formulário
        const bookName = $('#name').val();
        const bookAuthor = $('#cpf').val();
        const bookGenre = $('#genre').val();
        const bookAge = $('#age').val();
        const bookDescription = $('#book-description').val();
        const bookQuantityAvailable = $('#book-quantity-available').val();
        const bookQuantityTotal = $('#book-quantity-total').val();

        // Criar um objeto para o novo livro
        let newClient = {
            id: clientDataArray.length + 1, // ID gerado automaticamente
            name: bookName,
            author: bookAuthor,
            genre: bookGenre,
            age: bookAge,
            description: bookDescription,
            quantityAvailable: bookQuantityAvailable,
            quantityTotal: bookQuantityTotal
        };

        // Adicionar o novo livro ao array
        clientDataArray.push(newClient);
        // Exibir o array no console (apenas para verificação)
        console.log(clientDataArray);

        // Limpar o formulário após a submissão
        $('#add-form')[0].reset();
        $('#add-form-section').hide(); // Esconder o formulário

        // Atualizar a tabela
        renderClient(clientDataArray);
    });

    // Exemplo de array de objetos que virá da API
    let clientDataArrayApi = [
        {
            id: 1,
            name: 'Livro A',
            author: 'Autor A',
            genre: 'Gênero A',
            age: '12+',
            description: 'Descrição do Livro A',
            quantityAvailable: 5,
            quantityTotal: 10
        },
        {
            id: 2,
            name: 'Livro B',
            author: 'Autor B',
            genre: 'Gênero B',
            age: '16+',
            description: 'Descrição do Livro B',
            quantityAvailable: 3,
            quantityTotal: 7
        },
        {
            id: 3,
            name: 'Livro C',
            author: 'Autor C',
            genre: 'Gênero C',
            age: '16+',
            description: 'Descrição do Livro C',
            quantityAvailable: 4,
            quantityTotal: 9
        },
        {
            id: 4,
            name: 'Livro D',
            author: 'Autor D',
            genre: 'Gênero D',
            age: '16+',
            description: 'Descrição do Livro D',
            quantityAvailable: 2,
            quantityTotal: 5
        },
        {
            id: 5,
            name: 'Livro E',
            author: 'Autor E',
            genre: 'Gênero E',
            age: '12+',
            description: 'Descrição do Livro E',
            quantityAvailable: 6,
            quantityTotal: 8
        },
        {
            id: 6,
            name: 'Livro F',
            author: 'Autor F',
            genre: 'Gênero F',
            age: '16+',
            description: 'Descrição do Livro F',
            quantityAvailable: 1,
            quantityTotal: 3
        },
        {
            id: 7,
            name: 'Livro G',
            author: 'Autor G',
            genre: 'Gênero G',
            age: '12+',
            description: 'Descrição do Livro G',
            quantityAvailable: 4,
            quantityTotal: 6
        },
        {
            id: 8,
            name: 'Livro H',
            author: 'Autor H',
            genre: 'Gênero H',
            age: '16+',
            description: 'Descrição do Livro H',
            quantityAvailable: 3,
            quantityTotal: 4
        },
        {
            id: 9,
            name: 'Livro I',
            author: 'Autor I',
            genre: 'Gênero I',
            age: '12+',
            description: 'Descrição do Livro I',
            quantityAvailable: 5,
            quantityTotal: 7
        },
        {
            id: 10,
            name: 'Livro J',
            author: 'Autor J',
            genre: 'Gênero J',
            age: '16+',
            description: 'Descrição do Livro J',
            quantityAvailable: 2,
            quantityTotal: 4
        },
        {
            id: 11,
            name: 'Livro K',
            author: 'Autor K',
            genre: 'Gênero K',
            age: '12+',
            description: 'Descrição do Livro K',
            quantityAvailable: 6,
            quantityTotal: 8
        },
        {
            id: 12,
            name: 'Livro L',
            author: 'Autor L',
            genre: 'Gênero L',
            age: '16+',
            description: 'Descrição do Livro L',
            quantityAvailable: 1,
            quantityTotal: 2
        },
        {
            id: 13,
            name: 'Livro M',
            author: 'Autor M',
            genre: 'Gênero M',
            age: '12+',
            description: 'Descrição do Livro M',
            quantityAvailable: 4,
            quantityTotal: 5
        },
        {
            id: 14,
            name: 'Livro N',
            author: 'Autor N',
            genre: 'Gênero N',
            age: '16+',
            description: 'Descrição do Livro N',
            quantityAvailable: 3,
            quantityTotal: 6
        },
        {
            id: 15,
            name: 'Livro O',
            author: 'Autor O',
            genre: 'Gênero O',
            age: '12+',
            description: 'Descrição do Livro O',
            quantityAvailable: 2,
            quantityTotal: 3
        },
        {
            id: 16,
            name: 'Livro P',
            author: 'Autor P',
            genre: 'Gênero P',
            age: '16+',
            description: 'Descrição do Livro P',
            quantityAvailable: 5,
            quantityTotal: 9
        },
        {
            id: 17,
            name: 'Livro Q',
            author: 'Autor Q',
            genre: 'Gênero Q',
            age: '12+',
            description: 'Descrição do Livro Q',
            quantityAvailable: 4,
            quantityTotal: 7
        },
        {
            id: 18,
            name: 'Livro R',
            author: 'Autor R',
            genre: 'Gênero R',
            age: '16+',
            description: 'Descrição do Livro R',
            quantityAvailable: 3,
            quantityTotal: 5
        },
        {
            id: 19,
            name: 'Livro S',
            author: 'Autor S',
            genre: 'Gênero S',
            age: '12+',
            description: 'Descrição do Livro S',
            quantityAvailable: 6,
            quantityTotal: 8
        },
        {
            id: 20,
            name: 'Livro T',
            author: 'Autor T',
            genre: 'Gênero T',
            age: '16+',
            description: 'Descrição do Livro T',
            quantityAvailable: 2,
            quantityTotal: 4
        },
        {
            id: 21,
            name: 'Livro U',
            author: 'Autor U',
            genre: 'Gênero U',
            age: '12+',
            description: 'Descrição do Livro U',
            quantityAvailable: 5,
            quantityTotal: 7
        },
        {
            id: 22,
            name: 'Livro V',
            author: 'Autor V',
            genre: 'Gênero V',
            age: '16+',
            description: 'Descrição do Livro V',
            quantityAvailable: 4,
            quantityTotal: 6
        },
        {
            id: 23,
            name: 'Livro W',
            author: 'Autor W',
            genre: 'Gênero W',
            age: '12+',
            description: 'Descrição do Livro W',
            quantityAvailable: 3,
            quantityTotal: 5
        },
        {
            id: 24,
            name: 'Livro X',
            author: 'Autor X',
            genre: 'Gênero X',
            age: '16+',
            description: 'Descrição do Livro X',
            quantityAvailable: 6,
            quantityTotal: 8
        },
        {
            id: 25,
            name: 'Livro Y',
            author: 'Autor Y',
            genre: 'Gênero Y',
            age: '12+',
            description: 'Descrição do Livro Y',
            quantityAvailable: 1,
            quantityTotal: 3
        },
        {
            id: 26,
            name: 'Livro Z',
            author: 'Autor Z',
            genre: 'Gênero Z',
            age: '16+',
            description: 'Descrição do Livro Z',
            quantityAvailable: 5,
            quantityTotal: 9
        },
        {
            id: 27,
            name: 'Livro AA',
            author: 'Autor AA',
            genre: 'Gênero AA',
            age: '12+',
            description: 'Descrição do Livro AA',
            quantityAvailable: 4,
            quantityTotal: 8
        },
        {
            id: 28,
            name: 'Livro AB',
            author: 'Autor AB',
            genre: 'Gênero AB',
            age: '16+',
            description: 'Descrição do Livro AB',
            quantityAvailable: 2,
            quantityTotal: 5
        },
        {
            id: 29,
            name: 'Livro AC',
            author: 'Autor AC',
            genre: 'Gênero AC',
            age: '12+',
            description: 'Descrição do Livro AC',
            quantityAvailable: 3,
            quantityTotal: 6
        },
        {
            id: 30,
            name: 'Livro AD',
            author: 'Autor AD',
            genre: 'Gênero AD',
            age: '16+',
            description: 'Descrição do Livro AD',
            quantityAvailable: 5,
            quantityTotal: 7
        }
    ];

    // Função para renderizar os livros na tabela
    function renderClient(clientItems) {
        let rowsPerPage = parseInt($("#entries").val());
        let currentPage = 1;
        let totalRows = clientItems.length;
        let totalPages = Math.ceil(totalRows / rowsPerPage);
    
        // Função para buscar os clientes relacionados ao ID do livro
        function fetchBookForclients(bookId) {
            return new Promise((resolve) => {
                // Simulação de dados retornados pela API (exemplo)
                let fakeBooks = [
                    { name: "João Silva", cpf: "123.456.789-00", telefone: "9999-9999", endereco: "Rua A, 123", preco: "50", qtdAlugada: 1, dataAluguel: "2024-01-10", dataDevolucao: "2024-01-20" },
                    { name: "Maria Souza", cpf: "987.654.321-00", telefone: "8888-8888", endereco: "Rua B, 456", preco: "60", qtdAlugada: 2, dataAluguel: "2024-01-15", dataDevolucao: "2024-01-25" }
                ];
    
                // Resolve a promessa com os dados simulados
                resolve(fakeBooks);
            });
        }
    
        // Função para exibir uma página
        function displayPage(page) {
            let start = (page - 1) * rowsPerPage;
            let end = start + rowsPerPage;
            let rowsToDisplay = clientItems.slice(start, end);
    
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
                fetchBookForclients(book.id).then(clientes => {
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
});