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
    public List<Emprestimo> findByIdUsuario(int idUsuario) {
        List<Emprestimo> emprestimos = new ArrayList<>();
        String sql = "SELECT emprestimo.*, livros.* "
           + "FROM emprestimo "
           + "JOIN livros ON emprestimo.id_livros = livros.id_livro "
           + "WHERE emprestimo.id_usuarios = ?";


        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, idUsuario);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    // Extraindo dados do livro
                    Livro livro = new Livro(
                        rs.getInt("id_livro"), 
                        rs.getString("nome"),
                        rs.getString("autor"),
                        rs.getString("genero"),
                        rs.getString("idade_indicativa"),
                        rs.getString("descricao"),
                        rs.getInt("qtd_disponivel"),
                        rs.getInt("qtd_total"),
                        rs.getBoolean("disponivel")    
                    );
                    
                    // Extraindo dados do empréstimo
                    Emprestimo emprestimo = new Emprestimo(
                        rs.getInt("id_emprestimo"), 
                        livro,      
                        rs.getDate("data_emprestimo").toLocalDate(),
                        rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null, 
                        rs.getString("status") 
                    );

                    emprestimos.add(emprestimo);
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return emprestimos;
    }
    
    @Override
    public List<Emprestimo> findByIdLivro(int idLivro) {
    List<Emprestimo> emprestimos = new ArrayList<>();
    String sql = "SELECT * FROM emprestimo "
                + "WHERE emprestimo.id_livros = ?";



    /*   String sql = "SELECT emprestimo.id_emprestimo, emprestimo.data_emprestimo, emprestimo.data_devolucao, emprestimo.status, "
               + "usuarios.id_usuario, usuarios.nome AS nome_usuario, usuarios.email, usuarios.telefone, usuarios.data_nascimento, usuarios.endereco "
               + "FROM emprestimo "
               + "JOIN usuarios ON emprestimo.id_usuarios = usuarios.id_usuario "
               + "WHERE emprestimo.id_livros = ?"; */

    try (PreparedStatement stmt = connection.prepareStatement(sql)) {
        stmt.setInt(1, idLivro); 

        try (ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                // Criar um objeto Usuario
                 
                Usuario usuario = new Usuario(
                    rs.getString("nome_usuario"),
                    rs.getString("email"),
                    rs.getString("telefone"),
                    rs.getDate("data_nascimento") != null ? rs.getDate("data_devolucao").toLocalDate() : null,
                    rs.getString("endereco")
                );
                System.out.println("usuario: " + usuario); 
                System.out.println(""); 
                System.out.println("");
                System.out.println("");
         

                // Criar um objeto Emprestimo
                emprestimos.add(new Emprestimo(
                    rs.getInt("id_emprestimo"), 
                    rs.getDate("data_emprestimo") != null ? rs.getDate("data_emprestimo").toLocalDate() : null, 
                    rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null, 
                    rs.getString("status")
                ));
                System.out.println("emprestimo: " + emprestimos); 
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
