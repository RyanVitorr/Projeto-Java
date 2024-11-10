package br.com.ads.java.biblioteca.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idLivro; 
    private String nome;
    private String autor;
    private String genero;
    private int idadeIndicativa; 
    private String descricao;
    private int qtdDisponivel; 
    private int qtdTotal;


    // usa para pegar tds os dados do livro
    public Livro(int idLivro, String nome, String autor, String genero, int idadeIndicativa, String descricao, int qtdDisponivel, int qtdTotal) {
        this.idLivro = idLivro;
        this.nome = nome;
        this.autor = autor;
        this.genero = genero;
        this.idadeIndicativa = idadeIndicativa;
        this.descricao = descricao;
        this.qtdDisponivel = qtdDisponivel;
        this.qtdTotal = qtdTotal;
    }

    public Livro() {}

    // usa no idUsuario
    public Livro(String nome, String autor, String genero, int idadeIndicativa, String descricao, int qtdDisponivel, int qtdTotal) {
        this.nome = nome;
        this.autor = autor;
        this.genero = genero;
        this.idadeIndicativa = idadeIndicativa;
        this.descricao = descricao;
        this.qtdDisponivel = qtdDisponivel;
        this.qtdTotal = qtdTotal;
    }

    // usa no historico do dashboard
    public Livro(int idLivro, String nome) {
        this.idLivro = idLivro;
        this.nome = nome;
    }

    // Getters e setters
    public int getIdLivro() {
        return idLivro;
    }

    public void setIdLivro(int idLivro) {
        this.idLivro = idLivro;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getAutor() {
        return autor;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public int getIdadeIndicativa() {
        return idadeIndicativa;
    }

    public void setIdadeIndicativa(int idadeIndicativa) {
        this.idadeIndicativa = idadeIndicativa;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public int getQtdDisponivel() {
        return qtdDisponivel;
    }

    public void setQtdDisponivel(int qtdDisponivel) {
        this.qtdDisponivel = qtdDisponivel;
    }

    public int getQtdTotal() {
        return qtdTotal;
    }

    public void setQtdTotal(int qtdTotal) {
        this.qtdTotal = qtdTotal;
    }



    // get com idlivro
    public String toStringIdLivro() {
        return "Livro{" +
                ", nome='" + nome + '\'' +
                ", autor='" + autor + '\'' +
                ", genero='" + genero + '\'' +
                ", idadeIndicativa='" + idadeIndicativa + '\'' +
                ", descricao='" + descricao + '\'' +
                '}';
    }
}

