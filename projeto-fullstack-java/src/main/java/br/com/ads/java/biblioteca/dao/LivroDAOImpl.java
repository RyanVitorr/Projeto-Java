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

    // todos os livros
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
                    rs.getInt("idade_indicativa"),
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

    // cadastrar novo livro
    @Override
    public Livro salvar(Livro livro) { 
        String sql = "INSERT INTO livros (nome, autor, genero, idade_indicativa, descricao, qtd_disponivel, qtd_total) VALUES (?, ?, ?, ?, ?, ?, ?) " +
                        "ON CONFLICT (nome, autor) DO NOTHING";
        try (PreparedStatement stmt = connection.prepareStatement(sql)){
            stmt.setString(1, livro.getNome());
            stmt.setString(2, livro.getAutor());
            stmt.setString(3, livro.getGenero());
            stmt.setInt(4, livro.getIdadeIndicativa());
            stmt.setString(5, livro.getDescricao());
            stmt.setInt(6, livro.getQtdDisponivel());
            stmt.setInt(7, livro.getQtdTotal());

            int linhasAfetadas = stmt.executeUpdate();

            if (linhasAfetadas > 0) {
                System.out.println("Livro cadastrado com sucesso!");
                return livro;
            } else {
                System.out.println("O livro já existe na base de dados.");
                return null;  
            }

            

        }catch (SQLException e) {
            e.printStackTrace();
        }
        return livro;   
    }

    // excluir livro
    @Override
    public void excluir(long idLivro) throws SQLException {
        String sql = "DELETE FROM livros WHERE id = ?";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setLong(1, idLivro);
            int rowsAffected = stmt.executeUpdate();
    
            if (rowsAffected == 0) {
                throw new SQLException("Nenhum livro encontrado com o ID fornecido.");
            }
        } catch (SQLException e) {
            if (e.getMessage().contains("violação de chave estrangeira")) {
                throw new SQLException("Erro: Este livro está vinculado a registros de empréstimos e não pode ser excluído.");
            }
            throw e;
        }
    }

    @Override
    public Livro atualizar(long id, Livro livro){
        String sql = "UPDATE livros SET nome = ?, autor = ?, genero = ?, descricao = ?, idade_indicativa = ?, qtd_disponivel = ?, qtd_total = ? WHERE id = ?";
    
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, livro.getNome());
            stmt.setString(2, livro.getAutor());
            stmt.setString(3, livro.getGenero());
            stmt.setString(4, livro.getDescricao());
            stmt.setInt(5, livro.getIdadeIndicativa());
            stmt.setInt(6, livro.getQtdDisponivel());
            stmt.setInt(7, livro.getQtdTotal());
            stmt.setLong(8, id);
            
            stmt.executeUpdate();
            System.out.println("Atualização feita com sucesso!");
    
        } catch (SQLException e) {
            e.printStackTrace();
        }
    
        return livro;
    }
}
