// Classe LivroController 
package br.com.ads.java.biblioteca.controller;
import br.com.ads.java.biblioteca.model.Livro;
import br.com.ads.java.biblioteca.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/livro")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @GetMapping("/todos")
    public List<Livro> buscarTodosLivrosr() {
        return livroService.buscarTodosLivros();
    } 

    @PostMapping("/cadastrar")
    public Livro cadastroDeLivro(@RequestBody Livro livro) {
        
        return livroService.salvarLivro(livro);
    }
    
}

@DeleteMapping("/excluir/{id}")
public void excluirLivro(@PathVariable int id) {
    livroService.excluirLivro(id);
}
