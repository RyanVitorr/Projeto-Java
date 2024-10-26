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
                        rs.getInt("id_usuario"),
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
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return emprestimos;
    }

    @Override
    public List<Emprestimo> buscarEmprestimosDash() {
        List<Emprestimo> emprestimos = new ArrayList<>();
        String sql = "SELECT e.id_emprestimo, e.data_emprestimo, e.data_devolucao, e.status, " +
                    "u.nome AS nome_usuario, u.email, " +
                    "l.id_livro, l.nome, " +
                    "(SELECT COUNT(*) FROM livros) AS total_livros, " +
                    "(SELECT COUNT(*) FROM emprestimos WHERE data_devolucao IS NULL OR data_devolucao < CURRENT_DATE) AS livros_atraso, " +
                    "(SELECT COUNT(*) FROM emprestimos) AS total_livros_alugados " +
                    "FROM emprestimos e " +
                    "JOIN livros l ON e.id_livros = l.id_livro " +
                    "JOIN usuarios u ON e.id_usuario = u.id_usuario";

        try (PreparedStatement stmt = connection.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery()) {
            
            System.out.println("Consulta executada com sucesso.");
            
            while (rs.next()) {
                System.out.println("Processando registro de empréstimo ID: " + rs.getInt("id_emprestimo"));
                
                Livro livro = new Livro(
                    rs.getInt("id_livro"),
                    rs.getString("nome")
                );

                Usuario usuario = new Usuario(
                    rs.getString("nome_usuario"),
                    rs.getString("email")
                );

                Emprestimo emprestimo = new Emprestimo(
                    rs.getInt("id_emprestimo"),
                    usuario,
                    livro,
                    rs.getDate("data_emprestimo").toLocalDate(),
                    rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null,
                    rs.getString("status"),
                    rs.getInt("total_livros"),
                    rs.getInt("livros_atraso"),
                    rs.getInt("total_livros_alugados")
                );

                emprestimos.add(emprestimo);
            }

            if (emprestimos.isEmpty()) {
                System.out.println("Nenhum registro encontrado.");
            } else {
                System.out.println("Total de registros encontrados: " + emprestimos.size());
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        
        return emprestimos;
    }

    
    

    @Override
    public List<Emprestimo> dashboard(Date dataEmprestimo) {
        List<Emprestimo> emprestimos = new ArrayList<>();
        String sql = "SELECT e.id_emprestimo, e.data_emprestimo, e.data_devolucao, e.status, " +
                     "u.nome AS nome_usuario, u.email, " +
                     "l.id_livro, l.nome " +
                     "FROM emprestimos e " +
                     "JOIN livros l ON e.id_livros = l.id_livro " +
                     "JOIN usuarios u ON e.id_usuario = u.id_usuario " +
                     "WHERE e.data_emprestimo = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setDate(1, dataEmprestimo);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    
                    Livro livro = new Livro(
                        rs.getInt("id_livro"),
                        rs.getString("nome")
                    );
    
                    
                    Usuario usuario = new Usuario(
                        rs.getString("nome_usuario"),
                        rs.getString("email")
                    );
    
                    emprestimos.add(new Emprestimo(
                        rs.getInt("id_emprestimo"), 
                        usuario,
                        livro,    
                        rs.getDate("data_emprestimo").toLocalDate(),
                        rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null, 
                        rs.getString("status"),
                        rs.getInt("total_livros"),
                        rs.getInt("livros_atraso"),
                        rs.getInt("total_livros_alugados")
                    ));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return emprestimos;
    }
    
    
}

