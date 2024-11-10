// Classe LivroController 
package br.com.ads.java.biblioteca.controller;
import br.com.ads.java.biblioteca.model.Livro;
import br.com.ads.java.biblioteca.model.Usuario;
import br.com.ads.java.biblioteca.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/livro")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @GetMapping
    public List<Livro> buscarTodosLivrosr() {
        return livroService.buscarTodosLivros();
    } 

    @PostMapping
    public Livro cadastroDeLivro(@RequestBody Livro livro) {
        
        return livroService.salvarLivro(livro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluirLivro(@PathVariable int id) throws SQLException {
        try {
            livroService.excluirLivro(id); 
            return ResponseEntity.ok("Livro excluído com sucesso!"); 
        }catch (SQLException e) {
            if (e.getMessage().contains("Este livro está vinculado a registros de empréstimos")) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Erro: Este livro está vinculado a registros de empréstimos e não pode ser excluído.");
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao excluir o livro: " + e.getMessage());
        }
    }

    // atualizar cliente
    @PutMapping("/{id}")
    public Livro atualizarLivro(@PathVariable Long id, @RequestBody Livro livro) {
        return livroService.atualizarLivro(id, livro);
    }
    
}

