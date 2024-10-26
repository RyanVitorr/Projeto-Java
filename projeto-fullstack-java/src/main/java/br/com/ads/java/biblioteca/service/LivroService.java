// Classe LivroService
package br.com.ads.java.biblioteca.service; 
import br.com.ads.java.biblioteca.model.Livro; 
import br.com.ads.java.biblioteca.dao.LivroDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LivroService {

    @Autowired
    private LivroDAO livroDAO;

    public List<Livro> buscarTodosLivros() {
        return livroDAO.findAll();
    }

}