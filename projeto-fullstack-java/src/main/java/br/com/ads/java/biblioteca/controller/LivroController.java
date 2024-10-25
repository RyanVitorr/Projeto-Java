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
import java.sql.Date;

@RestController
@RequestMapping("/livro")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @GetMapping("/todos")
    public List<Livro> buscarTodosLivrosr() {
        return livroService.buscarTodosLivros();
    } 


    @GetMapping("/livros/dashboard")
public List<Livro> dashboard(@RequestParam(value = "dataEmprestimo", required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") Date dataEmprestimo) {
    if (dataEmprestimo == null) {  
        return livroService.buscarTodosLivros();
    }else {
        java.sql.Date sqlDate = new java.sql.Date(dataEmprestimo.getTime());
        return livroService.dashboard(sqlDate);
    }
    
}

    
}