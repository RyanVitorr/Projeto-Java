//------------------------------- livros -------------------------
$(document).ready(function() {
    // Array para armazenar os dados dos livros
    let bookDataArray = [];

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

    // Exemplo de array de objetos que virá da API
    let bookDataArrayApi = [
        {
            id: 1,
            name: '1984',
            author: 'George Orwell',
            genre: 'Distopia',
            age: '16+',
            description: 'Um regime totalitário que controla todos os aspectos da vida dos cidadãos.',
            quantityAvailable: 5,
            quantityTotal: 10
        },
        {
            id: 2,
            name: 'O Senhor dos Anéis',
            author: 'J.R.R. Tolkien',
            genre: 'Fantasia',
            age: '12+',
            description: 'Uma jornada épica para destruir o Um Anel e salvar a Terra-média.',
            quantityAvailable: 3,
            quantityTotal: 7
        },
        {
            id: 3,
            name: 'Dom Quixote',
            author: 'Miguel de Cervantes',
            genre: 'Clássico',
            age: '16+',
            description: 'A história de um cavaleiro que confunde a realidade com os romances de cavalaria.',
            quantityAvailable: 4,
            quantityTotal: 9
        },
        {
            id: 4,
            name: 'O Grande Gatsby',
            author: 'F. Scott Fitzgerald',
            genre: 'Romance',
            age: '16+',
            description: 'Uma crítica à busca pelo sonho americano na década de 1920.',
            quantityAvailable: 2,
            quantityTotal: 5
        },
        {
            id: 5,
            name: 'Harry Potter e a Pedra Filosofal',
            author: 'J.K. Rowling',
            genre: 'Fantasia',
            age: '12+',
            description: 'A introdução ao mundo mágico e a jornada de Harry Potter.',
            quantityAvailable: 6,
            quantityTotal: 8
        },
        {
            id: 6,
            name: 'Moby Dick',
            author: 'Herman Melville',
            genre: 'Aventura',
            age: '16+',
            description: 'A perseguição de um capitão obcecado por uma grande baleia branca.',
            quantityAvailable: 1,
            quantityTotal: 3
        },
        {
            id: 7,
            name: 'A Revolução dos Bichos',
            author: 'George Orwell',
            genre: 'Satírica',
            age: '12+',
            description: 'Uma fábula política sobre uma revolução animal que dá errado.',
            quantityAvailable: 4,
            quantityTotal: 6
        },
        {
            id: 8,
            name: 'Crime e Castigo',
            author: 'Fyodor Dostoevsky',
            genre: 'Ficção psicológica',
            age: '16+',
            description: 'O conflito moral e psicológico de um homem que comete um assassinato.',
            quantityAvailable: 3,
            quantityTotal: 4
        },
        {
            id: 9,
            name: 'O Pequeno Príncipe',
            author: 'Antoine de Saint-Exupéry',
            genre: 'Infantil',
            age: '12+',
            description: 'Uma história filosófica sobre um príncipe que viaja por diferentes planetas.',
            quantityAvailable: 5,
            quantityTotal: 7
        },
        {
            id: 10,
            name: 'Jane Eyre',
            author: 'Charlotte Brontë',
            genre: 'Romance',
            age: '16+',
            description: 'A vida e os desafios de uma jovem órfã na Inglaterra vitoriana.',
            quantityAvailable: 2,
            quantityTotal: 4
        },
        {
            id: 11,
            name: 'Orgulho e Preconceito',
            author: 'Jane Austen',
            genre: 'Romance',
            age: '12+',
            description: 'A história de amor e crítica social na Inglaterra rural do século XIX.',
            quantityAvailable: 6,
            quantityTotal: 8
        },
        {
            id: 12,
            name: 'O Sol é Para Todos',
            author: 'Harper Lee',
            genre: 'Romance',
            age: '16+',
            description: 'Uma crítica ao racismo no sul dos Estados Unidos através do olhar de uma criança.',
            quantityAvailable: 1,
            quantityTotal: 2
        },
        {
            id: 13,
            name: 'A Guerra dos Tronos',
            author: 'George R.R. Martin',
            genre: 'Fantasia',
            age: '16+',
            description: 'Intrigas políticas e batalhas por poder em um mundo medieval fictício.',
            quantityAvailable: 4,
            quantityTotal: 5
        },
        {
            id: 14,
            name: 'O Código Da Vinci',
            author: 'Dan Brown',
            genre: 'Suspense',
            age: '16+',
            description: 'Um mistério envolvendo uma sociedade secreta e a busca pelo Santo Graal.',
            quantityAvailable: 3,
            quantityTotal: 6
        },
        {
            id: 15,
            name: 'O Hobbit',
            author: 'J.R.R. Tolkien',
            genre: 'Fantasia',
            age: '12+',
            description: 'A jornada de Bilbo Bolseiro para recuperar um tesouro de um dragão.',
            quantityAvailable: 2,
            quantityTotal: 3
        },
        {
            id: 16,
            name: 'O Apanhador no Campo de Centeio',
            author: 'J.D. Salinger',
            genre: 'Romance',
            age: '16+',
            description: 'As reflexões de um jovem perturbado sobre a sociedade ao seu redor.',
            quantityAvailable: 5,
            quantityTotal: 9
        },
        {
            id: 17,
            name: 'Cem Anos de Solidão',
            author: 'Gabriel García Márquez',
            genre: 'Realismo Mágico',
            age: '16+',
            description: 'A saga da família Buendía em um vilarejo fictício na América Latina.',
            quantityAvailable: 4,
            quantityTotal: 7
        },
        {
            id: 18,
            name: 'As Crônicas de Nárnia',
            author: 'C.S. Lewis',
            genre: 'Fantasia',
            age: '12+',
            description: 'A história de crianças que descobrem um mundo mágico além de um guarda-roupa.',
            quantityAvailable: 3,
            quantityTotal: 5
        },
        {
            id: 19,
            name: 'O Nome do Vento',
            author: 'Patrick Rothfuss',
            genre: 'Fantasia',
            age: '16+',
            description: 'A jornada de Kvothe, um herói lendário, contada por ele mesmo.',
            quantityAvailable: 6,
            quantityTotal: 8
        },
        {
            id: 20,
            name: 'Frankenstein',
            author: 'Mary Shelley',
            genre: 'Terror',
            age: '16+',
            description: 'A criação de um monstro por um cientista obcecado com a vida e a morte.',
            quantityAvailable: 2,
            quantityTotal: 4
        },
        {
            id: 21,
            name: 'Os Miseráveis',
            author: 'Victor Hugo',
            genre: 'Romance',
            age: '16+',
            description: 'A luta de Jean Valjean para se redimir após anos de prisão injusta.',
            quantityAvailable: 5,
            quantityTotal: 7
        },
        {
            id: 22,
            name: 'O Morro dos Ventos Uivantes',
            author: 'Emily Brontë',
            genre: 'Romance',
            age: '16+',
            description: 'Uma história de amor e vingança em um cenário sombrio e gótico.',
            quantityAvailable: 4,
            quantityTotal: 6
        },
        {
            id: 23,
            name: 'Drácula',
            author: 'Bram Stoker',
            genre: 'Terror',
            age: '16+',
            description: 'O icônico vampiro Drácula e sua influência sinistra sobre a vida de várias pessoas.',
            quantityAvailable: 3,
            quantityTotal: 5
        },
        {
            id: 24,
            name: 'O Estrangeiro',
            author: 'Albert Camus',
            genre: 'Filosófico',
            age: '16+',
            description: 'A indiferença de um homem à sociedade e às suas convenções.',
            quantityAvailable: 6,
            quantityTotal: 8
        },
        {
            id: 25,
            name: '1984',
            author: 'George Orwell',
            genre: 'Distopia',
            age: '16+',
            description: 'Uma visão sombria de um futuro onde a liberdade é completamente suprimida.',
            quantityAvailable: 1,
            quantityTotal: 3
        },
        {
            id: 26,
            name: 'O Retrato de Dorian Gray',
            author: 'Oscar Wilde',
            genre: 'Filosófico',
            age: '16+',
            description: 'Um jovem que permanece eternamente jovem enquanto seu retrato envelhece.',
            quantityAvailable: 5,
            quantityTotal: 9
        },
        {
            id: 27,
            name: 'O Conde de Monte Cristo',
            author: 'Alexandre Dumas',
            genre: 'Aventura',
            age: '16+',
            description: 'A vingança de um homem injustamente preso que se transforma em um conde poderoso.',
            quantityAvailable: 4,
            quantityTotal: 8
        },
        {
            id: 28,
            name: 'O Alquimista',
            author: 'Paulo Coelho',
            genre: 'Ficção Filosófica',
            age: '12+',
            description: 'A jornada de um pastor em busca de um tesouro e a realização de seus sonhos.',
            quantityAvailable: 2,
            quantityTotal: 5
        },
        {
            id: 29,
            name: 'O Lobo da Estepe',
            author: 'Hermann Hesse',
            genre: 'Filosófico',
            age: '16+',
            description: 'A luta interna de um homem dividido entre seus instintos selvagens e sua humanidade.',
            quantityAvailable: 3,
            quantityTotal: 6
        },
        {
            id: 30,
            name: 'A Metamorfose',
            author: 'Franz Kafka',
            genre: 'Ficção Surrealista',
            age: '16+',
            description: 'Um homem acorda transformado em um inseto gigante e lida com as consequências.',
            quantityAvailable: 5,
            quantityTotal: 7
        }
    ];

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
});

// ------------------------------- clientes ----------------------------------