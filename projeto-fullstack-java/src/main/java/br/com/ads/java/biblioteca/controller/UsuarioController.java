
package br.com.ads.java.biblioteca.controller;

import br.com.ads.java.biblioteca.model.Usuario; 
import br.com.ads.java.biblioteca.service.UsuarioService; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // cadastrar novo usuario
    @PostMapping
    public Usuario cadastrarUsuario(@RequestBody Usuario usuario) {
        return usuarioService.cadastrarUsuario(usuario);
    }

    //pegar tds os usuarios
    @GetMapping
    public List<Usuario> buscarTodos() {
        return usuarioService.buscarTodos();
    }

    // atualizar usuario 
    @PutMapping("/{id}")
    public Usuario atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        return usuarioService.atualizarUsuario(id, usuario);
    }

   @DeleteMapping("/{id}")
    public ResponseEntity<String> excluirUsuario(@PathVariable int id) throws SQLException {
        try {
            usuarioService.excluirUsuario(id); 
            return ResponseEntity.ok("Usuário  excluído com sucesso!"); 
        }catch (SQLException e) {
            if (e.getMessage().contains("Este usuário está vinculado a registros de empréstimos")) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Erro: Este usuário  está vinculado a registros de empréstimos e não pode ser excluído.");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao excluir o usuário: " + e.getMessage());
        } 
    }

} 