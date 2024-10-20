package br.com.ads.java.biblioteca.controller;
import br.com.ads.java.biblioteca.model.Emprestimo;
import br.com.ads.java.biblioteca.model.Multa;
import br.com.ads.java.biblioteca.service.EmprestimoService;
import br.com.ads.java.biblioteca.service.MultaService;

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
@RequestMapping("/multa")
public class MultaController {

    @Autowired
    private MultaService multaService;

    @GetMapping("/porlivro")                                    
    public ResponseEntity<List<Multa>> buscarMultaPorIdLivro(@RequestParam("idLivro") int idLivro) {
        System.out.println("Parâmetro idLivro recebido: " + idLivro);
        try {
            List<Multa> multa = multaService.buscarMultaPorIdLivro(idLivro);
           
            
            return ResponseEntity.ok(multa != null ? multa : Collections.emptyList()); 
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 
        }
    }
    
    @GetMapping("/porUsuario")                                    
    public ResponseEntity<List<Multa>> buscarMultaPorIdUsuario(@RequestParam("idUsuario") int idUsuario) {
        System.out.println("Parâmetro idUsuario recebido: " + idUsuario);
        try {
            List<Multa> multa = multaService.buscarMultaPorIdUsuario(idUsuario);
           
           
            
            return ResponseEntity.ok(multa != null ? multa : Collections.emptyList()); 
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 
        }
    }

        
    @GetMapping("/todos")                                    
    public ResponseEntity<List<Multa>> buscarMulta() {
        try {
            List<Multa> multa = multaService.buscarMulta();
           
            
            
            return ResponseEntity.ok(multa != null ? multa : Collections.emptyList()); 
        } catch (Exception e) {
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null); 
        }
    }
}