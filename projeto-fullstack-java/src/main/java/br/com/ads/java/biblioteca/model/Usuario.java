package br.com.ads.java.biblioteca.model;
import java.time.LocalDate;


public class Usuario {
    private int id;
    private String nome;
    private int cpf;
    private String email;
    private String telefone;
    private LocalDate dataNascimento; 
    private String endereco;
    
    // Construtor vazio
    public Usuario() {}
    
    // Construtor para receber dados do banco
    public Usuario(int id, String nome, String email, String telefone, LocalDate dataNascimento, String endereco) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.dataNascimento = dataNascimento;
        this.endereco = endereco;
    }

    public Usuario(String nome, String email) {
        this.nome = nome;
        this.email = email;
    }
    
    // Construtor que referencia cada variável
    public Usuario(String nome, String email, String telefone, LocalDate dataNascimento, LocalDate dataRegistro, String endereco) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.dataNascimento = dataNascimento;
        
        this.endereco = endereco;
    }
    // os Getters e Setters provavelmente não serão necessários ass: Ryan

      // Getters e Setters
      public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCpf(int cpf){
        this.cpf = cpf;
    }

    public int getCpf(){
        return cpf;
    }

    public void setId( int id) {
        this.id = id;
    }

    public int getId(int id) {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    // get emprestimo
    public String toString() {
        return "Usuario{" +
                "id='" + id + '\'' +
                "nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", telefone='" + telefone + '\'' +
                ", dataNascimento=" + dataNascimento +
                ", endereco='" + endereco + '\'' +
                '}';
    }
   
}

