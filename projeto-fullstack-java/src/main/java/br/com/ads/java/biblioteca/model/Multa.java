package br.com.ads.java.biblioteca.model;
import java.sql.Date;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

public class Multa {
   

    private Date dataDevolucao;
    private Date dataPrevDevolucao;

    private float valorDia = 1.00f;
    private float valorMulta;
    private float valorTotalMulta;



    public Multa(){}

    // getters

    public Date getDataDevolucao() {
        return dataDevolucao;
    }

    public Date getDataPrevDevolucao() {
        return dataPrevDevolucao;
    }

    public float getValorDia() {
        return valorDia;
    }

    public float getValorMulta() {
        return valorMulta;
    }

    public float getValorTotalMulta() {
        return valorTotalMulta;
    }

    // setters

    public void setDataDevolucao(Date dataDevolucao) {
        this.dataDevolucao = dataDevolucao;
    }

    public void setDataPrevDevolucao(Date dataPrevDevolucao) {
        this.dataPrevDevolucao = dataPrevDevolucao;
    }

    public void setValorDia(float valorDia) {
        this.valorDia = valorDia;
    }

    public void setValorMulta(float valorMulta) {
        this.valorMulta = valorMulta;
    }

    public void setValorTotalMulta(float valorTotalMulta) {
        this.valorTotalMulta = valorTotalMulta;
    }


    public float calcularValorMulta() {
        if (dataDevolucao != null) {
            LocalDate dataPrev = dataPrevDevolucao.toLocalDate();
            LocalDate dataDev = dataDevolucao.toLocalDate();

            long diasAtraso = ChronoUnit.DAYS.between(dataPrev, dataDev);

            if (diasAtraso > 0) {
                return diasAtraso * valorDia; 
            }


        }else {
            LocalDate dataAtual = LocalDate.now();
            LocalDate dataPrev = dataPrevDevolucao.toLocalDate();

            long diasAtraso = ChronoUnit.DAYS.between(dataPrev, dataAtual); 

            if (diasAtraso > 0) {
                return diasAtraso * valorDia; 
            }

        }
        return 0.0f;
    }

    @Override
    public String toString() {
        return "Multa [dataDevolucao=" + dataDevolucao + ", dataPrevDevolucao=" + dataPrevDevolucao + ", valorDia="
                + valorDia + ", valorMulta=" + valorMulta + ", valorTotalMulta=" + valorTotalMulta + "]";
    }

}