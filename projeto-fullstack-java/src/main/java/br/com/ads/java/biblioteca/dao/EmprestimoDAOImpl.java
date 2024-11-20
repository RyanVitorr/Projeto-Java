// Implementação EmprestimoDAOImpl 
package br.com.ads.java.biblioteca.dao;
import br.com.ads.java.biblioteca.model.Emprestimo;
import br.com.ads.java.biblioteca.model.Livro;
import br.com.ads.java.biblioteca.model.Usuario;
import br.com.ads.java.biblioteca.model.Multa;
import br.com.ads.java.biblioteca.utils.DatabaseUtil;
import java.sql.*;
import java.time.LocalDate;
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

        } catch (SQLException error) {
            
            throw new RuntimeException("Erro ao buscar os empréstimos no banco de dados", error);
        }

        return emprestimos;
    }

    // por idusuario
    @Override
    public List<Emprestimo> findByIdUsuario(int idUsuario) {
        List<Emprestimo> Emprestimos = new ArrayList<>();
        String sql = "SELECT emprestimos.*, livros.* "
                    + "FROM emprestimos "
                    + "JOIN livros ON emprestimos.id_livros = livros.id "
                    + "WHERE emprestimos.id_usuario = ?";

        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setInt(1, idUsuario);
            

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    
                    Livro livro = new Livro(
                        rs.getInt("id"),
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
        String sql = "SELECT emprestimos.id_emprestimo, emprestimos.preco, emprestimos.data_emprestimo, emprestimos.data_devolucao, emprestimos.data_previ_devolucao, emprestimos.quantidade, "
                   + "usuarios.id_usuario, usuarios.nome AS nome_usuario, usuarios.cpf, usuarios.email, usuarios.telefone, usuarios.data_nascimento, usuarios.endereco, "
                   + "livros.id "
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
    public List<Emprestimo> buscarDadosDash() {
        List<Emprestimo> emprestimos = new ArrayList<>();
        String sql = "SELECT " +
             "(SELECT COUNT(*) FROM livros) AS total_livros, " +
             "(SELECT COUNT(*) FROM usuarios) AS total_usuarios, " +
             "(SELECT COUNT(*) FROM emprestimos WHERE data_devolucao IS NULL AND data_previ_devolucao < CURRENT_DATE) AS livros_atrasados, " +
             "(SELECT COUNT(*) FROM emprestimos) AS total_livros_alugados, " +
             "(SELECT SUM(preco) FROM emprestimos) AS lucro_total " +
             "FROM emprestimos e ";

    
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
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
    public List<Emprestimo> historicoDash() {
        List<Emprestimo> emprestimos = new ArrayList<>();
        String sql = "SELECT e.id_emprestimo, e.preco, e.data_emprestimo, e.data_devolucao, e.data_previ_devolucao, e.quantidade," +
                     "u.nome AS nome_usuario, u.email, u.id_usuario AS idU," +
                     "l.id, l.nome " +
                     "FROM emprestimos e " +
                     "JOIN livros l ON e.id_livros = l.id " +
                     "JOIN usuarios u ON e.id_usuario = u.id_usuario ";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    
                    Livro livro = new Livro(
                        rs.getInt("id"),
                        rs.getString("nome")
                    );
     
                    Usuario usuario = new Usuario(
                        rs.getString("nome_usuario"),
                        rs.getString("email"),
                        rs.getInt("idU")
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
    
    @Override
    public Emprestimo novoEmprestimo(long idUsuario, long idLivro, Emprestimo emprestimo) {
        if (emprestimo == null) {
            System.out.println("Erro: objeto 'emprestimo' é nulo.");
            return null;
        }
    
        System.out.println("Data do Empréstimo: " + emprestimo.getDataEmprestimo());
        System.out.println("ID do Usuário: " + idUsuario);
        System.out.println("ID do Livro: " + idLivro);
    
        LocalDate dataAluguel = emprestimo.getDataEmprestimo();
        LocalDate dataPrevisaoEntrega = emprestimo.getDataPrevDevolucao();
    
        if (dataAluguel == null || dataPrevisaoEntrega == null) {
            System.out.println("Erro: data do empréstimo ou data de previsão de entrega estão nulas.");
            return null;
        }
    
        java.sql.Date dataAluguelSQL = java.sql.Date.valueOf(dataAluguel);
        java.sql.Date dataPrevisaoEntregaSQL = java.sql.Date.valueOf(dataPrevisaoEntrega);
    
        String sqlInsert = "INSERT INTO emprestimos (id_usuario, id_livros, preco, data_emprestimo, data_previ_devolucao, quantidade) VALUES (?, ?, ?, ?, ?, ?)";
        String sqlUpdate = "UPDATE livros SET qtd_disponivel = qtd_disponivel - ? WHERE id = ?";
    
        try {

            try (PreparedStatement stmtInsert = connection.prepareStatement(sqlInsert)) {
                stmtInsert.setLong(1, idUsuario);
                stmtInsert.setLong(2, idLivro);
                stmtInsert.setDouble(3, emprestimo.getPreco());
                stmtInsert.setDate(4, dataAluguelSQL);
                stmtInsert.setDate(5, dataPrevisaoEntregaSQL);
                stmtInsert.setInt(6, emprestimo.getQuantidade());
    
                int linhasAfetadas = stmtInsert.executeUpdate();
                if (linhasAfetadas == 0) {
                    System.out.println("Erro: Nenhum registro de empréstimo foi inserido.");
                    connection.rollback(); 
                    return null;
                }
            }
    
            try (PreparedStatement stmtUpdate = connection.prepareStatement(sqlUpdate)) {
                stmtUpdate.setInt(1, emprestimo.getQuantidade());
                stmtUpdate.setLong(2, idLivro);
    
                int linhasAfetadas = stmtUpdate.executeUpdate();
                if (linhasAfetadas == 0) {
                    System.out.println("Erro: Nenhum registro de livro foi atualizado. Pode não haver estoque suficiente.");
                    connection.rollback(); 
                    return null;
                }
            }
    
            System.out.println("Empréstimo registrado e estoque atualizado com sucesso!");
            return emprestimo;
    
        } catch (SQLException e) {
            System.out.println("Erro durante a transação: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
    

}

@Override
    public Emprestimo dataDevolucao(long idEmprestimo, Date dataDevolucao Emprestimo emprestimo){
     String sqlUpdate = "UPDATE emprestimo SET qtd_disponivel = qtd_disponivel = ? WHERE id = ?";
    
        try (PreparedStatement stmtUpdate = connection.prepareStatement(sqlUpdate)){
                stmtUpdate.setDate(1, dataDevolucao());
                stmtUpdate.setLong(2, idEmprestimo);
    
                int linhasAfetadas = stmtUpdate.executeUpdate();
                if (linhasAfetadas == 0) 
                    System.out.println("Erro: Nenhum registro de empretimo foi atualizado.");
                    connection.rollback(); 
                    return null;
             
            
        
                 System.out.println("Empréstimo registrado e estoque atualizado com sucesso!");
                 return emprestimo;
        }
        catch (SQLException e) {
            System.out.println("Erro durante a transação: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
    