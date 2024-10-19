
// Classe LivroController 
import biblioteca.model.Livro;
import biblioteca.service.LivroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/livro")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @GetMapping("/todos")
    public List<Livro> buscarTodosLivrosr() {
        return livroService.buscarTodosLivros();
    }
}