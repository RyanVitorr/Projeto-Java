// Implementação UsuarioDAOImpl 
package br.com.ads.java.biblioteca.dao;
import br.com.ads.java.biblioteca.model.Usuario;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.List;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import br.com.ads.java.biblioteca.utils.DatabaseUtil;
import org.springframework.stereotype.Repository;
import java.sql.Statement;

@Repository
public class UsuarioDAOImpl implements UsuarioDAO {
    private Connection connection;
    
    public UsuarioDAOImpl() {
        this.connection = DatabaseUtil.getConnection();
    }

    // cadastra cliente
    @Override
    public Usuario salvar(Usuario usuario) {
        String sql = "INSERT INTO usuarios (nome, cpf, email, telefone, endereco, data_nascimento) VALUES (?, ?, ?, ?, ?, ?) " +
                        "ON CONFLICT (cpf) DO NOTHING";
        try (PreparedStatement stmt = connection.prepareStatement(sql)){
            stmt.setString(1, usuario.getNome());
            stmt.setString(2, usuario.getCpf());
            stmt.setString(3, usuario.getEmail());
            stmt.setString(4, usuario.getTelefone());
            stmt.setString(5, usuario.getEndereco());
 

            if (usuario.getDataNascimento() != null) {
                
                java.sql.Date dataNascimentoSQL = java.sql.Date.valueOf(usuario.getDataNascimento()); 
                stmt.setDate(6, dataNascimentoSQL);
            }

            int linhasAfetadas = stmt.executeUpdate();

            if (linhasAfetadas > 0) {
                System.out.println("Cliente cadastrado com sucesso!");
                return usuario;
            } else {
                System.out.println("O Cliente já existe na base de dados.");
                return null;  
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return usuario;
    }

    // pegar tds os clientes
    @Override
    public List<Usuario> buscarTodos() {
        String sql = "SELECT * FROM usuarios";
        List<Usuario> usuarios = new ArrayList<>();
        try (Statement stmt = connection.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                usuarios.add(new Usuario(
                    rs.getInt("id_usuario"),
                    rs.getString("nome"),
                    rs.getString("cpf"),
                    rs.getString("email"),
                    rs.getString("telefone"),
                    rs.getString("endereco"),
                    rs.getDate("data_nascimento") != null ? rs.getDate("data_nascimento").toLocalDate() : null
                ));

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return usuarios;
    }

    // atualizar dados cliente
    @Override
    public Usuario atualizar(long id, Usuario usuario) {
        String sql = "UPDATE Usuarios SET nome = ?, cpf = ?, email = ?, telefone = ?, data_nascimento = ?, endereco = ? WHERE id_usuario = ?";
    
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, usuario.getNome());
            stmt.setString(2, usuario.getCpf());
            stmt.setString(3, usuario.getEmail());
            stmt.setString(4, usuario.getTelefone());
            stmt.setDate(5, java.sql.Date.valueOf(usuario.getDataNascimento()));
            stmt.setString(6, usuario.getEndereco());
            stmt.setInt(7, usuario.getId());
            
            stmt.executeUpdate();
            System.out.println("Atualização feita com sucesso!");
    
        } catch (SQLException e) {
            e.printStackTrace();
        }
    
        return usuario;
    }
    
}
