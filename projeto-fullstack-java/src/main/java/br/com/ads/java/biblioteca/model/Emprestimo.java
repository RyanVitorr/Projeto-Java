package br.com.ads.java.biblioteca.model;
import java.time.LocalDate;

public class Emprestimo {
    private int idEmprestimo; 
    private Usuario usuario; 
    private Livro livro;      
    private int livroId;     
    private int usuarioId;   
    private LocalDate dataEmprestimo;  
    private LocalDate dataPrevDevolucao;   
    private int totalLivros;
    private int livrosAtrasados;
    private int totaLivrosAlugados;
    private LocalDate dataDevolucao;

    // pega dados da api idLivro
    public Emprestimo(int idEmprestimo, Usuario usuario, LocalDate dataEmprestimo, LocalDate dataPrevDevolucao, LocalDate dataDevolucao) {
        this.idEmprestimo = idEmprestimo;
        this.usuario = usuario;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevDevolucao = dataPrevDevolucao;

        this.dataDevolucao = dataDevolucao;
    }

    
    // pega dados da api idUsuario
    public Emprestimo(int idEmprestimo, Livro livro, LocalDate dataEmprestimo, LocalDate dataPrevDevolucao, LocalDate dataDevolucao) {
        this.idEmprestimo = idEmprestimo;
        this.livro = livro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevDevolucao = dataPrevDevolucao;

        this.dataDevolucao = dataDevolucao;
    }

    // todos os daddos emprestimo/usuario/livro
    public Emprestimo(int idEmprestimo, Usuario usuario, Livro livro, LocalDate dataEmprestimo, LocalDate dataPrevDevolucao, LocalDate dataDevolucao, int totalLivros, int livrosAtrasados, int totaLivrosAlugados) {
        this.idEmprestimo = idEmprestimo;
        this.usuario = usuario;
        this.livro = livro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevDevolucao = dataPrevDevolucao;

        this.totalLivros = totalLivros;
        this.livrosAtrasados = livrosAtrasados;
        this.totaLivrosAlugados = totaLivrosAlugados;
        this.dataDevolucao = dataDevolucao;
    }


    // todo emprestimo
    public Emprestimo(int idEmprestimo, int usuarioId, int livroId, LocalDate dataEmprestimo, LocalDate dataPrevDevolucao, LocalDate dataDevolucao) {
        this.usuarioId = usuarioId;
        this.livroId = livroId;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevDevolucao = dataPrevDevolucao;
        this.dataDevolucao = dataDevolucao;
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

    public void setTotalLivros(int totalLivros) {
        this.totalLivros = totalLivros;
    }


    public void setLivrosAtrasados(int livrosAtrasados) {
        this.livrosAtrasados = livrosAtrasados;
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

    public int getTotalLivros() {
        return totalLivros;
    }


    public int getLivrosAtrasados() {
        return livrosAtrasados;
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

    public int getTotaLivrosAlugados() {
        return totaLivrosAlugados;
    }

    public void setTotaLivrosAlugados(int totaLivrosAlugados) {
        this.totaLivrosAlugados = totaLivrosAlugados;
    }

    public LocalDate getDataPrevDevolucao() {
        return dataPrevDevolucao;
    }

    public void setDataDevolucao(LocalDate dataPrevDevolucao) {
        this.dataPrevDevolucao = dataPrevDevolucao;
    }
    
    public LocalDate getDataDevolucao() {
        return dataDevolucao;
    }

    @Override
    public String toString() {
        return "Emprestimo{" +
                "idEmprestimo=" + idEmprestimo +
                ", usuario=" + usuario +
                ", livro=" + livro +
                ", dataEmprestimo=" + dataEmprestimo +
                ", dataDevolucao=" + dataPrevDevolucao +
                ", dataPrevDevolucao=" + dataPrevDevolucao +
                ", total_livros=" + totalLivros +
                ", livros_atrasados=" + livrosAtrasados +  
                ", total_livros_alugados=" + totaLivrosAlugados +
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
                '}';
    }*/


    

}
