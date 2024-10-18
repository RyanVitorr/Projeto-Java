// Classe UsuarioService 
package biblioteca.service; // Certifique-se de que o pacote esteja correto

import biblioteca.dao.UsuarioDAO; // Certifique-se de importar a classe UsuarioDAO
import biblioteca.model.Usuario; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // Certifique-se de que 'Service' está com S maiúsculo
public class UsuarioService {

    @Autowired
    private UsuarioDAO usuarioDAO; 

    public Usuario cadastrarUsuario(Usuario usuario) {
        // Adicione validações aqui, se necessário
        
        // Chama função do DAO
        return usuarioDAO.salvar(usuario);
    }
}
