// Implementação EmprestimoDAOImpl 
package br.com.ads.java.biblioteca.dao;
import br.com.ads.java.biblioteca.model.Emprestimo;
import br.com.ads.java.biblioteca.model.Livro;
import br.com.ads.java.biblioteca.model.Usuario;
import br.com.ads.java.biblioteca.model.Multa;
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

    // todos emprestimos
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
                    rs.getDate("data_previ_devolucao") != null ? rs.getDate("data_previ_devolucao").toLocalDate() : null,
                    rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null
                ));
            }

        } catch (SQLException e) {
            
            throw new RuntimeException("Erro ao buscar os empréstimos no banco de dados", e);
        }

        return emprestimos;
    }

    // por idusuario
    @Override
    public List<Emprestimo> findByIdUsuario(int idUsuario) {
        List<Emprestimo> Emprestimos = new ArrayList<>();
        String sql = "SELECT emprestimos.*, livros.* "
           + "FROM emprestimos "
           + "JOIN livros ON emprestimos.id_emprestimo = livros.id "
           + "WHERE emprestimos.id_usuario= ?"; 

        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, idUsuario);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    
                    Livro livro = new Livro(
                        rs.getString("nome"),
                        rs.getString("autor"),
                        rs.getString("genero"),
                        rs.getInt("idade_indicativa"),
                        rs.getString("descricao"),
                        rs.getInt("qtd_disponivel"),
                        rs.getInt("qtd_total")
                    );

                    Emprestimo emprestimo = new Emprestimo(
                        rs.getInt("id_emprestimo"), 
                        livro,   
                        rs.getFloat("preco"),
                        rs.getDate("data_emprestimo").toLocalDate(),
                        rs.getDate("data_previ_devolucao") != null ? rs.getDate("data_previ_devolucao").toLocalDate() : null,
                        rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null,
                        rs.getInt("quantidade")
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
        String sql = "SELECT emprestimos.id_emprestimo, emprestimos.data_emprestimo, emprestimos.data_devolucao, emprestimos.data_previ_devolucao, emprestimos.quantidade, "
                   + "usuarios.id_usuario, usuarios.nome AS nome_usuario, usuarios.cpf, usuarios.email, usuarios.telefone, usuarios.data_nascimento, usuarios.endereco, "
                   + "livros.preco, livros.id "
                   + "FROM emprestimos "
                   + "JOIN usuarios ON emprestimos.id_usuario = usuarios.id_usuario "
                   + "JOIN livros ON emprestimos.id_livros = livros.id "
                   + "WHERE emprestimos.id_livros = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            
            stmt.setInt(1, idLivro);
            System.out.println("Parâmetro idLivro recebido no dao stmt: " + idLivro);
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    
                    Usuario usuario = new Usuario(
                        rs.getInt("id_usuario"),
                        rs.getString("nome_usuario"),
                        rs.getString("cpf"),
                        rs.getString("email"),
                        rs.getString("telefone"),                     
                        rs.getString("endereco"),
                        rs.getDate("data_nascimento") != null ? rs.getDate("data_nascimento").toLocalDate() : null
                    );
    
                    emprestimos.add(new Emprestimo(
                        rs.getInt("id_emprestimo"), 
                        usuario,
                        rs.getFloat("preco"),
                        rs.getDate("data_emprestimo").toLocalDate(),
                        rs.getDate("data_previ_devolucao") != null ? rs.getDate("data_previ_devolucao").toLocalDate() : null,
                        rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null,
                        rs.getInt("quantidade")
                    ));
                    
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return emprestimos;
    }

    // dados dash
    @Override
    public List<Emprestimo> buscarDadosDash(Date dataEmprestimo) {
        List<Emprestimo> emprestimos = new ArrayList<>();
        String sql = "SELECT " +
             "(SELECT COUNT(*) FROM livros) AS total_livros, " +
             "(SELECT COUNT(*) FROM usuarios) AS total_usuarios, " +
             "(SELECT COUNT(*) FROM emprestimos WHERE data_devolucao IS NULL AND data_previ_devolucao < CURRENT_DATE) AS livros_atrasados, " +
             "(SELECT COUNT(*) FROM emprestimos) AS total_livros_alugados, " +
             "(SELECT SUM(preco) FROM emprestimos) AS lucro_total " +
             "FROM emprestimos e " +
             "WHERE (? IS NULL OR e.data_emprestimo = ?)";

    
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            java.sql.Date sqlDate = (dataEmprestimo != null) ? new java.sql.Date(dataEmprestimo.getTime()) : null;
            stmt.setDate(1, sqlDate); 
            stmt.setDate(2, sqlDate); 
    
            try (ResultSet rs = stmt.executeQuery()) {
                System.out.println("Consulta executada com sucesso."); 
    
                if (rs.next()) { 
                    emprestimos.add(new Emprestimo(
                        rs.getInt("total_livros"),
                        rs.getInt("livros_atrasados"),
                        rs.getInt("total_livros_alugados"),
                        rs.getFloat("lucro_total"),
                        rs.getInt("total_usuarios")
                    ));
                    
                    System.out.println("Total de registros encontrados: " + emprestimos.size());
                } else {
                    System.out.println("Nenhum registro encontrado.");
                }
    
            } catch (SQLException e) {
                e.printStackTrace();
            }
    
        } catch (SQLException e) {
            e.printStackTrace();
        }
    
        return emprestimos;
    }
    
    

    // historico dash
    @Override
    public List<Emprestimo> historicoDash(Date dataEmprestimo) {
        List<Emprestimo> emprestimos = new ArrayList<>();
        String sql = "SELECT e.id_emprestimo, e.preco, e.data_emprestimo, e.data_devolucao, e.data_previ_devolucao, e.quantidade," +
                     "u.nome AS nome_usuario, u.email, " +
                     "l.id, l.nome " +
                     "FROM emprestimos e " +
                     "JOIN livros l ON e.id_livros = l.id " +
                     "JOIN usuarios u ON e.id_usuario = u.id_usuario " +
                     "WHERE (? IS NULL OR e.data_emprestimo = ?)";;
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            java.sql.Date sqlDate = (dataEmprestimo != null) ? new java.sql.Date(dataEmprestimo.getTime()) : null; 
            stmt.setDate(1, sqlDate); 
            stmt.setDate(2, sqlDate); 
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    
                    Livro livro = new Livro(
                        rs.getInt("id"),
                        rs.getString("nome")
                    );
    
                    
                    Usuario usuario = new Usuario(
                        rs.getString("nome_usuario"),
                        rs.getString("email")
                    );
    

                    Multa multa = new Multa();
                    multa.setDataPrevDevolucao(rs.getDate("data_previ_devolucao"));
                    multa.setDataDevolucao(rs.getDate("data_devolucao"));
    
                    float valorCalculado = multa.calcularValorMulta();

                    emprestimos.add(new Emprestimo(
                        rs.getInt("id_emprestimo"), 
                        usuario,
                        livro,
                        rs.getFloat("preco"), 
                        rs.getDate("data_emprestimo").toLocalDate(),
                        rs.getDate("data_previ_devolucao") != null ? rs.getDate("data_previ_devolucao").toLocalDate() : null,
                        rs.getDate("data_devolucao") != null ? rs.getDate("data_devolucao").toLocalDate() : null,
                        rs.getInt("quantidade"),
                        valorCalculado
                    ));

                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return emprestimos;
    }
    
    
}

