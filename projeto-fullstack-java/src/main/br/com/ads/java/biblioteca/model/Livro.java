package biblioteca.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

public class Livro {
    private int id;
    private String titulo;
    private String autor;
    private int anoPublicação;
    private String genero;

    public Livro(){}

    public Livro(int id,String titulo,String autor,int anoPublicação, String genero){

        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicação = anoPublicação;
        this.genero = genero;
    }
    
    public int getAnoPublicação() {
        return anoPublicação;
    }

    public String getAutor() {
        return autor;
    }

    public String getGenero() {
        return genero;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setAnoPublicação(int anoPublicação) {
        this.anoPublicação = anoPublicação;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }
    
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
}