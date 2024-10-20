// Classe EmprestimoController 
package br.com.ads.java.biblioteca.controller;

import br.com.ads.java.biblioteca.model.Emprestimo;
import br.com.ads.java.biblioteca.service.EmprestimoService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Collections;

@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {

    @Autowired
    private EmprestimoService emprestimoService;

    @GetMapping("/porLivro")
    public ResponseEntity<List<Emprestimo>> buscarEmprestimosPorIdLivro(@RequestParam("idLivro") int idLivro) {
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
    
    @GetMapping("/porUsuario")
    public List<Emprestimo> buscarEmprestimosPorIdUsuario(@RequestParam("idUsuario") int idUsuario) {
        return emprestimoService.buscarEmprestimosPorIdUsuario(idUsuario);
    }

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
}
