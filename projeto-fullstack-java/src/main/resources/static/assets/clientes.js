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

        // Função para renderizar os clientes e seus livros relacionados na tabela
        async function renderClientes(clientsItems) {
            // Função para buscar livros de cada cliente
            async function fetchLivrosForClientes(clienteId) {
                console.log("clienteId:", clienteId);
        
                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: `emprestimos/cliente/${clienteId}`,
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
        
            // Função para exibir clientes
            async function displayAllClientes(filteredClients = clientsItems) {
                $(".list").html(''); // Limpa a lista de clientes
        
                for (let cliente of filteredClients) {
                    let row = `
                        <tr class="row" data-id="${cliente.id}" data-nome="${cliente.nome}" data-cpf="${cliente.cpf}" data-email="${cliente.email}" data-idade="${cliente.dataNascimento}" data-telefone="${cliente.telefone}" data-endereco="${cliente.endereco}">
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
        
                    // Buscar livros para cada cliente e adicionar à tabela
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
                                            <th>Data Empréstimo</th>
                                            <th>Data Devolução</th>
                                            <th>Data Prev. Devolução</th>
                                        </tr>
                                    </thead>
                                    <tbody class="customer-list list-${cliente.id}"></tbody>
                                </table>
                            </td>
                        </tr>`);
                        data.forEach(livro => {
                            $(`.list-${cliente.id}`).append(`<tr ">
                                <td>${livro.livro.nome}</td>
                                <td>${livro.livro.autor}</td>
                                <td>${livro.livro.genero}</td>
                                <td>${livro.livro.descricao}</td>
                                <td>${livro.preco}</td>
                                <td>${livro.quantidade}</td>
                                <td>${livro.dataEmprestimo}</td>
                                <td class="td-data-devolucao">${livro.dataDevolucao == null ? `<button data-id='${livro.idEmprestimo}' class='devolver-livro'>Devolver</button>` : livro.dataDevolucao}</td>
                                <td>${livro.dataPrevDevolucao}</td>
                            </tr>`);
                        });
                    } else {
                        console.log(`Nenhum livro encontrado para o cliente ID: ${cliente.id}`);
                    }
                }

                $(".devolver-livro").off('click').on('click', function(e){
                    const dataAtual = new Date();
                    console.log("Data atual: ", dataAtual);
                    const dataFormatada = dataAtual.toISOString().split('T')[0];
                    console.log("Data formatada: " + dataFormatada);
                    let idEmprestimo = $(this).data('id');
                    console.log(idEmprestimo);
                    console.log("data-idEmprestimo:", $(this).data('id'));
                    console.log($(this));
                    $(this).parent().html(dataFormatada);
                    

                    $.ajax({
                        url: `emprestimos/${idEmprestimo}`,
                        type: 'PUT',
                        contentType: 'application/json',
                        data: JSON.stringify(dataFormatada),
                        success: function(response) {
                            
                            console.log('Emprestimo atualizado com sucesso!');
                            alert(`Emprestimo atualizado com sucesso!`);                              
                            
                        },
                        error: function(xhr, status, error) {
                            console.error('Erro na requisição:', xhr.responseText);   
                            alert(`Erro na requisição: ${xhr.responseText}`);
                        }
                    });
                });
        
                // Adiciona eventos de clique nas linhas dos clientes
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
                    customerRow.toggle(); // Alterna a visibilidade da linha de detalhes dos livros
                });
            }
        
            // Atualiza a exibição inicial com todos os itens
            displayAllClientes(clientsItems);
        
            // Filtrar e exibir todos os clientes correspondentes ao termo de busca
            function filterClientes(term) {
                return clientsItems.filter(cliente => 
                    cliente.nome.toLowerCase().includes(term.toLowerCase())
                );
            }
        
            $("#search").off("input").on("input", function() {
                const searchTerm = $(this).val().trim();
                const filteredClients = filterClientes(searchTerm);
                displayAllClientes(filteredClients);
            });
        }
        

        // Função para editar o cliente
        const editar = (data) => {
            $('#formContainer').html(`
                <div class="container-form-transp"> 
                    <form id="formEditarCliente" data-id="${data.id}">
                        <div class="cancelBtn"><p id="cancelBtnP">X</p></div>
                        <h3>Editar Cliente</h3>
                        <div class="container-form-cadastroCliente">
                            <div><label for="nomeCompleto">Nome Completo:</label><input type="text" id="nomeCompleto" name="nomeCompleto" required></div>
                            <div><label for="email">Email:</label><input type="email" id="email" name="email" required></div>
                        </div>
                        <div class="container-form-cadastroCliente">
                            <div><label for="cpf">CPF:</label><input type="text" id="cpf" name="cpf" required></div>
                            <div><label for="telefone">Telefone:</label><input type="text" id="telefone" name="telefone" required></div>
                            <div><label for="idade">Nascimento:</label><input type="date" id="idade" name="idade" required></div>
                        </div>
                        <label for="endereco">Endereço:</label><input type="text" id="endereco" name="endereco" required>
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
                $('.container-form-transp').remove();
            });
            $("#formEditarCliente").off('submit').on('submit', function(e) {
                e.preventDefault(); 
                envioFormButton("atualizar");
            });
        };

        // Função para excluir o cliente
        const excluir = (data) => {
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
                $.ajax({
                    url: `usuarios/${data.id}`,
                    type: 'DELETE',
                    contentType: 'application/json', 
                    success: function(response) {
                        if(!response){
                            alert("Dados invalidos!");
                        }else {
                            console.log('Cliente excluido com sucesso:', data.id);
                            alert(`Cliente excluido com sucesso!`);
                            
                            
                            const index = dataClientes.findIndex(cliente => cliente.id == data.id);
                            if (index !== -1) {
                              
                                dataClientes.splice(index, 1);
                                console.log(`Cliente com ID ${data.id} removido do array.`);
                                $('.container-form-transp').remove();
                            } else {
                                console.log("Cliente com o ID fornecido não encontrado.");
                                $('.container-form-transp').remove();
                            }

                            renderClientes(dataClientes);
                            
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


