// Classe LivroService
package br.com.ads.java.biblioteca.service; 
import br.com.ads.java.biblioteca.model.Livro; 
import br.com.ads.java.biblioteca.dao.LivroDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Service
public class LivroService {

    @Autowired
    private LivroDAO livroDAO;

    public List<Livro> buscarTodosLivros() {
        return livroDAO.findAll();
    }

    public Livro salvarLivro(Livro livro){
        return livroDAO.salvar(livro);
    }

    public void excluirLivro(int idLivro) throws SQLException{
        livroDAO.excluir(idLivro);
    }
}
