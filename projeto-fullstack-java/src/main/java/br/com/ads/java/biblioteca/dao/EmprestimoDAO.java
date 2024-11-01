// Interface EmprestimoDAO 
package br.com.ads.java.biblioteca.dao;
import br.com.ads.java.biblioteca.model.Emprestimo;

import java.sql.Date;
import java.util.List;

public interface EmprestimoDAO {
    
    // Busca todos os empréstimos por id do livro
    List<Emprestimo> findByIdLivro(int idLivro);

    // Busca todos os empréstimos por id do usuário
    List<Emprestimo> findByIdUsuario(int idUsuario);

    List<Emprestimo> buscarEmprestimos();

    // dados dash
    List<Emprestimo> buscarDadosDash(Date dataEmprestimo);

    // historico dash
    List<Emprestimo> historicoDash(Date dataEmprestimo);

}

