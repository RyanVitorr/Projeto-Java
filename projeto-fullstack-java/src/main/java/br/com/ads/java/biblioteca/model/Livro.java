package br.com.ads.java.biblioteca.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idLivro; // Atributo para o identificador do livro
    private String nome;
    private String autor;
    private String genero;
    private String idadeIndicativa; // Renomeado para seguir convenções
    private String descricao;
    private int qtdDisponivel; // Renomeado para seguir convenções
    private int qtdTotal;
    private boolean disponivel;

    // Construtor ajustado para incluir idLivro
    public Livro(String nome, String autor, String genero, String idadeIndicativa, String descricao,
                 int qtdDisponivel, int qtdTotal, boolean disponivel) {
        this.nome = nome;
        this.autor = autor;
        this.genero = genero;
        this.idadeIndicativa = idadeIndicativa;
        this.descricao = descricao;
        this.qtdDisponivel = qtdDisponivel;
        this.qtdTotal = qtdTotal;
        this.disponivel = disponivel;
    }

    // Construtor com ID (para casos onde o ID é necessário)
    public Livro(int idLivro, String nome, String autor, String genero, String idadeIndicativa,
        String descricao, int qtdDisponivel, int qtdTotal, boolean disponivel) {
        this.idLivro = idLivro;
        this.nome = nome;
        this.autor = autor;
        this.genero = genero;
        this.idadeIndicativa = idadeIndicativa;
        this.descricao = descricao;
        this.qtdDisponivel = qtdDisponivel;
        this.qtdTotal = qtdTotal;
        this.disponivel = disponivel;
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

    public String getIdadeIndicativa() {
        return idadeIndicativa;
    }

    public void setIdadeIndicativa(String idadeIndicativa) {
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

    public boolean isDisponivel() {
        return disponivel;
    }

    public void setDisponivel(boolean disponivel) {
        this.disponivel = disponivel;
    }
}
