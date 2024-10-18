// Interface UsuarioDAO
package biblioteca.dao; // Certifique-se de que o pacote esteja definido corretamente

import biblioteca.model.Usuario; 

public interface UsuarioDAO {
    Usuario salvar(Usuario usuario);
    Usuario buscarPorEmail(String email);
}
