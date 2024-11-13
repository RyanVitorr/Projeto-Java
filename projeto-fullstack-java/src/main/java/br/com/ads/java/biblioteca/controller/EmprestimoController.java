// Classe EmprestimoController 
package br.com.ads.java.biblioteca.controller;
import br.com.ads.java.biblioteca.model.Emprestimo;
import br.com.ads.java.biblioteca.service.EmprestimoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Collections;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {

    @Autowired
    private EmprestimoService emprestimoService;

    // idlivro
    @GetMapping("/livro/{idLivro}")
    public ResponseEntity<List<Emprestimo>> buscarEmprestimosPorIdLivro(@PathVariable int idLivro) {
        System.out.println("Parâmetro idLivro recebido: " + idLivro);
        try {
            List<Emprestimo> emprestimos = emprestimoService.buscarEmprestimosPorIdLivro(idLivro);
           
            for (Emprestimo emp : emprestimos) {
                System.out.println("Empréstimo: " + emp);
                System.out.println("Usuário: " + emp.getUsuario());
            }
            
            return ResponseEntity.ok(emprestimos != null ? emprestimos : Collections.emptyList()); 
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 
        }
    }
    
    // idusuario
    @GetMapping("/cliente/{clienteId}")
    public List<Emprestimo> buscarEmprestimosPorIdUsuario(@PathVariable int clienteId) {
        return emprestimoService.buscarEmprestimosPorIdUsuario(clienteId);
    }

    //todos
    @GetMapping("/todos")
    public ResponseEntity<List<Emprestimo>> buscarEmprestimos() {
        try {
            List<Emprestimo> emprestimos = emprestimoService.buscarEmprestimos();
            if (emprestimos == null || emprestimos.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body(emprestimos); 
            }
            return ResponseEntity.ok(emprestimos); 
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 
        }
    }

    // dados dash
    @GetMapping("/dadosDash")
    public List<Emprestimo> dadosDash(){
        return emprestimoService.buscarDadosDash();
    }

    // historico
    @GetMapping("/historico")
    public List<Emprestimo> historicoDash() {
        return emprestimoService.historicoDash();
    }

    @PostMapping("/{idUsuario}/{idLivro}")
    public Emprestimo novoEmprestimo(
            @PathVariable Long idUsuario,
            @PathVariable Long idLivro,
            @RequestBody Emprestimo emprestimo) {
        System.out.println("ID Usuário: " + idUsuario + ", ID Livro: " + idLivro);
        return emprestimoService.novoEmprestimo(idUsuario, idLivro, emprestimo);
    }
    
}
