// Classe EmprestimoService
package br.com.ads.java.biblioteca.service;

import br.com.ads.java.biblioteca.model.Emprestimo; // Import correto do modelo
import br.com.ads.java.biblioteca.dao.EmprestimoDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmprestimoService {

    @Autowired
    private EmprestimoDAO emprestimoDAO;

    // Busca todos os empréstimos

    // Busca empréstimos por ID do livro
    public List<Emprestimo> buscarEmprestimosPorIdLivro(int idLivro) {
        return emprestimoDAO.findByIdLivro(idLivro);
    }

    // Busca empréstimos por ID do usuário
    public List<Emprestimo> buscarEmprestimosPorIdUsuario(int idUsuario) {
        return emprestimoDAO.findByIdUsuario(idUsuario);
    }
}
