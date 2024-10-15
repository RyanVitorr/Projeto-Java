@echo off

:: Defina o diretório raiz do projeto
set ROOT_DIR=C:\documentos\ads\java\java\biblioteca-system

:: Cria os diretórios principais
mkdir "%ROOT_DIR%\src\main\java\com\biblioteca\model"
mkdir "%ROOT_DIR%\src\main\java\com\biblioteca\dao"
mkdir "%ROOT_DIR%\src\main\java\com\biblioteca\service"
mkdir "%ROOT_DIR%\src\main\java\com\biblioteca\controller"
mkdir "%ROOT_DIR%\src\main\java\com\biblioteca\utils"
mkdir "%ROOT_DIR%\src\main\resources"

:: Cria os arquivos dentro de 'model'
echo // Classe Usuario > "%ROOT_DIR%\src\main\java\com\biblioteca\model\Usuario.java"
echo // Classe Livro > "%ROOT_DIR%\src\main\java\com\biblioteca\model\Livro.java"
echo // Classe Wishlist > "%ROOT_DIR%\src\main\java\com\biblioteca\model\Wishlist.java"
echo // Classe Emprestimo > "%ROOT_DIR%\src\main\java\com\biblioteca\model\Emprestimo.java"
echo // Classe Multa > "%ROOT_DIR%\src\main\java\com\biblioteca\model\Multa.java"

:: Cria os arquivos dentro de 'dao'
echo // Interface UsuarioDAO > "%ROOT_DIR%\src\main\java\com\biblioteca\dao\UsuarioDAO.java"
echo // Implementação UsuarioDAOImpl > "%ROOT_DIR%\src\main\java\com\biblioteca\dao\UsuarioDAOImpl.java"
echo // Interface LivroDAO > "%ROOT_DIR%\src\main\java\com\biblioteca\dao\LivroDAO.java"
echo // Implementação LivroDAOImpl > "%ROOT_DIR%\src\main\java\com\biblioteca\dao\LivroDAOImpl.java"
echo // Interface EmprestimoDAO > "%ROOT_DIR%\src\main\java\com\biblioteca\dao\EmprestimoDAO.java"
echo // Implementação EmprestimoDAOImpl > "%ROOT_DIR%\src\main\java\com\biblioteca\dao\EmprestimoDAOImpl.java"

:: Cria os arquivos dentro de 'service'
echo // Classe UsuarioService > "%ROOT_DIR%\src\main\java\com\biblioteca\service\UsuarioService.java"
echo // Classe LivroService > "%ROOT_DIR%\src\main\java\com\biblioteca\service\LivroService.java"
echo // Classe WishlistService > "%ROOT_DIR%\src\main\java\com\biblioteca\service\WishlistService.java"
echo // Classe EmprestimoService > "%ROOT_DIR%\src\main\java\com\biblioteca\service\EmprestimoService.java"
echo // Classe MultaService > "%ROOT_DIR%\src\main\java\com\biblioteca\service\MultaService.java"

:: Cria os arquivos dentro de 'controller'
echo // Classe UsuarioController > "%ROOT_DIR%\src\main\java\com\biblioteca\controller\UsuarioController.java"
echo // Classe LivroController > "%ROOT_DIR%\src\main\java\com\biblioteca\controller\LivroController.java"
echo // Classe EmprestimoController > "%ROOT_DIR%\src\main\java\com\biblioteca\controller\EmprestimoController.java"
echo // Classe MultaController > "%ROOT_DIR%\src\main\java\com\biblioteca\controller\MultaController.java"

:: Cria os arquivos dentro de 'utils'
echo // Classe NotificacaoUtils > "%ROOT_DIR%\src\main\java\com\biblioteca\utils\NotificacaoUtils.java"
echo // Classe ValidacaoUtils > "%ROOT_DIR%\src\main\java\com\biblioteca\utils\ValidacaoUtils.java"

:: Cria o arquivo de configuração dentro de 'resources'
echo # Configuração do banco de dados > "%ROOT_DIR%\src\main\resources\application.properties"

:: Mensagem de conclusão
echo Estrutura de diretórios e arquivos criada com sucesso em %ROOT_DIR%
pause
