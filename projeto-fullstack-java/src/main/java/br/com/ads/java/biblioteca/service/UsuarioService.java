// Classe UsuarioService 
package br.com.ads.java.biblioteca.service; // Certifique-se de que o pacote esteja correto

import br.com.ads.java.biblioteca.dao.UsuarioDAO; // Certifique-se de importar a classe UsuarioDAO
import br.com.ads.java.biblioteca.model.Usuario; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service // Certifique-se de que 'Service' está com S maiúsculo
public class UsuarioService {

    @Autowired
    private UsuarioDAO usuarioDAO; 

    public Usuario cadastrarUsuario(Usuario usuario) {
        return usuarioDAO.salvar(usuario);
    }

    public Usuario buscarTodos() {
        return usuarioDAO.buscarTodos();
    }

    public Usuario atualizarUsuario(Usuario usuario) {
        return usuarioDAO.atualizar(usuario);
    }

}
