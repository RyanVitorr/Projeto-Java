// Classe Wishlist
import biblioteca.model.Usuario; 
import java.util.ArrayList;
import java.util.List;

public class ListaDeDesejos extends Usuario {
    private List<Livro> listaDesejos;



public ListaDeDesejos() {
    this.listaDesejos = new ArrayList<>();
}


public ListaDeDesejos(String nomeCompleto, String email, int nascimento, String senha) {
    super(nomeCompleto, email, nascimento, senha, senha);
    this.listaDesejos = new ArrayList<>();
}

}