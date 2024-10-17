// Classe Emprestimo 

import java.time.LocalDate;
import java.util.Scanner;

/**
 * Emprestimo
 */
public class Emprestimo extends Usuario{

    private Livro livro;
    private LocalDate dataEmprestimo;
    private LocalDate dataPrevistaDevolucao;
    private LocalDate dataDevolucao;

    public Emprestimo() {}

    public Emprestimo(String nomeCompleto, String email, int nascimento, String senha,String endereco, Livro livro, LocalDate dataEmprestimo, LocalDate dataPrevistaDevolucao ,LocalDate dataDevolucao ){
        
        super(nomeCompleto, email, nascimento, senha, endereco);
        this.livro = livro;
        this.dataEmprestimo = dataEmprestimo;
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
    }

    public Livro getLivro() {
        return livro;
    }

    public LocalDate getDataPrevistaDevolucao() {
        return dataPrevistaDevolucao;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public LocalDate getDataDevolucao() {
        return dataDevolucao;
    }

    public void setLivro(Livro livro) {
        this.livro = livro;
    }

    public void setDataPrevistaDevolucao(LocalDate dataPrevistaDevolucao) {
        this.dataPrevistaDevolucao = dataPrevistaDevolucao;
    }

    public void setDataEmprestimo(LocalDate dataEmprestimo) {
        this.dataEmprestimo = dataEmprestimo;
    }
    public void setDataDevolucao(LocalDate dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }

}