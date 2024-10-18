// Interface LivroDAO 

/**
 * LivroDAO
 */
public interface LivroDAO {

    Livro salva(Livro livro);

    Livro buscarPorAutor(String autor);

    Livro buscarPorGenero(String genero);

    Livro buscarPorTitulo(String titulo);

    void remover (Livro livro);
}