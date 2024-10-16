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

                        <label for="cpf">Cpf:</label>
                        <input type="text" id="cpf" name="cpf" required><br>

                        <label for="telefone">Telefone:</label>
                        <input type="number" id="book-quantity-available" name="telefone" required><br>

                        <label for="genre">Gênero:</label>
                        <input type="text" id="genre" name="genre" required><br>

                        <label for="age">Idade:</label>
                        <input type="text" id="age" name="age" required><br>

                        <label for="endereco">Endereço:</label>
                        <input type="text" id="endereco" name="endereco" required><br>

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
                                <th>Telefone</th>
                                <th>Gênero</th>
                                <th>Idade</th>
                                <th>Endereço</th>
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
            name: 'Ana Silva',
            cpf: '123.456.789-00',
            telefone: '(11) 98765-4321',
            genre: 'Romance',
            age: '18+',
            endereco: 'Rua das Flores, 123 - São Paulo, SP',
        },
        {
            id: 2,
            name: 'Bruno Pereira',
            cpf: '321.654.987-11',
            telefone: '(21) 98711-1234',
            genre: 'Ficção',
            age: '16+',
            endereco: 'Avenida Paulista, 1000 - São Paulo, SP',
        },
        {
            id: 3,
            name: 'Carlos Alberto',
            cpf: '987.654.321-22',
            telefone: '(11) 91234-5678',
            genre: 'Biografia',
            age: '14+',
            endereco: 'Rua Augusta, 500 - São Paulo, SP',
        },
        {
            id: 4,
            name: 'Daniela Souza',
            cpf: '654.321.987-33',
            telefone: '(31) 98777-5566',
            genre: 'Mistério',
            age: '12+',
            endereco: 'Rua XV de Novembro, 70 - Curitiba, PR',
        },
        {
            id: 5,
            name: 'Eduardo Martins',
            cpf: '789.456.123-44',
            telefone: '(21) 98765-9999',
            genre: 'Aventura',
            age: '18+',
            endereco: 'Avenida Atlântica, 1010 - Rio de Janeiro, RJ',
        },
        {
            id: 6,
            name: 'Fernanda Castro',
            cpf: '123.789.456-55',
            telefone: '(71) 99988-7766',
            genre: 'História',
            age: '10+',
            endereco: 'Rua das Acácias, 33 - Belo Horizonte, MG',
        },
        {
            id: 7,
            name: 'Gabriel Oliveira',
            cpf: '321.987.654-66',
            telefone: '(51) 98765-4321',
            genre: 'Ciência',
            age: '16+',
            endereco: 'Rua São João, 250 - Porto Alegre, RS',
        },
        {
            id: 8,
            name: 'Helena Costa',
            cpf: '456.123.789-77',
            telefone: '(41) 99999-1234',
            genre: 'Fantasia',
            age: '18+',
            endereco: 'Avenida Brasil, 1000 - Brasília, DF',
        },
        {
            id: 9,
            name: 'Isabela Ribeiro',
            cpf: '789.321.654-88',
            telefone: '(71) 98888-1111',
            genre: 'Humor',
            age: '12+',
            endereco: 'Rua da Paz, 440 - Salvador, BA',
        },
        {
            id: 10,
            name: 'João Mendes',
            cpf: '654.987.321-99',
            telefone: '(81) 98777-2233',
            genre: 'Suspense',
            age: '14+',
            endereco: 'Avenida Boa Viagem, 300 - Recife, PE',
        },
        {
            id: 11,
            name: 'Karen Dias',
            cpf: '123.456.123-00',
            telefone: '(48) 99888-6677',
            genre: 'Terror',
            age: '16+',
            endereco: 'Rua das Laranjeiras, 720 - Florianópolis, SC',
        },
        {
            id: 12,
            name: 'Leonardo Nunes',
            cpf: '123.654.987-01',
            telefone: '(11) 91122-3344',
            genre: 'Romance',
            age: '18+',
            endereco: 'Rua das Palmeiras, 900 - São Paulo, SP',
        },
        {
            id: 13,
            name: 'Mariana Lima',
            cpf: '222.333.444-02',
            telefone: '(61) 99999-4321',
            genre: 'Ficção',
            age: '12+',
            endereco: 'Avenida Central, 100 - Brasília, DF',
        },
        {
            id: 14,
            name: 'Nicolas Rocha',
            cpf: '333.444.555-03',
            telefone: '(51) 91111-8888',
            genre: 'Biografia',
            age: '14+',
            endereco: 'Rua Flores do Campo, 500 - Porto Alegre, RS',
        },
        {
            id: 15,
            name: 'Olivia Faria',
            cpf: '444.555.666-04',
            telefone: '(21) 98766-3322',
            genre: 'Mistério',
            age: '16+',
            endereco: 'Avenida Maracanã, 300 - Rio de Janeiro, RJ',
        },
        {
            id: 16,
            name: 'Paulo Guedes',
            cpf: '555.666.777-05',
            telefone: '(71) 98888-2244',
            genre: 'Aventura',
            age: '18+',
            endereco: 'Rua Nova Esperança, 44 - Salvador, BA',
        },
        {
            id: 17,
            name: 'Quintino Reis',
            cpf: '666.777.888-06',
            telefone: '(81) 98711-5566',
            genre: 'História',
            age: '12+',
            endereco: 'Avenida Principal, 710 - Recife, PE',
        },
        {
            id: 18,
            name: 'Rafaela Azevedo',
            cpf: '777.888.999-07',
            telefone: '(48) 91122-6677',
            genre: 'Ciência',
            age: '16+',
            endereco: 'Rua da Alegria, 55 - Florianópolis, SC',
        },
        {
            id: 19,
            name: 'Sérgio Lopes',
            cpf: '888.999.111-08',
            telefone: '(11) 99999-4433',
            genre: 'Fantasia',
            age: '18+',
            endereco: 'Rua do Sol, 777 - São Paulo, SP',
        },
        {
            id: 20,
            name: 'Tânia Moraes',
            cpf: '999.111.222-09',
            telefone: '(31) 98888-5566',
            genre: 'Humor',
            age: '10+',
            endereco: 'Rua da Amizade, 999 - Belo Horizonte, MG',
        },
        {
            id: 21,
            name: 'Ulisses Gomes',
            cpf: '111.222.333-10',
            telefone: '(41) 99988-6677',
            genre: 'Suspense',
            age: '14+',
            endereco: 'Avenida das Árvores, 500 - Curitiba, PR',
        },
        {
            id: 22,
            name: 'Vera Lúcia',
            cpf: '222.333.444-11',
            telefone: '(21) 91122-3344',
            genre: 'Terror',
            age: '18+',
            endereco: 'Rua do Porto, 888 - Rio de Janeiro, RJ',
        },
        {
            id: 23,
            name: 'Wagner Campos',
            cpf: '333.444.555-12',
            telefone: '(81) 98777-5566',
            genre: 'Romance',
            age: '16+',
            endereco: 'Avenida das Estrelas, 200 - Recife, PE',
        },
        {
            id: 24,
            name: 'Xavier Andrade',
            cpf: '444.555.666-13',
            telefone: '(71) 98888-7766',
            genre: 'Ficção',
            age: '12+',
            endereco: 'Rua da Glória, 150 - Salvador, BA',
        },
        {
            id: 25,
            name: 'Yasmin Barreto',
            cpf: '555.666.777-14',
            telefone: '(48) 91122-1122',
            genre: 'Biografia',
            age: '18+',
            endereco: 'Avenida das Ondas, 400 - Florianópolis, SC',
        },
        {
            id: 26,
            name: 'Zeca Ferreira',
            cpf: '666.777.888-15',
            telefone: '(11) 98777-2233',
            genre: 'Mistério',
            age: '16+',
            endereco: 'Rua Nova Vida, 600 - São Paulo, SP',
        },
        {
            id: 27,
            name: 'Amanda Oliveira',
            cpf: '777.888.999-16',
            telefone: '(31) 99999-3344',
            genre: 'Aventura',
            age: '14+',
            endereco: 'Rua das Rosas, 70 - Belo Horizonte, MG',
        },
        {
            id: 28,
            name: 'Bernardo Santos',
            cpf: '888.999.111-17',
            telefone: '(41) 91122-5566',
            genre: 'História',
            age: '16+',
            endereco: 'Rua do Farol, 990 - Curitiba, PR',
        },
        {
            id: 29,
            name: 'Cláudia Freitas',
            cpf: '999.111.222-18',
            telefone: '(21) 98766-7788',
            genre: 'Ciência',
            age: '18+',
            endereco: 'Avenida do Mar, 999 - Rio de Janeiro, RJ',
        },
        {
            id: 30,
            name: 'Diego Gonçalves',
            cpf: '111.222.333-19',
            telefone: '(71) 98888-9999',
            genre: 'Fantasia',
            age: '10+',
            endereco: 'Rua da Tranquilidade, 40 - Salvador, BA',
        },
        {
            id: 31,
            name: 'Estela Cunha',
            cpf: '222.333.444-20',
            telefone: '(81) 98777-3344',
            genre: 'Humor',
            age: '12+',
            endereco: 'Rua da Saudade, 800 - Recife, PE',
        },
    ];
    

    // Função para renderizar os livros na tabela
    function renderClient(clientItems) {
        let rowsPerPage = parseInt($("#entries").val());
        let currentPage = 1;
        let totalRows = clientItems.length;
        let totalPages = Math.ceil(totalRows / rowsPerPage);
    
        // Função para buscar os clientes relacionados ao ID do livro
        function fetchBookForclients(clientId) {
            return new Promise((resolve) => {
                // Simulação de dados retornados pela API (exemplo)
                let fakeBooks = [
                    { name: "Livro A", author: 'Autor A', genre: 'Gênero A', description: 'Descrição do Livro A', preco: "50", qtdAlugada: 1, dataAluguel: "2024-01-10", dataDevolucao: "2024-01-20", atrasado: 'não' },
                    { name: "Livro B", author: 'Autor B', genre: 'Gênero B', description: 'Descrição do Livro B', preco: "50", qtdAlugada: 1, dataAluguel: "2024-01-10", dataDevolucao: "2024-01-20", atrasado: 'não' }
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
        
            // Adicionar cada cliente como uma nova linha na tabela
            rowsToDisplay.forEach(function(client) {
                // Cria uma linha para a tabela de clientes
                let row = `
                    <tr class="row" data-id="${client.id}">   
                        <td>${client.name}</td>
                        <td>${client.cpf}</td>
                        <td>${client.telefone}</td>
                        <td>${client.genre}</td>
                        <td>${client.age}</td>
                        <td>${client.endereco}</td>
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
                                        <th>Nome do livro</th>
                                        <th>Autor</th>
                                        <th>Gênero</th>
                                        <th>Idade indicativa</th>
                                        <th>Preço</th>
                                        <th>Qtd. Alugada</th>
                                        <th>Data de Aluguel</th>
                                        <th>Data de Devolução</th>
                                        <th>Atrasado</th>
                                    </tr>
                                </thead>
                                <tbody class="customer-list"></tbody>
                            </table>
                        </td>
                    </tr>
                `;
        
                $(".list").append(row);
        
                // Buscar livros para cada cliente assim que a linha é adicionada
                fetchBookForclients(client.id).then(livros => {
                    // Adicionar livros à tabela de clientes
                    let customerRow = $('.row[data-id="' + client.id + '"]').next('.customer-table');
                    livros.forEach(livro => {
                        let livroRow = `
                            <tr>
                                <td>${livro.name}</td>
                                <td>${livro.author}</td>
                                <td>${livro.genre}</td>
                                <td>${livro.description}</td>
                                <td>${livro.preco}</td>
                                <td>${livro.qtdAlugada}</td>
                                <td>${livro.dataAluguel}</td>
                                <td>${livro.dataDevolucao}</td>
                                <td>${livro.atrasado}</td>
                            </tr>
                        `;
                        customerRow.find('.customer-list').append(livroRow);
                    });
                });
            });
        
            // Atualiza a exibição da página atual
            $("#current-page").text(page);
        
            // Adiciona eventos de clique nas linhas dos clientes
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