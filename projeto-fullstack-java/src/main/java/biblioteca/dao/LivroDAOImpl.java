package biblioteca.dao;  // Verifique se isso é consistente em ambos os arquivos

import biblioteca.model.Livro;
import javax.persistence.EntityManager; 
import javax.persistence.PersistenceContext;
import javax.persistence.NoResultException;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class LivroDAOImpl implements LivroDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Livro salvar(Livro livro) {
        entityManager.persist(livro);
        return livro;
    }

    @Override
    public List<Livro> buscarPorAutor(String autor) {
        String jpql = "SELECT l FROM Livro l WHERE l.autor = :autor";
        return entityManager.createQuery(jpql, Livro.class)
                .setParameter("autor", autor)
                .getResultList();
    }

    @Override
    public List<Livro> buscarPorGenero(String genero) {
        String jpql = "SELECT l FROM Livro l WHERE l.genero = :genero";
        return entityManager.createQuery(jpql, Livro.class)
                .setParameter("genero", genero)
                .getResultList();
    }

    @Override
    public List<Livro> buscarPorTitulo(String titulo) {
        String jpql = "SELECT l FROM Livro l WHERE l.titulo = :titulo";
        return entityManager.createQuery(jpql, Livro.class)
                .setParameter("titulo", titulo)
                .getResultList();
    }

    @Override
    public List<Livro> buscarTodosLivros() { 
        String jpql = "SELECT l FROM Livro l";  
        return entityManager.createQuery(jpql, Livro.class).getResultList(); 
    }

    @Override
    public void remover(Livro livro) {
        if (entityManager.contains(livro)) {
            entityManager.remove(livro);
        } else {
            entityManager.remove(entityManager.merge(livro));
        }
    }
}
