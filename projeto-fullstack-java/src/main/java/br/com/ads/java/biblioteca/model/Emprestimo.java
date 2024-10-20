package br.com.ads.java.biblioteca.model;

import java.time.LocalDate;

public class Emprestimo {

    private int idEmprestimo; 
    private Usuario usuario; 
    private Livro livro;      
    private int livroId;     
    private int usuarioId;   
    private LocalDate dataEmprestimo;  
    private LocalDate dataDevolucao;   
    private String status;  

    // pega dados da api idLivro
    
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
    }

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

    public Usuario getUsuario() {  
        return usuario;
    }

    public Livro getLivro() {  
        return livro;
    }

    public int getLivroId() {
        return livroId;
    }

    public void setLivroId(int livroId) {
        this.livroId = livroId;
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

    // idLivro
    public String toString() {
        return "Emprestimo{" +
                "idEmprestimo=" + idEmprestimo +
                ", usuario=" + usuario + 
                ", dataEmprestimo=" + dataEmprestimo +
                ", dataDevolucao=" + dataDevolucao +
                ", status='" + status + '\'' +
                '}';
    }

    // idUsuario
    /*
    public String toStringIdLivro() {
        return "Emprestimo{" +
                "idEmprestimo=" + idEmprestimo +
                ", livro=" + livro + 
                ", dataEmprestimo=" + dataEmprestimo +
                ", dataDevolucao=" + dataDevolucao +
                ", status='" + status + '\'' +
                '}';
    }*/

}
