let dataLivros;
let dataClientes;

const fetchAjax = ()=>{
    $.ajax({
        url: 'livro',
        type: 'GET',
        cache: false,
        success: function(data) {
            console.log(data);
            dataLivros = data;
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição:', xhr.responseText);
            reject(error); 
        }
    });
    $.ajax({
        url: '/usuarios',
        type: 'GET',
        cache: false,
        success: function(data) {
            console.log(data);
            dataClientes = data;
        },
        error: function(xhr, status, error) {
            console.error('Erro na requisição:', xhr.responseText);
            reject(error); 
        }
    });
    
};

$(document).ready(function() { 
    $('body').on('click', '.navbar ul li a:contains("Emprestimo"), #alugarLivro', function () {
        $('.navbar ul li a').removeClass('toggleBackground');
        $('.navbar ul li a:contains("Emprestimo")').addClass('toggleBackground');

        fetchAjax();

        $('.main-content').html(`
                    <form id="formEmprestarLivro">
                        <div class="container-form">
                            <section id="section-form-container" data-idCliente="">
                                <h3>Emprestar Livro</h3>
                                <div id="container-section-form">
                                    <div>
                                        <label for="clientePesquisa">Pesquisar Cliente:</label>
                                        <input type="text" id="clientePesquisa" placeholder="Pesquise o cliente...">
                                        <div class="div-lista-relative"><ul id="clienteLista"></ul></div>

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

                                        </div>
                                        
                                        <label for="endereco">Endereço:</label>
                                        <input type="text" id="endereco" name="endereco" required>
                                            
                                    </div>
                                    <div>
                                        <label for="livroPesquisa">Pesquisar Livro:</label>
                                        <input type="text" id="livroPesquisa" placeholder="Pesquise o livro...">
                                        <div class="div-lista-relative"><ul id="livroLista"></ul></div>
     
                                        <div id="container-lista-livros"></div>

                                        <div id="div-principal-preco-mes">
                                            <div id="contain-preco-mes">
                                                <div id="div-mes">
                                                    <label for="tempoAluguel">Tempo de aluguel:</label>
                                                    <select id="tempoAluguel">
                                                        <option value="1">1 Mês</option>
                                                        <option value="2">2 Meses</option>
                                                        <option value="3">3 Meses</option>
                                                    </select>
                                                </div>
                                                <div id="div-total-p">
                                                    <span>Total: </span>
                                                    <p id="precoTotalContain"></p>
                                                </div>
                                            </div>
                                            <button id="btnConfirmPagamento" type="submit">Confirmar Empréstimo</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </section>

                            <section id="section-pagamento-container">
                                <h3>Metodos de pegamento</h3>
                                <div id="container-section-pagamento">
                                   <div id="pix-section">
                                        <h2>Pagamento via Pix</h2>
                                        <div id="pix-qrcode">

                                        </div>

                                        <div id="area-link"> 
                                            <input type="text"> </input>
                                            <button>Copiar link</button>
                                        </div>

                                        <button id="confirm-payment">Verificar Pagamento</button>
                                        <p id="payment-status"></p>
                                    </div>
                                   
                                </div>
                            </section>
                        </div>
                        
                    </form>
        `);
    
        $('#cancelBtnP').off('click').on('click', function () {
            console.log("clicou")
            $('.container-form-transp').remove();
        });
        
        $("#section-form-container h3").click(function() {
            $("#container-section-form").slideToggle(); 
            $("#container-section-form").toggleClass("expanded"); 
        });

        $('#formEmprestarLivro').off('submit').on('submit',async function(e){
            e.preventDefault();
            console.log("clicou emprestar")

            let emprestimos = [];

           
            const obterDataAtual = () => {
                const hoje = new Date();
                const dia = String(hoje.getDate()).padStart(2, '0');
                const mes = String(hoje.getMonth() + 1).padStart(2, '0');
                const ano = hoje.getFullYear();
                return `${ano}-${mes}-${dia}`;  
            }
        
            
            const calcularDataEntrega = (mesesPrazo) => {
                const dataEntrega = new Date();
                dataEntrega.setMonth(dataEntrega.getMonth() + parseInt(mesesPrazo));
                const dia = String(dataEntrega.getDate()).padStart(2, '0');
                const mes = String(dataEntrega.getMonth() + 1).padStart(2, '0');
                const ano = dataEntrega.getFullYear();
                return `${ano}-${mes}-${dia}`; 
            }


            // Dados do cliente
            const usuarioId = $('#section-form-container').attr('data-idCliente'); 
            const tempoAluguel = $('#tempoAluguel').val();
            const dataEmprestimo = obterDataAtual();
            const dataPrevDevolucao = calcularDataEntrega(tempoAluguel);
            

            // Obtenha os IDs e preços dos livros selecionados
            let livrosSelecionados = [];
            $('.contain-livro').each(function() {
                const livroId = $(this).attr('data-id'); 
                console.log("id livro é : " + livroId);
                const precoAnt = $(this).attr('data-precoUni');
                const preco = parseFloat(precoAnt.replace("R$", "").replace(",", ".").trim());
                const quantidade = $(this).attr('data-qtd');
                livrosSelecionados.push({ livroId, preco, quantidade });
            });

            
            let novoEmprestimoBase = {
                usuarioId,
                dataEmprestimo,
                dataPrevDevolucao
            };
            

            // Adiciona o novo empréstimo ao array de empréstimos
            emprestimos.push(novoEmprestimoBase);
            console.log('Empréstimos:', JSON.parse(JSON.stringify(emprestimos)));
            console.table(emprestimos);
            emprestimos.forEach((emprestimo, index) => {
                console.log(`Empréstimo ${index + 1}:`, emprestimo);
            });
            console.dir(emprestimos, { depth: null });
            console.log(JSON.stringify(emprestimos, null, 2));

           
            async function criarEmprestimo(livro) {
                let novoEmprestimo = {
                    ...novoEmprestimoBase,
                    livroId: livro.livroId,
                    preco: livro.preco,
                    quantidade: livro.quantidade
                };
        
                console.log('novo Empréstimo:', JSON.parse(JSON.stringify(novoEmprestimo)));
        
                try {
                    let response = await $.ajax({
                        url: '/emprestimos',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(novoEmprestimo),
                    });
                    console.log('Emprestimo criado:', response);
                    alert('Empréstimo criado com sucesso!');
                } catch (error) {
                    console.error('Erro ao criar empréstimo:', error);
                }
            }
        
            // Processa os empréstimos de forma assíncrona e sequencial
            for (let livro of livrosSelecionados) {
                await criarEmprestimo(livro);
            }
        
        });

        /*
            $("#btnConfirmPagamento").click(function() {
                e.preventDefault();
                $("#container-section-pagamento").slideToggle(); 
                $("#container-section-pagamento").toggleClass("expanded"); 

                $.ajax({
                    url: '/gerar-qrcode',
                    type: 'GET',
                    success: function(data, textStatus, xhr) {
                        var imgSrc = URL.createObjectURL(xhr.response);
                        
                        $('#pix-qrcode').html('<img src="' + imgSrc + '" alt="QR Code">');
                    },
                    error: function(xhr, textStatus, errorThrown) {
                        alert('Erro ao gerar o QR Code');
                    },
                    xhrFields: {
                        responseType: 'blob'
                    }
                });
            });
        
            

            $("#formEmprestarLivro").off('submit').on('submit', function(e) {
            
                
                $('#confirm-payment').click(function () {
                    $.ajax({
                        url: '/gerar-qrcode',
                        type: 'GET',
                        success: function(data, textStatus, xhr) {
                            var imgSrc = URL.createObjectURL(xhr.response);
                            
                            $('#pix-qrcode').html('<img src="' + imgSrc + '" alt="QR Code">');
                        },
                        error: function(xhr, textStatus, errorThrown) {
                            alert('Erro ao gerar o QR Code');
                        },
                        xhrFields: {
                            responseType: 'blob'
                        }
                    });
                    
                });
            
            });
        */
        
        // Adiciona evento para pesquisa de cliente (exemplo básico)
        $('#clientePesquisa').on('input', function() {
            const searchValue = $(this).val().toLowerCase();
            const filteredClients = dataClientes.filter(client => 
                client.nome.toLowerCase().includes(searchValue)
            );
    
            if (filteredClients.length > 0) {
                let clientListHtml = "";
                filteredClients.forEach(client => {
                    clientListHtml += `
                        <li data-nome="${client.nome}" data-cpf="${client.cpf}" data-telefone="${client.telefone}" data-email="${client.email}" data-endereco="${client.endereco}" data-id="${client.id}" data-qtd="1">
                            <strong>Nome:</strong> ${client.nome} <br>
                            <strong>CPF:</strong> ${client.cpf} <br>
                            <strong>Email:</strong> ${client.email} <br>
                            <strong>Telefone:</strong> ${client.telefone}
                        </li>
                    `;
                });
                $('#clienteLista').html(clientListHtml); 
            } else {
                $('#clienteLista').html('<li>Nenhum cliente encontrado</li>');
            }
    
            $('#clienteLista li').off('click').on('click', function() {
                $('#nomeCompleto').val($(this).data('nome'));
                $('#email').val($(this).data('email'));
                $('#telefone').val($(this).data('telefone'));
                $('#cpf').val($(this).data('cpf'));
                $('#endereco').val($(this).data('endereco'));
                let clienteId = $(this).data('id');
                $('#section-form-container').attr('data-idCliente', clienteId)
                
                $('#clienteLista').html('');
            });
        });
    
        // Adiciona evento para pesquisa de livro (usando os dados já recebidos)
        $('#livroPesquisa').on('input', function() {
            let precoLivro;
            console.log("input livro");
            console.log(dataLivros);
            const searchValue = $(this).val().toLowerCase();
            const filteredLivros = dataLivros.filter(livro => 
                livro.nome.toLowerCase().includes(searchValue)
            );
            console.log(searchValue);
            console.log(filteredLivros);
    
            if (filteredLivros.length > 0) {
                let livroListHtml = "";
                filteredLivros.forEach(livro => {
                    livroListHtml += `
                        <li data-id="${livro.idLivro}" data-nome="${livro.nome}" data-autor="${livro.autor}" data-idade="${livro.idadeIndicativa}" data-genero="${livro.genero}" data-preco="${livro.preco}" data-qtd="${livro.qtdDisponivel}">
                            <strong>Nome:</strong> ${livro.nome} <br>
                            <strong>Autor:</strong> ${livro.autor} <br>
                            <strong>Idade Indicativa:</strong> ${livro.idadeIndicativa} <br>
                            <strong>Gênero:</strong> ${livro.genero} <br>
                            <strong>Preço:</strong> ${livro.preco} <br>
                            <strong>Qtd Disponível:</strong> ${livro.qtdDisponivel}<br>
                        </li>
                    `;
                });
                $('#livroLista').html(livroListHtml);  
            } else {
                $('#livroLista').html('<li>Nenhum livro encontrado</li>');  
            }
    
            $('#livroLista li').on('click', function() {
                let idLivro = $(this).data('id');
                let nomeLivro = $(this).data('nome');
                let nomeAutor = $(this).data('autor');
                let generoLivro = $(this).data('genero');
                let precoLivro = 5.00; 
                let precoFormatado = precoLivro.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                console.log(precoFormatado)
        
                let html = `
                    <div class="contain-livro" data-id="${idLivro}" data-precoUni="${precoFormatado}">
                        <div class="id-contain">
                            <span>Id</span>
                            <p class="idLivroEmprestimo">${idLivro}</p>
                        </div>
        
                        <div class="nome-contain">
                            <span>Nome livro</span>
                            <p class="nomeLivroEmprestimo">${nomeLivro}</p>
                        </div>
        
                        <div class="autor-contain">
                            <span>Autor</span>
                            <p class="autorLivroEmprestimo">${nomeAutor}</p>
                        </div>
        
                        <div class="genero-contain">
                            <span>Gênero</span>
                            <p class="generoLivroEmprestimo">${generoLivro}</p>
                        </div>
        
                        <div class="preco-contain">
                            <span>Preço</span>
                            <p class="precoFormLivroEmprestimo">${precoFormatado}</p>
                        </div>
        
                        <div class="qtd-contain">
                            <span>Quantidade:</span>
                            <input type="number" class="qtdDesejadaEmprestimo" name="qtdDesejadaEmprestimo" min="1" value="1">
                        </div>
        
                    </div>
                `;
        
                if ($("#container-lista-livros").find(`.contain-livro[data-id="${idLivro}"]`).length === 0) {
                    $("#container-lista-livros").append(html);
                } else {
                    alert("Este livro já foi adicionado à lista.");
                }
        
                $('#livroLista').html('');
        
                
                const calcularPrecoPorDuracao = (meses)=>{
                    switch (meses) {
                        case 1: return 5.00;
                        case 2: return 9.00;
                        case 3: return 12.00;
                        default: return 0;
                    }
                }
        
                const calcularTotal = () => {
                    console.log("executou calcularTotal");
                    let totalGeral = 0;
                
                    let meses = parseInt($('#tempoAluguel').val());
                
                    if (isNaN(meses)) {
                        console.warn("Tempo de aluguel inválido.");
                        return;
                    }
                
                    $('.contain-livro').each(function(index) {
                        let quantidade = parseInt($(this).find('.qtdDesejadaEmprestimo').val());
                        
                        if (!isNaN(quantidade)) { 
                            if(quantidade < 1){
                                quantidade = 1;
                                $(this).find('.qtdDesejadaEmprestimo').val(quantidade);
                            }

                            let precoPorMeses = calcularPrecoPorDuracao(meses);
                            let precoLivroTotal = quantidade * precoPorMeses;
                
                            
                            let taxaExtra = (quantidade - 1) * 1.50; 
                            let valorTotalComTaxa = precoLivroTotal + taxaExtra;
                
                            console.log(`Valor total com taxa para livro: ${valorTotalComTaxa}`);
                            $(this).find('.precoFormLivroEmprestimo').html(valorTotalComTaxa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
                            $(this).attr("data-precoUni", valorTotalComTaxa.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }));
                            $(this).attr('data-qtd', quantidade);
                            
                            totalGeral += valorTotalComTaxa;
                        } else {
                            console.warn("Erro ao calcular: quantidade inválida.");
                        }
                    });
                    
                    $('#precoTotalContain').html(`${totalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`);
                };
        
                
                $('#container-lista-livros').off('input').on('input', '.qtdDesejadaEmprestimo', calcularTotal);
                $('#container-lista-livros').off('change').on('change', '#tempoAluguel', calcularTotal);
                calcularTotal();
        
            });

           
        });
    }); 

});
