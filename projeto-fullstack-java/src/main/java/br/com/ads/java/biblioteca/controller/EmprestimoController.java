// Classe EmprestimoController 
package br.com.ads.java.biblioteca.controller;
import br.com.ads.java.biblioteca.model.Emprestimo;
import br.com.ads.java.biblioteca.service.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/emprestimo")
public class EmprestimoController {

    @Autowired
    private EmprestimoService emprestimoService;

    @GetMapping("/porLivro")
    public List<Emprestimo> buscarEmprestimosPorIdLivro(@RequestParam("idLivro") int idLivro) {
        return emprestimoService.buscarEmprestimosPorIdLivro(idLivro);
    }
    
    @GetMapping("/porUsuario")
    public List<Emprestimo> buscarEmprestimosPorIdUsuario(@RequestParam("idUsuario") int idUsuario) {
        return emprestimoService.buscarEmprestimosPorIdUsuario(idUsuario);
    }


}