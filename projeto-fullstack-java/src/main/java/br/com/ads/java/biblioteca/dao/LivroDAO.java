package br.com.ads.java.biblioteca.dao;

import br.com.ads.java.biblioteca.model.Livro;

import java.util.List;

public interface LivroDAO {
    
    List<Livro> findAll();
  
}
