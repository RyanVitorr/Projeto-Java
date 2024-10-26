package br.com.ads.java.biblioteca.dao;
import br.com.ads.java.biblioteca.model.Multa;
import java.util.List;


public interface MultaDAO {

    // Busca todas as Multas por id do livro
    List<Multa> findByIdLivro(int idLivro);

    // Busca todas as Multas por id do usuÃ¡rio
    List<Multa> findByIdUsuario(int idUsuario);

    List<Multa> buscarMulta();
    
} 