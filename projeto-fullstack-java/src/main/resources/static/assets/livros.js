$(document).ready(function() { 
    // Quando clicar na opção "Livros" no menu lateral
    let dataLivros;
    const generos = [
        { nome: "Fantasia" },
        { nome: "Distopia" },
        { nome: "Ficção Científica" },
        { nome: "Romance" },
        { nome: "Aventura" },
        { nome: "Terror" },
        { nome: "Policial" },
        { nome: "Histórico" },
        { nome: "Biografia" },
        { nome: "Comédia" },
        { nome: "Drama" },
        { nome: "Mistério" },
        { nome: "Fantasia Épica" },
        { nome: "Thriller" },
        { nome: "Literatura Infantil" },
        { nome: "Poesia" },
        { nome: "Erótico" },
        { nome: "Guerra" },
        { nome: "Espionagem" },
        { nome: "Autoajuda" },
        { nome: "Clássico" }
    ];

    $('.navbar ul li a:contains("Livros")').on('click', function() {
        $('.navbar ul li a').removeClass('toggleBackground');
        $('.navbar ul li a:contains("Livros")').addClass('toggleBackground');
     
        $('.main-content').html(`
            <h2>Gestão de Livros</h2>
            <button id="registrarLivro">Registrar Novo Livro</button>
            <button id="alugarLivro">Alugar Livro</button>
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

                            <div class="container-form-cadastroCliente">
                                <div>
                                    <label for="nomeLivro">Nome do Livro:</label>
                                    <input type="text" id="nomeLivro" name="nomeLivro" required placeholder="Digite o nome do livro">
                                </div>

                                <div>
                                    <label for="autorLivro">Autor:</label>
                                    <input type="text" id="autorLivro" name="autorLivro" required placeholder="Digite o nome do autor">
                                </div>

                                 <div>
                                    <label for="generoLivro">Gênero:</label>
                                    <select id="generoLivro" name="generoLivro" required>
                                        <option value="" disabled selected>Selecione o gênero do livro</option>
                                    </select>
                                </div>
                            </div>

                            <div class="container-form-cadastroCliente">
                                <div>
                                    <label for="descricaoLivro">Descrição:</label>
                                    <input type="text" id="descricaoLivro" name="descricaoLivro" required placeholder="Digite a descrição do livro">
                                </div>

                                <div>
                                    <label for="idadeIndicativa">Idade Indicativa:</label>
                                    <input type="number" id="idadeIndicativa" name="idadeIndicativa" required min="0" max="18" placeholder="Digite a idade indicativa">
                                </div>
                            </div>

                            <div class="container-form-cadastroCliente">
                               

                                <div>
                                    <label for="precoLivro">Preço do Livro:</label>
                                    <input type="text" id="precoLivro" name="precoLivro" required placeholder="Digite o preço (ex: 20,00)">
                                </div>

                                <div>
                                    <label for="qtdDisponivel">Quantidade Disponível:</label>
                                    <input type="number" id="qtdDisponivel" name="qtdDisponivel" required min="0" step="1" placeholder="Digite a quantidade disponível">
                                </div>

                                <div>
                                    <label for="qtdTotal">Quantidade Total:</label>
                                    <input type="number" id="qtdTotal" name="qtdTotal" required min="0" step="1" placeholder="Digite a quantidade total">
                                </div>
                            </div>

                            <button id="submiteRegistroLivro" type="submit">Registrar Livro</button>

                        </form>
                    </div>
                `).find('#formNovoLivro').show();

                $.each(generos, function(index, genero) {
                    $('#generoLivro').append($("<option>").val(genero.nome).text(genero.nome));
                });
                
                $('#precoLivro').mask('000.000.000,00', { reverse: true });

                $('#cancelBtnP').off('click').on('click', function () {
                    console.log("clicou")
                    $('.container-form-transp').remove();
                });

                $("#formNovoLivro").off('submit').on('submit', function(e) {
                    e.preventDefault(); 
                    envioFormButton();
                });
            }
        });

        $('#conteudo-principal').html(`
            <div class="table-wrapper">
                <div id="div-filter">
                    <div class="filter-exibir-container">
                        <label for="entries">Exibir</label>
                        <select id="entries">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                        <span>resultados por página</span>
                    </div>
                    <div class="pesquisa-container"><input type="text" id="search" placeholder="Buscar..."></div>
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

        /*  <div class="pagination">
                <button class="prev">Anterior</button>
                <span>Página <span id="current-page">1</span></span>
                <button class="next">Próxima</button>
            </div> */

        const fetchLivros = ()=> {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: 'livro/livro',
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
        const envioFormButton = ()=>{

            const bookName = $('#nomeLivro').val();
            const bookAuthor = $('#autorLivro').val();
            const bookGenre = $('#generoLivro').val();
            const bookAge = $('#idadeIndicativa').val();
            const bookDescription = $('#descricaoLivro').val();
            const preco = $('#precoLivro').val();
            const bookQuantityAvailable = $('#qtdDisponivel').val();
            const bookQuantityTotal = $('#qtdTotal').val();
    
            
            let newBook = {
                id: dataLivros.length + 1, 
                nome: bookName,
                autor: bookAuthor,
                genero: bookGenre,
                preco: preco,
                idadeIndicativa: parseInt(bookAge, 10), 
                descricao: bookDescription,
                qtdDisponivel: parseInt(bookQuantityAvailable, 10), 
                qtdTotal: parseInt(bookQuantityTotal, 10), 
                preco: parseFloat(preco.replace(',', '.')) 
            };

            let livroAjax = {
                nome: bookName,
                autor: bookAuthor,
                genero: bookGenre,
                idadeIndicativa: parseInt(bookAge, 10), 
                descricao: bookDescription,
                qtdDisponivel: parseInt(bookQuantityAvailable, 10), 
                qtdTotal: parseInt(bookQuantityTotal, 10), 
                preco: parseFloat(preco.replace(',', '.')) 
            };

            $.ajax({
                url: 'livro/livro',
                type: 'POST',
                contentType: 'application/json', 
                data: JSON.stringify(livroAjax), 
                success: function(response) {
                    if(!response){
                        alert("O livro cadastrado já existe na base de dados");
                    }else {
                        console.log('Livro cadastrado com sucesso:', response);
                        alert("Livro cadastrado com sucesso!");
                        dataLivros.push(newBook);
                        renderBooks(dataLivros);
                    }
                    
                },
                error: function(xhr, status, error) {
                    console.error('Erro na requisição:', xhr.responseText);
                    
                }
            });
    
            $('#formNovoLivro')[0].reset();
            $('.container-form-transp').remove();
    
            renderBooks(dataLivros);
        };

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
                for (let book of rowsToDisplay) {
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
                    let clientes = await fetchClientesForBook(book.idLivro);
                    if (clientes.length > 0) {
                        console.log(clientes);
                        $('.list').append(`<tr class="customer-table" style="display: none;">
                                <td colspan="10">
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
                                        <tbody class="customer-list list-${book.idLivro}"></tbody>
                                    </table>
                                </td>
                        </tr>`);

                        clientes.forEach(cliente => {
                            $(`.list-${book.idLivro}`).append(`<tr>
                                <td>${cliente.usuario.nome}</td>
                                <td>${cliente.usuario.cpf}</td>
                                <td>${cliente.usuario.telefone}</td>
                                <td>${cliente.usuario.endereco}</td>
                                <td>${cliente.preco}</td>
                                <td>${cliente.quantidade}</td>
                                <td>${cliente.dataEmprestimo}</td>
                                <td>${cliente.dataDevolucao ? new Date(cliente.dataDevolucao).toLocaleDateString('pt-BR') : 'Não Devolvido'}</td>
                                <td>${cliente.dataPrevDevolucao}</td>
                            </tr>`);  
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

                            <div class="container-form-cadastroCliente">
                                <div>
                                    <label for="nomeLivro">Nome do Livro:</label>
                                    <input type="text" id="nomeLivro" name="nomeLivro" required placeholder="Digite o nome do livro">
                                </div>

                                <div>
                                    <label for="autorLivro">Autor:</label>
                                    <input type="text" id="autorLivro" name="autorLivro" required placeholder="Digite o nome do autor">
                                </div>

                                 <div>
                                    <label for="generoLivro">Gênero:</label>
                                    <select id="generoLivro" name="generoLivro" required>
                                        <option value="" disabled selected>Selecione o gênero do livro</option>
                                    </select>
                                </div>
                            </div>

                            <div class="container-form-cadastroCliente">
                                <div>
                                    <label for="descricaoLivro">Descrição:</label>
                                    <input type="text" id="descricaoLivro" name="descricaoLivro" required placeholder="Digite a descrição do livro">
                                </div>

                                <div>
                                    <label for="idadeIndicativa">Idade Indicativa:</label>
                                    <input type="number" id="idadeIndicativa" name="idadeIndicativa" required min="0" max="18" placeholder="Digite a idade indicativa">
                                </div>
                            </div>

                            <div class="container-form-cadastroCliente">
                      
                                <div>
                                    <label for="precoLivro">Preço do Livro:</label>
                                    <input type="text" id="precoLivro" name="precoLivro" required placeholder="Digite o preço (ex: 20,00)">
                                </div>

                                <div>
                                    <label for="qtdDisponivel">Quantidade Disponível:</label>
                                    <input type="number" id="qtdDisponivel" name="qtdDisponivel" required min="0" step="1" placeholder="Digite a quantidade disponível">
                                </div>

                                <div>
                                    <label for="qtdTotal">Quantidade Total:</label>
                                    <input type="number" id="qtdTotal" name="qtdTotal" required min="0" step="1" placeholder="Digite a quantidade total">
                                </div>
                            </div>

                            <button type="submit" id="editarLivarBtn">Confirmar</button>
                        </form>
                    </div>
                `);

                $.each(generos, function(index, genero) {
                    $('#generoLivro').append($("<option>").val(genero.nome).text(genero.nome));
                });

                $('#precoLivro').mask('000.000.000,00', { reverse: true });

                
                $('#nomeLivro').val(data.nome);
                $('#autorLivro').val(data.autor);
                $('#descricaoLivro').val(data.descricao);
                $('#precoLivro').val(data.preco);
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
                        
                        <div class="container-excluir" data-id="${data.id}">
                        
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

                $("#confirmBtnConfirm").off('click').on('click', function(e) {
                    let idLivroDel = $($(this)).parents(".container-excluir").data('id');
                    let formatIdLivro = parseInt(idLivroDel);
                    console.log(formatIdLivro);
                    fetchExcluirLivro(formatIdLivro);
                });
            };

            async function fetchExcluirLivro(bookId) {
                console.log("bookId:", bookId); 
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: `livro/livro/${bookId}`,  
                        type: 'DELETE',    
                        success: function(data) {
                            console.log("Dados recebidos:", data);
                            resolve(data);
                            alert("Livro excluido com sucesso!")
                            $('.container-form-transp').remove();
                            dataLivros = dataLivros.filter(livro => livro.id !== bookId);
                            renderBooks(dataLivros);
                        },
                        error: function(xhr, status, error) {            
                            if (xhr.status === 409) {
                                alert('Erro: ' + xhr.responseText); 
                            } else {
                                alert('Erro ao excluir o livro: ' + xhr.responseText);
                                $('.container-form-transp').remove();
                            }
                            reject(xhr.responseText);
                        }
                    });
                    
                });
            }

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
