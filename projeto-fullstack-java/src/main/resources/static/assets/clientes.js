$(document).ready(function() {
    // Quando clicar na opção "Clientes" no menu lateral
    let dataClientes;
    let dataEmprestimos;

    $('.navbar ul li a:contains("Clientes")').on('click', function() {
        $('.navbar ul li a').removeClass('toggleBackground');
        $('.navbar ul li a:contains("Clientes")').addClass('toggleBackground');
        
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

                    <div class="container-form-transp">

                        <form id="formNovoCliente">
                            <div class="cancelBtn">
                                <p id="cancelBtnP">
                                    X
                                </p>
                            </div>

                            <h3>Registrar Novo Cliente</h3>
      
                                
                            <label for="nomeCompleto">Nome Completo:</label>
                            <input type="text" id="nomeCompleto" name="nomeCompleto" required>
                               
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email" required>

                            <div class="container-form-cadastroCliente">
                                <div>
                                    <label for="cpf">CPF:</label>
                                    <input type="text" id="cpf" name="cpf" required>
                                </div>

                                <div>
                                    <label for="telefone">Telefone:</label>
                                    <input type="text" id="telefone" name="telefone" required>
                                </div>

                                <div>
                                    <label for="idade">Nascimento:</label>
                                    <input type="date" id="idade" name="idade" required>
                                </div>
                            </div>
                               
                            <label for="endereco">Endereço:</label>
                            <input type="text" id="endereco" name="endereco" required>
                                
                            

                            

                            <button type="submit">Registrar Cliente</button>
                        </form>
                    </div>

                `).find('#formNovoCliente').show();

                $('#cpf').mask('000.000.000-00');
                $('#telefone').mask('(00) 00000-0000');
                

                $('#cancelBtnP').off('click').on('click', function () {
                    console.log("clicou")
                    $('.container-form-transp').remove();
                });

                $("#formNovoCliente").off('submit').on('submit', function(e) {
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
                                <th>Nome do Cliente</th>
                                <th>Cpf</th>
                                <th>Email</th>
                                <th>Telefone</th>
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



        const fetchClientes = ()=> {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: 'usuarios',
                    type: 'GET',
                    cache: false,
                    success: function(data) {    
                        dataClientes = data;
                        console.log(dataClientes);
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
            renderClientes(dataClientes);
        }).catch(error => {
            console.error('Erro ao buscar Clientes:', error);  
        });

        // Função para adicionar um novo cliente ao array de objetos ao enviar o formulário (vou modificar. ass: Ryan)
        const envioFormButton = ()=>{

            const clienteNome = $('#nomeCompleto').val();
            const clienteCpf = $('#cpf').val();        
            const clienteEmail= $('#email').val();
            const clienteTelefone = $('#telefone').val();
            const clienteEndereço = $('#endereco').val();
            const clienteNascimento = $('#idade').val(); 

            if (!clienteCpf || !validarCPF(clienteCpf)) {
                alert("Por favor, insira um CPF válido.");
                return false; 
            }
            
            if (!clienteTelefone || !validarTelefone(clienteTelefone)) {
                alert("Por favor, insira um telefone válido.");
                return false; 
            }
           
            if (!clienteNascimento || !validarDataNascimento(clienteNascimento)) {
                alert("Por favor, insira uma data de nascimento válida no formato 'yyyy-mm-dd'.");
                return false;
            }
            
            let newClient = {
                id: dataClientes.length + 1, 
                clienteNome: clienteNome,
                clienteCpf: clienteCpf,
                clienteEmail: clienteEmail,
                clienteTelefone: clienteTelefone,
                clienteEndereço: clienteEndereço, 
                clienteNascimento: clienteNascimento,                 
            };

            let clientAjax = {
                nome: clienteNome,
                cpf: clienteCpf,
                email: clienteEmail,
                telefone: clienteTelefone, 
                endereco: clienteEndereço,
                dataNascimento: clienteNascimento, 
            };

            console.log(clienteNascimento);

            $.ajax({
                url: 'usuarios',
                type: 'POST',
                contentType: 'application/json', 
                data: JSON.stringify(clientAjax), 
                success: function(response) {
                    if(!response){
                        alert("O Cliente cadastrado já existe na base de dados");
                    }else {
                        console.log('Cliente cadastrado com sucesso:', response);
                        alert("Cliente cadastrado com sucesso:");
                        dataClientes.push(newClient);
                        renderClientes(dataClientes);
                    }
                },
                error: function(xhr, status, error) {
                    console.error('Erro na requisição:', xhr.responseText);   
                }
            });
    
            $('#formNovoCliente')[0].reset();
            $('.container-form-transp').remove();
    
           
        };

        const validarCPF = (cpf)=>{
            const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
            return regexCpf.test(cpf);
        }

        const validarTelefone = (telefone)=>{
            const regexTelefone = /^\(\d{2}\) \d{5}-\d{4}$/; 
            return regexTelefone.test(telefone);
        }

        const validarDataNascimento = (data)=>{
            const regexData = /^\d{4}-\d{2}-\d{2}$/;
            return regexData.test(data);
        }

        // Função para renderizar os livros na tabela
        async function renderClientes(clientsItems) {
            let rowsPerPage = parseInt($("#entries").val());
            let currentPage = 1;
            let totalRows = clientsItems.length;
            let totalPages = Math.ceil(totalRows / rowsPerPage);
        
            async function fetchLivrosForClientes(clienteId) {
                console.log("clienteId:", clienteId); 

                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: 'emprestimos/porCliente',
                        type: 'GET',
                        cache: false,
                        data: { clienteId: 1 },
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
            async function displayPage(page, filteredClient = clientsItems) {
                let start = (page - 1) * rowsPerPage;
                let end = start + rowsPerPage;
                let rowsToDisplay = filteredClient.slice(start, end);

                $(".list").html('');

                let n = 1;
        
                // Adicionar cada cliente como uma nova linha na tabela
                for (let cliente of rowsToDisplay) {
                    // Cria uma linha para a tabela de clientes
                    n = n + 1;
                    let row = `
                        <tr class="row" data-id="${n}">
                            <td>${cliente.nome}</td>
                            <td>${cliente.cpf}</td>
                            <td>${cliente.email}</td>
                            <td>${cliente.telefone}</td>
                            <td>${cliente.endereco}</td>          
                            <td class="td-perso">
                                <button class="btn-edit">✏️</button>
                                <button class="btn-delete">🗑️</button>
                            </td>
                        </tr>
                        
                    `;
                    $(".list").append(row);

                    // Buscar livros para cada cliente assim que a linha é adicionada
                    const data = await fetchLivrosForClientes(1);
                    if (data.length > 0) {
                        
                        $('.list').append(`<tr class="customer-table" style="display: none;">
                            <td colspan="8">
                                <table class="table customer-list-table">
                                    <thead>
                                        <tr>
                                            <th>Nome do Livro</th>
                                            <th>Autor</th>
                                            <th>Gênero</th>
                                            <th>Descrição</th>
                                            <th>Preço</th>
                                            <th>Quantidade</th>
                                            <th>Data Emprestimo</th>
                                            <th>Data Devolução</th>
                                            <th>Data Prev. Devolução</th>
                                        </tr>
                                    </thead>
                                    <tbody class="customer-list list-${n}"></tbody>
                                </table>
                            </td>
                        </tr>`);
                        data.forEach(data => {
                            $(`.list-${n}`).append(`<tr>
                                <td>${data.livro.nome}</td>
                                <td>${data.livro.autor}</td>
                                <td>${data.livro.genero}</td>
                                <td>${data.livro.descricao}</td>
                                <td>${data.preco}</td>
                                <td>${data.quantidade}</td>
                                <td>${data.dataEmprestimo}</td>
                                <td>${data.dataDevolucao}</td>
                                <td>${data.dataPrevDevolucao}</td>
                            </tr>`);                           
                        });
                    } else {
                        console.log(`Nenhum cliente encontrado para o livro ID: ${cliente.idCliente}`);
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

            function filterClients(term) {
                return clientsItems.filter(cliente => 
                    cliente.nome.toLowerCase().includes(term.toLowerCase())
                );
            }

            $("#search").off("input").on("input", function() {
                const searchTerm = $(this).val().trim();
                const filteredClients = filterClients(searchTerm);
                totalRows = filteredClients.length;
                totalPages = Math.ceil(totalRows / rowsPerPage);
                currentPage = 1; 
                displayPage(currentPage, filteredClients);
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


