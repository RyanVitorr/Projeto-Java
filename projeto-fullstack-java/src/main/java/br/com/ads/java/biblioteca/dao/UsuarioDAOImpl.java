// Implementação UsuarioDAOImpl 
package br.com.ads.java.biblioteca.dao;
import br.com.ads.java.biblioteca.model.Usuario; 
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.NoResultException;
import org.springframework.stereotype.Repository;

@Repository
public class UsuarioDAOImpl implements UsuarioDAO {


    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Usuario salvar(Usuario usuario) {
        entityManager.persist(usuario);
        return usuario;
    }

    @Override
    public Usuario buscarPorEmail(String email) {
        String jpql = "SELECT u FROM Usuario u WHERE u.email = :email";
        try {
            return entityManager.createQuery(jpql, Usuario.class)
                    .setParameter("email", email)
                    .getSingleResult();
        } catch (NoResultException e) {
            return null;
        }
    }
}
