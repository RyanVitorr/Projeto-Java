// Interface UsuarioDAO 

public interface UsuarioDAO {
    Usuario salvar(Usuario usuario);
    Usuario buscarPorEmail(String email);
};
