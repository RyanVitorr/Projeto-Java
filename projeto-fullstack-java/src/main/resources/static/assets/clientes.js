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
      
                                
                            <div class="container-form-cadastroCliente">
                                <div>
                                    <label for="nomeCompleto">Nome Completo:</label>
                                    <input type="text" id="nomeCompleto" name="nomeCompleto" required>
                                </div>
                                            
                                <div>
                                    <label for="email">Email:</label>
                                    <input type="email" id="email" name="email" required>
                                </div>
                            </div>

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
        const envioFormButton = (control)=>{
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

            switch (control) {
                case "cadastro":
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
                    break;
                case "atualizar":
                    let id = $(formEditarCliente).attr('data-id');
                    clientAjax.id = id;
                    $.ajax({
                        url: `usuarios/${clientAjax.id}`,
                        type: 'PUT',
                        contentType: 'application/json', 
                        data: JSON.stringify(clientAjax), 
                        success: function(response) {
                            if(!response){
                                alert("Dados invalidos!");
                            }else {
                                console.log('Cliente atualizado com sucesso:', response);
                                alert("Cliente atualizado com sucesso!");
                                const index = dataClientes.findIndex(cliente => cliente.id === response.id);
                                if (index !== -1) {
                                   
                                    dataClientes[index] = { ...dataClientes[index], ...response };
                                } else {
                                    console.log("Cliente com o ID fornecido não encontrado.");
                                }
                                renderClientes(dataClientes);
                            }
                        },
                        error: function(xhr, status, error) {
                            console.error('Erro na requisição:', xhr.responseText);   
                        }
                    });
                    break;
            }
            control === "cadastro" ? $('#formNovoCliente')[0].reset() : $('#formEditarCliente')[0].reset();
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
                        data: { clienteId: clienteId },
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
                    let row = `
                        <tr class="row" data-id="${cliente.id}" data-nome="${cliente.nome}" data-cpf="${cliente.cpf}" data-email="${cliente.email}" data-idade="${cliente.dataNascimento
                        }" data-telefone="${cliente.telefone}" data-endereco="${cliente.endereco}">
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
                    const data = await fetchLivrosForClientes(cliente.id);
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
                                    <tbody class="customer-list list-${cliente.id}"></tbody>
                                </table>
                            </td>
                        </tr>`);
                        data.forEach(data => {
                            $(`.list-${cliente.id}`).append(`<tr>
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
                        console.log(`Nenhum cliente encontrado para o livro ID: ${cliente.id}`);
                    }
                }
        
                // Atualiza a exibição da página atual
                $("#current-page").text(page);

                    
                // Adiciona eventos de clique nas linhas dos livros
                $('.row').off('click').on('click', function(event) {

                    if ($(event.target).is('.btn-edit')) {
                        event.stopPropagation();
                        
                        let row = $(event.target).closest('.row');

                        let clientData = {
                            id: row.attr('data-id'),
                            nome: row.attr('data-nome'),
                            cpf: row.attr('data-cpf'),
                            email: row.attr('data-email'),
                            idade: row.attr('data-idade'),
                            telefone: row.attr('data-telefone'),
                            endereco: row.attr('data-endereco'),
                        };
                        console.log(clientData);
                        editar(clientData);
                        return;
                    } else if ($(event.target).is('.btn-delete')) {
                        event.stopPropagation();
                        let row = $(event.target).closest('.row');

                        let clientData = {
                            id: row.attr('data-id'),
                            email: row.attr('data-email'),
                            nome: row.attr('data-nome')
                        };

                        excluir(clientData);
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

            const editar = (data)=>{
                $('#formContainer').html(`
                    <div class="container-form-transp"> 
                        
                        <form id="formEditarCliente" data-id="${data.id}">
                            <div class="cancelBtn">
                                <p id="cancelBtnP">
                                    X
                                </p>
                            </div>
                            
                            <h3>Editar Cliente</h3>

                            <div class="container-form-cadastroCliente">
                                <div>
                                    <label for="nomeCompleto">Nome Completo:</label>
                                    <input type="text" id="nomeCompleto" name="nomeCompleto" required>
                                </div>
                                            
                                <div>
                                    <label for="email">Email:</label>
                                    <input type="email" id="email" name="email" required>
                                </div>
                            </div>

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
                                
                            <button type="submit" id="editarClienteBtn">Confirmar</button>
                        </form>
                    </div>
                `);

                $('#nomeCompleto').val(data.nome);
                $('#email').val(data.email);
                $('#cpf').val(data.cpf);
                $('#telefone').val(data.telefone);
                $('#idade').val(data.idade);
                $('#endereco').val(data.endereco);

                $('#cancelBtnP').off('click').on('click', function () {
                    console.log("clicou")
                    $('.container-form-transp').remove();
                });

                $("#formEditarCliente").off('submit').on('submit', function(e) {
                    e.preventDefault(); 
                    let atualizar = "atualizar"
                    envioFormButton(atualizar);
                });
            };

            const excluir = (data)=>{
                $('#formContainer').html(`
                    <div class="container-form-transp"> 
                        
                        <div class="container-excluir">
                        
                            <h3>Você deseja excluir o cliente "${data.nome}" do banco de dados?</h3>



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


