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
        this.connection = DatabaseUtil.getConnection();
    }

    @Override
    public List<Livro> findAll() {
        List<Livro> livros = new ArrayList<>();
        String sql = "SELECT * FROM livros";
        try (Statement stmt = connection.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                livros.add(new Livro(
                    rs.getInt("id"), 
                    rs.getString("nome"),
                    rs.getString("autor"),
                    rs.getString("genero"),
                    rs.getString("idade_indicativa"),
                    rs.getString("descricao"),
                    rs.getInt("qtd_disponivel"),
                    rs.getInt("qtd_total")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return livros;
    }

    @Override
    public Livro salvar(Livro Livro) {
        
        String sql = "ISERT INTO livros (nome, autor, genero, idadeIndicativa, descricao, qtdDisponivel, qtdTotal) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (PreparedStatement stmt = connection.prepareStatement(sql)){
            stmt.setString(1, Livro.getNome());
            stmt.setString(2, Livro.getAutor());
            stmt.setString(3, Livro.getGenero());
            stmt.setString(4, Livro.getIdadeIndicativa());
            stmt.setString(5, Livro.getDescricao());
            stmt.setInt(6, Livro.getQtdDisponivel());
            stmt.setInt(7, Livro.getQtdTotal());

            stmt.executeUpdate();
            System.out.println("Livro cadastrado com sucesso!");

        }

        catch (SQLException e) {
            e.printStackTrace();
    }
            return Livro;

   
}
}