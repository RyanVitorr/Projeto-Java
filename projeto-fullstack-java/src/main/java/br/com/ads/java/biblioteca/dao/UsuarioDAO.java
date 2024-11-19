// Interface UsuarioDAO
package br.com.ads.java.biblioteca.dao; // Certifique-se de que o pacote esteja definido corretamente
import java.sql.SQLException;
import java.util.List;
import br.com.ads.java.biblioteca.model.Usuario; 

public interface UsuarioDAO {
    Usuario salvar(Usuario usuario);
    List<Usuario> buscarTodos();
    Usuario atualizar(long id, Usuario usuario);

    void excluirUsuario(long id) throws SQLException;

}
