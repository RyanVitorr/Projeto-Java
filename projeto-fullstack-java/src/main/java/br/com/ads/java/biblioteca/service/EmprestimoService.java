// Classe EmprestimoService
package br.com.ads.java.biblioteca.service;
import br.com.ads.java.biblioteca.model.Emprestimo; 
import br.com.ads.java.biblioteca.dao.EmprestimoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class EmprestimoService {

    @Autowired
    private EmprestimoDAO emprestimoDAO;

    // Busca todos os empréstimos

    // Busca empréstimos por ID do livro
    public List<Emprestimo> buscarEmprestimosPorIdLivro(int idLivro) {
        System.out.println("Parâmetro idLivro recebido no service: " + idLivro);
        return emprestimoDAO.findByIdLivro(idLivro);
    }

    // Busca empréstimos por ID do usuário
    public List<Emprestimo> buscarEmprestimosPorIdUsuario(int clienteId) {
        return emprestimoDAO.findByIdUsuario(clienteId);
    }

    
    public List<Emprestimo> buscarEmprestimos() {
        return emprestimoDAO.buscarEmprestimos();
    }

    // dados dash
    public List<Emprestimo> buscarDadosDash(Date dataEmprestimo) {
        return emprestimoDAO.buscarDadosDash(dataEmprestimo);
    }

    // historico dash
    public List<Emprestimo> historicoDash(Date dataEmprestimo) {
        return emprestimoDAO.historicoDash(dataEmprestimo);
    }
}
