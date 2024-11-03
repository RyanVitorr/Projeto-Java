package br.com.ads.java.biblioteca.dao;
import br.com.ads.java.biblioteca.model.Emprestimo;
import br.com.ads.java.biblioteca.model.Livro;
import br.com.ads.java.biblioteca.model.Multa;
import br.com.ads.java.biblioteca.model.Usuario;
import br.com.ads.java.biblioteca.utils.DatabaseUtil;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class MultaDAOImpl implements MultaDAO {
   
    private Connection connection;

    public MultaDAOImpl() {
        this.connection = DatabaseUtil.getConnection(); 
    }

    @Override
    public List<Multa> buscarMulta() {
        List<Multa> multas = new ArrayList<>();
        String sql = "SELECT * FROM Multas";
        try (Statement stmt = connection.createStatement(); 
            ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                
            }

        } catch (SQLException e) {
            
            throw new RuntimeException("Erro ao buscar os empréstimos no banco de dados", e);
        }

        return multas;
    }

    @Override
    public List<Multa> findByIdUsuario(int idUsuario) {
        List<Multa> multas = new ArrayList<>();
        String sql = "SELECT emprestimos.*, livros.* "
           + "FROM emprestimos "
           + "JOIN livros ON emprestimos.id_livros = livros.id_livro "
           + "WHERE emprestimos.id_usuarios = ?"; 

        try (Statement stmt = connection.createStatement(); 
           ResultSet rs = stmt.executeQuery(sql)) {

           while (rs.next()) {
               
           }

        } catch (SQLException e) {
           throw new RuntimeException("Erro ao buscar os empréstimos no banco de dados", e);
        }
        return multas;
    }

    // por livro
    @Override
    public List<Multa> findByIdLivro(int idLivro) {
        System.out.println("Parâmetro idLivro recebido no dao: " + idLivro);
        List<Multa> multas = new ArrayList<>();
        String sql = "SELECT emprestimos.id_emprestimo, emprestimos.data_emprestimo, emprestimos.data_devolucao, emprestimos.status, "
                   + "usuarios.id_usuario, usuarios.nome AS nome_usuario, usuarios.email, usuarios.telefone, usuarios.data_nascimento, usuarios.endereco "
                   + "FROM emprestimos "
                   + "JOIN usuarios ON emprestimos.id_usuario = usuarios.id_usuario "
                   + "WHERE emprestimos.id_livros = ?"; 
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            
            stmt.setInt(1, idLivro);
            System.out.println("Parâmetro idLivro recebido no dao stmt: " + idLivro);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    
                    
                      
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return multas;
    }

    
    

}