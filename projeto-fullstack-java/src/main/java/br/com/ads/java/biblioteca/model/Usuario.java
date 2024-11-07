package br.com.ads.java.biblioteca.model;
import java.time.LocalDate;


public class Usuario {
    private int id;
    private String nome;
    private String cpf;
    private String email;
    private String telefone;
    private LocalDate dataNascimento; 
    private String endereco;
    private LocalDate dataCadastro;
    
    // Construtor vazio
    public Usuario() {}
    
    // Construtor para receber dados do banco
    public Usuario(int id, String nome, String cpf, String email, String telefone, String endereco, LocalDate dataNascimento, LocalDate dataCadastro){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.dataNascimento = dataNascimento;
        this.dataCadastro = dataCadastro;
    }

    // sem o datacadastro 
    public Usuario(int id, String nome, String cpf, String email, String telefone, String endereco, LocalDate dataNascimento){
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
        this.dataNascimento = dataNascimento;
    }

    public void setDataCadastro(LocalDate dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public Usuario(int id){
        this.id = id;
        
    }

    public Usuario(String nome, String email) {
        this.nome = nome;
        this.email = email;
    }
    
    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setCpf(String cpf){
        this.cpf = cpf;
    }

    public String getCpf(){
        return cpf;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
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

    @Override
    public String toString() {
        return "Usuario [id=" + id + ", nome=" + nome + ", cpf=" + cpf + ", email=" + email + ", telefone=" + telefone
                + ", dataNascimento=" + dataNascimento + ", endereco=" + endereco + "]";
    }

    public LocalDate getDataCadastro() {
        return dataCadastro;
    }

    

  
   
}

