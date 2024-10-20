// Interface EmprestimoDAO 
package br.com.ads.java.biblioteca.dao;
import br.com.ads.java.biblioteca.model.Emprestimo;
import java.util.List;

public interface EmprestimoDAO {
    
    // Busca todos os empréstimos por id do livro
    List<Emprestimo> findByIdLivro(int idLivro);

    // Busca todos os empréstimos por id do usuário
    List<Emprestimo> findByIdUsuario(int idUsuario);
}

