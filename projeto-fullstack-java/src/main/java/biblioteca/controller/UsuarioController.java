// Classe UsuarioController 
package biblioteca.controller; // Certifique-se de que o pacote está correto

import biblioteca.model.Usuario; // Importando a classe Usuario
import biblioteca.service.UsuarioService; // Importando a classe UsuarioService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/cadastrar")
    public Usuario cadastrarUsuario(@RequestBody Usuario usuario) {
        return usuarioService.cadastrarUsuario(usuario);
    }

    // Você pode adicionar outros métodos aqui, como buscar ou atualizar usuários, se necessário.
}
