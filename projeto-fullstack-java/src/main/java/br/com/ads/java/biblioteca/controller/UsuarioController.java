
package br.com.ads.java.biblioteca.controller;

import br.com.ads.java.biblioteca.model.Usuario; 
import br.com.ads.java.biblioteca.service.UsuarioService; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
    @PostMapping("/{id}")
    public Usuario atualizarUsuario(@RequestBody Usuario usuario) {
        return usuarioService.atualizarUsuario(usuario);
    }

} 