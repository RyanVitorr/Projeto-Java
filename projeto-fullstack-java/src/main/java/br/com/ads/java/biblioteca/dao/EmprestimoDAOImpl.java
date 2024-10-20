// Implementação EmprestimoDAOImpl 
package br.com.ads.java.biblioteca.dao;
import br.com.ads.java.biblioteca.model.Emprestimo;
import br.com.ads.java.biblioteca.model.Livro;
import br.com.ads.java.biblioteca.model.Usuario;
import br.com.ads.java.biblioteca.utils.DatabaseUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class EmprestimoDAOImpl implements EmprestimoDAO {
    private Connection connection;

    public EmprestimoDAOImpl() {
        this.connection = DatabaseUtil.getConnection(); // Método para obter a conexão
    }

    @Override
    public List<Emprestimo> buscarEmprestimos() {
        List<Emprestimo> emprestimos = new ArrayList<>();
        String sql = "SELECT * FROM emprestimos";


        try (Statement stmt = connection.createStatement(); 
            ResultSet rs = stmt.executeQuery(sql)) {

            // Iterando sobre o ResultSet para popular a lista de emprestimos
            while (rs.next()) {
                emprestimos.add(new Emprestimo(
                    rs.getInt("id_emprestimo"), 
                    rs.getInt("id_usuario"), 
                    rs.getInt("id_livros"),     
                    rs.getDate("data_emprestimo").toLocalDate(),
                    rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null, 
                    rs.getString("status")
                ));
            }

        } catch (SQLException e) {
            // Lançando uma exceção para tratar o erro de forma apropriada na camada de serviço ou controle
            throw new RuntimeException("Erro ao buscar os empréstimos no banco de dados", e);
        }

        return emprestimos;
    }



    @Override
    public List<Emprestimo> findByIdUsuario(int idUsuario) {
        List<Emprestimo> Emprestimos = new ArrayList<>();
        String sql = "SELECT emprestimos.*, livros.* "
           + "FROM emprestimo "
           + "JOIN livros ON emprestimo.id_livros = livros.id_livro "
           + "WHERE emprestimo.id_usuarios = ?"; 

        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, idUsuario);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    // Extraindo dados do livro
                    
                    
                    // Extraindo dados do empréstimo
                    Emprestimo emprestimo = new Emprestimo(
                        /*rs.getInt("id_emprestimo"), 
                        livro,      
                        rs.getDate("data_emprestimo").toLocalDate(),
                        rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null, 
                        rs.getString("status") */
                        rs.getInt("id_emprestimo"), 
                        rs.getInt("id_usuario"), 
                        rs.getInt("id_livros"),     
                        rs.getDate("data_emprestimo").toLocalDate(),
                        rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null, 
                        rs.getString("status")
                    );

                    Emprestimos.add(emprestimo);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Emprestimos;
    }
    
    @Override
    public List<Emprestimo> findByIdLivro(int idLivro) {
        List<Emprestimo> Emprestimos = new ArrayList<>();
        String sql  = "SELECT emprestimos.id_emprestimo, emprestimo.data_emprestimo, emprestimo.data_devolucao, emprestimo.status, "
               + "usuarios.id_usuario, usuarios.nome AS nome_usuario, usuarios.email, usuarios.telefone, usuarios.data_nascimento, usuarios.endereco "
               + "FROM emprestimo "
               + "JOIN usuarios ON emprestimo.id_usuarios = usuarios.id_usuario "
               + "WHERE emprestimo.id_livros = ?"; 
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, idLivro);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {

                
                    Emprestimo emprestimo = new Emprestimo(
                        /* rs.getInt("id_emprestimo"), 
                        usuario,      
                        rs.getDate("data_emprestimo").toLocalDate(),
                        rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null, 
                        rs.getString("status") */
                        rs.getInt("id_emprestimo"), 
                        rs.getInt("id_usuario"), 
                        rs.getInt("id_livros"),     
                        rs.getDate("data_emprestimo").toLocalDate(),
                        rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null, 
                        rs.getString("status")
                    );
                    System.out.println("emprestimo: " + Emprestimos); 
                    System.out.println(""); 
                    System.out.println("");
                    System.out.println("");
                    

                    Emprestimos.add(emprestimo);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            
        }
        return Emprestimos;
    }
}

