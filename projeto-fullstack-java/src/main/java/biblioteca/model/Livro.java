// Classe Livro 
/**
 * Livro
 */
public class Livro {
    private int id;
    private String titulo;
    private String autor;
    private int anoPublicação;
    private String genero;

    public Livro(){}

    public Livro(int id,String titulo,String autor,int anoPublicação, String genero){
        this.id = id;
        this.titulo = titulo;
        this.autor = autor;
        this.anoPublicação = anoPublicação;
        this.genero = genero;
    }
    
    public int getId() {
        return id;
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

    public void setId(int id) {
        this.id = id;
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