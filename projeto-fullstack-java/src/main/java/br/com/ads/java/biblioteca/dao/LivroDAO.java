package br.com.ads.java.biblioteca.dao;

import br.com.ads.java.biblioteca.model.Livro;
import java.sql.Date;
import java.util.List;

public interface LivroDAO {
    
    List<Livro> findAll();
  
    List<Livro> dashboard(Date dataEmprestimo);
}
