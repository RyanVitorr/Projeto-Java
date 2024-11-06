package br.com.ads.java.biblioteca.dao;

import br.com.ads.java.biblioteca.model.Livro;
import br.com.ads.java.biblioteca.model.Usuario;

import java.sql.Date;
import java.sql.SQLException;
import java.util.List;

public interface LivroDAO {
    
    List<Livro> findAll();
    
    Livro salvar(Livro Livro);
  
    void excluir(int idLivro) throws SQLException;

}
