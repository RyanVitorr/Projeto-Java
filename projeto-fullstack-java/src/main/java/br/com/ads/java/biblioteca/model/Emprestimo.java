package br.com.ads.java.biblioteca.model;

import java.time.LocalDate;

public class Emprestimo {

    private int idEmprestimo; 
    private Usuario usuario; 
    private Livro livro;      
    private int livroId;     
    private int usuarioId;     
    private String nomeUsuario;    
    private String nomeLivro;    
    private LocalDate dataEmprestimo;  
    private LocalDate dataDevolucao;   
    private String status;  

    // pega dados da api idLivro
    /* 
    public Emprestimo(int idEmprestimo, Usuario usuario, LocalDate dataEmprestimo, LocalDate dataDevolucao, String status) {
        this.idEmprestimo = idEmprestimo;
        this.usuario = usuario;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.status = status;
    }

    
    // pega dados da api idUsuario
    public Emprestimo(int idEmprestimo, Livro livro, LocalDate dataEmprestimo, LocalDate dataDevolucao, String status) {
        this.idEmprestimo = idEmprestimo;
        this.livro = livro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.status = status;
    }*/

    // todo emprestimo
    public Emprestimo(int idEmprestimo, int usuarioId, int livroId, LocalDate dataEmprestimo, LocalDate dataDevolucao, String status) {
        this.idEmprestimo = idEmprestimo;
        this.usuarioId = usuarioId;
        this.livroId = livroId;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucao = dataDevolucao;
        this.status = status;
    }
 
    // Getters e Setters
    public int getIdEmprestimo() {
        return idEmprestimo;
    }

    public void setIdEmprestimo(int idEmprestimo) {
        this.idEmprestimo = idEmprestimo;
    }

    public int getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getNomeUsuario() {
        return nomeUsuario;
    }

    public void setNomeUsuario(String nomeUsuario) {
        this.nomeUsuario = nomeUsuario;
    }

    public int getLivroId() {
        return livroId;
    }

    public void setLivroId(int livroId) {
        this.livroId = livroId;
    }

    public String getNomeLivro() {
        return nomeLivro;
    }

    public void setNomeLivro(String nomeLivro) {
        this.nomeLivro = nomeLivro;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public void setDataEmprestimo(LocalDate dataEmprestimo) {
        this.dataEmprestimo = dataEmprestimo;
    }

    public LocalDate getDataDevolucao() {
        return dataDevolucao;
    }

    public void setDataDevolucao(LocalDate dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String toString() {
        return "Emprestimo{" +
                "idEmprestimo=" + idEmprestimo +
                ", usuario=" + usuario +
                ", livro=" + livro +
                ", livroId=" + livroId +
                ", usuarioId=" + usuarioId +
                ", nomeUsuario='" + nomeUsuario + '\'' +
                ", nomeLivro='" + nomeLivro + '\'' +
                ", dataEmprestimo=" + dataEmprestimo +
                ", dataDevolucao=" + dataDevolucao +
                ", status='" + status + '\'' +
                '}';
    }
}
