// Implementação UsuarioDAOImpl 
package br.com.ads.java.biblioteca.dao;
import br.com.ads.java.biblioteca.model.Usuario;
import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import br.com.ads.java.biblioteca.utils.DatabaseUtil;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.NoResultException;
import org.springframework.stereotype.Repository;

@Repository
public class UsuarioDAOImpl implements UsuarioDAO {
    private Connection connection;
    public UsuarioDAOImpl() {
        this.connection = DatabaseUtil.getConnection();
    }

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Usuario salvar(Usuario usuario) {
        entityManager.persist(usuario);
        return usuario;
    }

    @Override
    public Usuario buscarTodos() {
        String jpql = "SELECT * FROM usuarios";
        try {
            return entityManager.createQuery(jpql, Usuario.class)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }

    @Override
    public Usuario atualizar(Usuario usuario) {
        String sql = "UPDATE Usuario SET Nome = ?, cpf = ?, Email = ?, Telefone = ?, DataNascimento = ?, Endereco = ? WHERE id = ?";
    
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, usuario.getNome());
            stmt.setInt(2, usuario.getCpf());
            stmt.setString(3, usuario.getEmail());
            stmt.setString(4, usuario.getTelefone());
            stmt.setDate(5, java.sql.Date.valueOf(usuario.getDataNascimento()));
            stmt.setString(6, usuario.getEndereco());
            
            stmt.executeUpdate();
            System.out.println("Atualização feita com sucesso!");
    
        } catch (SQLException e) {
            e.printStackTrace();
        }
    
        return usuario;
    }
    
}
