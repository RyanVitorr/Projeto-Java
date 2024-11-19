// Classe UsuarioService 
package br.com.ads.java.biblioteca.service; 
import java.sql.SQLException;
import java.util.List;
import br.com.ads.java.biblioteca.dao.UsuarioDAO; 
import br.com.ads.java.biblioteca.model.Usuario; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioDAO usuarioDAO; 

    public Usuario cadastrarUsuario(Usuario usuario) {
        return usuarioDAO.salvar(usuario);
    }

    public List<Usuario> buscarTodos() {
        return usuarioDAO.buscarTodos();
    }

    public Usuario atualizarUsuario(long id, Usuario usuario) {
        return usuarioDAO.atualizar(id, usuario);
    }

    public void excluirUsuario(long id)throws SQLException{
         usuarioDAO.excluirUsuario(id);
    }
    
}
