// Classe LivroService 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class LivroService {

    @Autowired
    private LivroDAO livroDAO;

    public List<Livro> buscarTodos() {
        return livroDAO.buscarTodos();
    }
}
