package br.com.ads.java.biblioteca.model;
import java.time.LocalDate;

public class Emprestimo {
    private int idEmprestimo; 
    private int livroId;     
    private int usuarioId;   
    private LocalDate dataEmprestimo;  
    private LocalDate dataPrevDevolucao;   
    private int totalLivros;
    private int livrosAtrasados;
    private int totaLivrosAlugados;
    private float preco;
    private LocalDate dataDevolucao;
    private int quantidade;
    private float lucroTotal;
    private float valorMulta;

    private Usuario usuario; 
    private Livro livro;     
    private Multa multa; 

    
    // dados historico emprestimo
    public Emprestimo(int idEmprestimo, Usuario usuario, Livro livro, float preco, LocalDate dataEmprestimo, LocalDate dataPrevDevolucao, LocalDate dataDevolucao, int quantidade, float valorMulta) {
        this.idEmprestimo = idEmprestimo;
        this.usuario = usuario;
        this.livro = livro;
        this.preco = preco;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevDevolucao = dataPrevDevolucao;
        this.dataDevolucao = dataDevolucao;
        this.quantidade = quantidade;
        this.valorMulta = valorMulta;
    }

    // dados api idlivro
    public Emprestimo(int idEmprestimo, Usuario usuario, float preco, LocalDate dataEmprestimo, LocalDate dataPrevDevolucao, LocalDate dataDevolucao, int quantidade) {
        this.idEmprestimo = idEmprestimo;
        this.usuario = usuario;
        this.preco = preco;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevDevolucao = dataPrevDevolucao;
        this.dataDevolucao = dataDevolucao;
        this.quantidade = quantidade;
    }

      // dados api idusuario
      public Emprestimo(int idEmprestimo, Livro livro, float preco, LocalDate dataEmprestimo, LocalDate dataPrevDevolucao, LocalDate dataDevolucao, int quantidade) {
        this.idEmprestimo = idEmprestimo;
        this.livro = livro;
        this.preco = preco;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevDevolucao = dataPrevDevolucao;
        this.dataDevolucao = dataDevolucao;
        this.quantidade = quantidade;
    }



    // dados dashboard
    public Emprestimo(int totalLivros, int livrosAtrasados, int totaLivrosAlugados, float lucroTotal) {
        this.totalLivros = totalLivros;
        this.livrosAtrasados = livrosAtrasados;
        this.totaLivrosAlugados = totaLivrosAlugados;
        this.lucroTotal = lucroTotal;
    }


    // todo emprestimo
    public Emprestimo(int idEmprestimo, int usuarioId, int livroId, LocalDate dataEmprestimo, LocalDate dataPrevDevolucao, LocalDate dataDevolucao) {
        this.usuarioId = usuarioId;
        this.livroId = livroId;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevDevolucao = dataPrevDevolucao;
        this.dataDevolucao = dataDevolucao;
    }
 
    // Getters
  
    public int getIdEmprestimo() {
        return idEmprestimo;
    }


    public float getValorMulta(){
        return valorMulta;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Livro getLivro() {
        return livro;
    }

    public float getLucroTotal(){
        return lucroTotal;
    }

    public int getLivroId() {
        return livroId;
    }

    public int getUsuarioId() {
        return usuarioId;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public LocalDate getDataPrevDevolucao() {
        return dataPrevDevolucao;
    }

    public int getTotalLivros() {
        return totalLivros;
    }

    public int getLivrosAtrasados() {
        return livrosAtrasados;
    }

    public int getTotaLivrosAlugados() {
        return totaLivrosAlugados;
    }

    public float getPreco() {
        return preco;
    }

    public LocalDate getDataDevolucao() {
        return dataDevolucao;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public Multa getMulta(){
        return multa;
    }

    // setters

    public void setValorMulta(float valorMulta){
        this.valorMulta = valorMulta;
    }

    public void setIdEmprestimo(int idEmprestimo) {
        this.idEmprestimo = idEmprestimo;
    }

    public void setLucroTotal(float lucroTotal){
        this.lucroTotal = lucroTotal;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setLivro(Livro livro) {
        this.livro = livro;
    }

    public void setLivroId(int livroId) {
        this.livroId = livroId;
    }

    public void setUsuarioId(int usuarioId) {
        this.usuarioId = usuarioId;
    }

    public void setDataEmprestimo(LocalDate dataEmprestimo) {
        this.dataEmprestimo = dataEmprestimo;
    }

    public void setDataPrevDevolucao(LocalDate dataPrevDevolucao) {
        this.dataPrevDevolucao = dataPrevDevolucao;
    }

    public void setTotalLivros(int totalLivros) {
        this.totalLivros = totalLivros;
    }

    public void setLivrosAtrasados(int livrosAtrasados) {
        this.livrosAtrasados = livrosAtrasados;
    }

    public void setTotaLivrosAlugados(int totaLivrosAlugados) {
        this.totaLivrosAlugados = totaLivrosAlugados;
    }

    public void setPreco(float preco) {
        this.preco = preco;
    }

    public void setDataDevolucao(LocalDate dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }

    public void setMulta(Multa multa){
        this.multa = multa;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }
    
    @Override
    public String toString() {
        return "Emprestimo [idEmprestimo=" + idEmprestimo + ", usuario=" + usuario + ", livro=" + livro + ", multa=" + multa + ", livroId="
                + livroId + ", usuarioId=" + usuarioId + ", dataEmprestimo=" + dataEmprestimo + ", dataPrevDevolucao="
                + dataPrevDevolucao + ", totalLivros=" + totalLivros + ", livrosAtrasados=" + livrosAtrasados
                + ", totaLivrosAlugados=" + totaLivrosAlugados + ", preco=" + preco + ", dataDevolucao=" + dataDevolucao
                + ", quantidade=" + quantidade + ", lucroTotal=" + lucroTotal + "]";
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
