package br.com.ads.java.biblioteca.service;
import br.com.ads.java.biblioteca.dao.EmprestimoDAO;
import br.com.ads.java.biblioteca.dao.MultaDAO;
import br.com.ads.java.biblioteca.model.Emprestimo;
import br.com.ads.java.biblioteca.model.Multa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class MultaService {

    @Autowired
    private MultaDAO multaDAO;

    public List<Multa> buscarMultaPorIdLivro(int idLivro) {
        System.out.println("Parâmetro idLivro recebendo no service: " + idLivro);
        return multaDAO.findByIdLivro(idLivro);
    }

    // Busca empréstimos por ID do usuário
    public List<Multa> buscarMultaPorIdUsuario(int idUsuario) {
        System.out.println("Parâmetro idUsuario recebendo no service: " + idUsuario);
        return multaDAO.findByIdUsuario(idUsuario);
    }
    
    public List<Multa> buscarMulta() {
        return multaDAO.buscarMulta();
    }

}