package br.com.ads.java.biblioteca.model;
import br.com.ads.java.biblioteca.model.Emprestimo;
import java.time.LocalDate;

public class Multa {
    
    private Emprestimo emprestimo;
    private String dataDevolucao;
    private String dataAluguel;
    private int idEmprestimo;
    private float preco;



    public Multa(String dataDevolucao, String dataAluguel, int idEmprestimo, float preco,
        String dataAtual) {
        this.emprestimo = emprestimo;
        this.dataDevolucao = dataDevolucao;
        this.dataAluguel = dataAluguel;
        this.idEmprestimo = idEmprestimo;
        this.preco = preco;
        this.dataAtual = dataAtual;
    }


    private String dataAtual;


    public void setEmprestimo(Emprestimo emprestimo) {
        this.emprestimo = emprestimo;
    }


    public void setDataDevolucao(String dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }


    public void setDataAluguel(String dataAluguel) {
        this.dataAluguel = dataAluguel;
    }


    public void setIdEmprestimo(int idEmprestimo) {
        this.idEmprestimo = idEmprestimo;
    }


    public void setPreco(float preco) {
        this.preco = preco;
    }


    public void setDataAtual(String dataAtual) {
        this.dataAtual = dataAtual;
    }


    public Emprestimo getEmprestimo() {
        return emprestimo;
    }


    public String getDataDevolucao() {
        return dataDevolucao;
    }


    public String getDataAluguel() {
        return dataAluguel;
    }


    public float getPreco() {
        return preco;
    }


    public String getDataAtual() {
        return dataAtual;
    }
}