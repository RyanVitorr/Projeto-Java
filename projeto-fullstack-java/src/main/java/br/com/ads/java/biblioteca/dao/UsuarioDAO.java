// Interface UsuarioDAO
package br.com.ads.java.biblioteca.dao; // Certifique-se de que o pacote esteja definido corretamente

import br.com.ads.java.biblioteca.model.Usuario; 

public interface UsuarioDAO {
    Usuario salvar(Usuario usuario);
    Usuario buscarPorEmail(String email);
    Usuario buscarTodos();
}
