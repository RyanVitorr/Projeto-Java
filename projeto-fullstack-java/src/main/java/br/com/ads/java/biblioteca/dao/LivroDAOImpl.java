package br.com.ads.java.biblioteca.dao;

import br.com.ads.java.biblioteca.model.Livro;
import br.com.ads.java.biblioteca.utils.DatabaseUtil;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class LivroDAOImpl implements LivroDAO {
    private Connection connection;

    public LivroDAOImpl() {
        this.connection = DatabaseUtil.getConnection(); // Método para obter a conexão
    }

    @Override
    public List<Livro> findAll() {
        List<Livro> livros = new ArrayList<>();
        String sql = "SELECT * FROM livros";
        try (Statement stmt = connection.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                livros.add(new Livro(
                        rs.getInt("id_livro"), 
                        rs.getString("nome"),
                        rs.getString("autor"),
                        rs.getString("genero"),
                        rs.getString("idade_indicativa"),
                        rs.getString("descricao"),
                        rs.getInt("qtd_disponivel"),
                        rs.getInt("qtd_total"),
                        rs.getBoolean("disponivel") 
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return livros;
    }

    @Override
    public List<Livro> dashboard(Date dataEmprestimo) {
        List<Livro> livros = new ArrayList<>();
        String sql = "SELECT l.* FROM livros l " +
                     "JOIN emprestimos e ON l.id_livro = e.id_livro " +
                     "WHERE e.data_emprestimo = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setDate(1, dataEmprestimo); 
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    livros.add(new Livro(
                            rs.getInt("id_livro"),
                            rs.getString("nome"),
                            rs.getString("autor"),
                            rs.getString("genero"),
                            rs.getString("idade_indicativa"),
                            rs.getString("descricao"),
                            rs.getInt("qtd_disponivel"),
                            rs.getInt("qtd_total"),
                            rs.getBoolean("disponivel")
                    ));
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return livros;
    }
    
}
