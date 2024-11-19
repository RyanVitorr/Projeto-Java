package br.com.ads.java.biblioteca.dao;
import br.com.ads.java.biblioteca.model.Livro;
import java.sql.SQLException;
import java.util.List;

public interface LivroDAO {
    
    List<Livro> findAll();
    
    Livro salvar(Livro Livro);
  
    void excluir(long idLivro) throws SQLException;

    Livro atualizar(long id, Livro livro);

}
