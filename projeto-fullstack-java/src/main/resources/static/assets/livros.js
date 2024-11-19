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

                $('#cancelBtnP').off('click').on('click', function () {
                    console.log("clicou")
                    $('.container-form-transp').remove();
                });

                $("#formNovoLivro").off('submit').on('submit', function(e) {
                    e.preventDefault();
                    let cadastro = "cadastro";
                    envioFormButton(cadastro);
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
                                <th>Qtd. Disponível</th>
                                <th>Qtd. Total</th>
                                <th>Disponivel</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody class="list"></tbody>
                    </table>
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
                    url: 'livro',
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
        const envioFormButton = (control)=>{

            const bookName = $('#nomeLivro').val();
            const bookAuthor = $('#autorLivro').val();
            const bookGenre = $('#generoLivro').val();
            const bookAge = $('#idadeIndicativa').val();
            const bookDescription = $('#descricaoLivro').val();
            const bookQuantityAvailable = $('#qtdDisponivel').val();
            const bookQuantityTotal = $('#qtdTotal').val();
            
            let newBook = {
                id: dataLivros.length + 1, 
                nome: bookName,
                autor: bookAuthor,
                genero: bookGenre,
                idadeIndicativa: parseInt(bookAge, 10), 
                descricao: bookDescription,
                qtdDisponivel: parseInt(bookQuantityAvailable, 10), 
                qtdTotal: parseInt(bookQuantityTotal, 10),  
            };

            let livroAjax = {
                nome: bookName,
                autor: bookAuthor,
                genero: bookGenre,
                idadeIndicativa: parseInt(bookAge, 10), 
                descricao: bookDescription,
                qtdDisponivel: parseInt(bookQuantityAvailable, 10), 
                qtdTotal: parseInt(bookQuantityTotal, 10), 
            };

            switch (control) {
                case "cadastro":
                    $.ajax({
                        url: 'livro',
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
                    break;
                case "atualizar":
                    let id = $('#formEditarLivro').attr('data-id');
                    livroAjax.id = id;
                    console.log('id é: ' + id);
                    $.ajax({
                        url: `livro/${id}`,
                        type: 'PUT',
                        contentType: 'application/json', 
                        data: JSON.stringify(livroAjax), 
                        success: function(response) {
                            if(!response){
                                alert("erro ao atualizar os dados");
                            }else {
                                console.log('Livro atualizado com sucesso:', response);
                                alert("Livro atualizado com sucesso!");
                                const index = dataLivros.findIndex(livro => livro.id === response.id);
                                if (index !== -1) {
                                    dataLivros[index] = { ...dataLivros[index], ...response };
                                } else {
                                    console.log("Livro com o ID fornecido não encontrado.");
                                    alert("Livro com o ID fornecido não encontrado.");
                                    return;
                                }
                                renderBooks(dataLivros);
                            }
                            
                        },
                        error: function(xhr, status, error) {
                            console.error('Erro na requisição:', xhr.responseText);
                            
                        }
                    });
                    break;
            }
            control === "cadastro" ? $('#formNovoLivro')[0].reset() : $('#formEditarLivro')[0].reset();
            $('.container-form-transp').remove();
        };

        // Função para renderizar os livros na tabela
        async function renderBooks(bookItems) {
            async function fetchClientesForBook(bookId) {
                console.log("bookId:", bookId);
        
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: `emprestimos/livro/${bookId}`,
                        method: 'GET',
                        cache: false,
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
        
           
            async function displayAllBooks(filteredBooks = bookItems) {
                // Limpar a tabela atual
                $(".list").html('');
        
               
                for (let book of filteredBooks) {
                    let disponivel = book.qtdDisponivel >= 1 ? "Sim" : "Não";
                    let row = `
                        <tr class="row" data-id="${book.idLivro}" data-nome="${book.nome}" data-autor="${book.autor}" data-genero="${book.genero}" data-idade="${book.idadeIndicativa}" data-descricao="${book.descricao}" data-qtdDisponivel="${book.qtdDisponivel}" data-qtdTotal="${book.qtdTotal}" data-preco="">
                            <td>${book.nome}</td>
                            <td>${book.autor}</td>
                            <td>${book.genero}</td>
                            <td>${book.idadeIndicativa}</td>
                            <td>${book.descricao}</td>
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
                            qtdTotal: row.data('qtdtotal')
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
                    if (customerRow.is(':visible')) {
                        customerRow.hide();
                        return;
                    }
                    customerRow.show();
                });
            }
        
            // Atualiza a exibição inicial com todos os itens
            displayAllBooks(bookItems);
            
            // Filtrar e exibir todos os itens correspondentes ao termo de busca
            function filterBooks(term) {
                return bookItems.filter(book => 
                    book.nome.toLowerCase().includes(term.toLowerCase())
                );
            }
        
            $("#search").off("input").on("input", function() {
                const searchTerm = $(this).val().trim();
                const filteredBooks = filterBooks(searchTerm);
                displayAllBooks(filteredBooks);
            });
        }
        
        const excluir = (data) => {
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
                $.ajax({
                    url: `livro/${data.id}`,
                    type: 'DELETE',
                    contentType: 'application/json', 
                    success: function(response) {
                        if(!response){
                            alert("Dados invalidos!");
                        }else {
                            console.log('Livro excluido com sucesso::', data.id);
                            alert(`livro excluido com sucesso!`);
                            
                            $('.container-form-transp').remove();
                            const index = dataLivros.findIndex(livro => livro.id === data.id);
                            if (index !== -1) {
                              
                                dataLivros.splice(index, 1);
                                console.log(`Livro com ID ${data.id} removido do array.`);
                            } else {
                                console.log("Livro com o ID fornecido não encontrado.");
                            }

                            renderBooks(dataLivros);
                            
                        }
                    },
                    error: function(xhr, status, error) {
                        console.error('Erro na requisição:', xhr.responseText);   
                        alert(`Erro na requisição: ${xhr.responseText}`);
                    }
                });
            });
        }

    });
});
