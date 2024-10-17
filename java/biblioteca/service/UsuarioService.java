// Classe UsuarioService 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@service 
public class UsuarioService {

    @Autowired
    private UsuarioDAO UsuarioDAO;

    public Usuario cadastrarUsuario (Usuario usuario) {
        // validações


        //chama função do DAO
        return UsuarioDAO.salvar(usuario);
    }

    
}