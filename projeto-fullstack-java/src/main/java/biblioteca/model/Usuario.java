package biblioteca.model;
import java.util.Scanner;

public class Usuario {
    private String nomeCompleto;
    private String email;
    private int nascimento;
    private String senha;
    private String endereco;

    // Construtor vazio
    public Usuario() {}

    // Construtor que referencia cada variável
    public Usuario(String nomeCompleto, String email, int nascimento, String senha, String endereco) {
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.nascimento = nascimento;
        this.senha = senha;
        this.endereco = endereco;

    }
    // os Getters e Setters provavelmente não serão necessários ass: Ryan

    // Getters
    public String getEmail() {
        return email;
    }

    public int getNascimento() {
        return nascimento;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public String getSenha() {
        return senha;
    }

    public String getEndereco() {
        return endereco;
    }

    // Setters
    public void setEmail(String email) {
        this.email = email;
    }

    public void setNascimento(int nascimento) {
        this.nascimento = nascimento;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }
}

