// Interface LivroDAO 
import java.util.List;

public interface LivroDAO {

    Livro salvar(Livro livro);

    List<Livro> buscarPorAutor(String autor);

    List<Livro> buscarPorGenero(String genero);

    List<Livro> buscarPorTitulo(String titulo);

    void remover(Livro livro);

    List<Livro> buscarTodos();
}