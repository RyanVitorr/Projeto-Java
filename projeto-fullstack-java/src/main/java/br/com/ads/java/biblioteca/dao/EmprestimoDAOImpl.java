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
        this.connection = DatabaseUtil.getConnection(); 
    }

    @Override
    public List<Emprestimo> buscarEmprestimos() {
        List<Emprestimo> emprestimos = new ArrayList<>();
        String sql = "SELECT * FROM emprestimos";


        try (Statement stmt = connection.createStatement(); 
            ResultSet rs = stmt.executeQuery(sql)) {

            
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
            
            throw new RuntimeException("Erro ao buscar os empréstimos no banco de dados", e);
        }

        return emprestimos;
    }



    @Override
    public List<Emprestimo> findByIdUsuario(int idUsuario) {
        List<Emprestimo> Emprestimos = new ArrayList<>();
        String sql = "SELECT emprestimos.*, livros.* "
           + "FROM emprestimos "
           + "JOIN livros ON emprestimos.id_livros = livros.id_livro "
           + "WHERE emprestimos.id_usuarios = ?"; 

        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, idUsuario);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    
                    Livro livro = new Livro(
                        rs.getString("nome"),
                        rs.getString("autor"),
                        rs.getString("genero"),
                        rs.getString("idade_indicativa"),
                        rs.getString("descricao"),
                        rs.getInt("qtd_disponivel"),
                        rs.getInt("qtd_total"),
                        rs.getBoolean("disponivel") 
                    );

                    
                    Emprestimo emprestimo = new Emprestimo(
                        rs.getInt("id_emprestimo"), 
                        livro,   
                        rs.getDate("data_emprestimo").toLocalDate(),
                        rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null, 
                        rs.getString("status")
                    );

                    Emprestimos.add(emprestimo);
                    System.out.println(emprestimo);
                   
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return Emprestimos;
    }
    
    // por livro
    @Override
    public List<Emprestimo> findByIdLivro(int idLivro) {
        System.out.println("Parâmetro idLivro recebido no dao: " + idLivro);
        List<Emprestimo> emprestimos = new ArrayList<>();
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
                    
                    Usuario usuario = new Usuario(
                        rs.getString("nome_usuario"),
                        rs.getString("email"),
                        rs.getString("telefone"),
                        rs.getDate("data_nascimento") != null ? rs.getDate("data_nascimento").toLocalDate() : null, 
                        rs.getString("endereco")
                    );
    
                    
                    Emprestimo emprestimo = new Emprestimo(
                        rs.getInt("id_emprestimo"), 
                        usuario,    
                        rs.getDate("data_emprestimo").toLocalDate(),
                        rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null, 
                        rs.getString("status")
                    );
                      
                    emprestimos.add(emprestimo);
                    System.out.println("Emprestimo com detalhes do emprestimo: " + emprestimo.toString()); 
                    System.out.println("");
                    System.out.println("");
                    System.out.println("Emprestimo com detalhes do usuario: " + usuario.toString()); 
                    System.out.println("");
                    System.out.println("");
                    System.out.println("");
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return emprestimos;
    }
    
}

