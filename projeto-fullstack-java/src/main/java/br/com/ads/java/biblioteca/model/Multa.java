package br.com.ads.java.biblioteca.model;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Scanner;

public class Multa {

    private LocalDate emprestimoData;
    private LocalDate dtDevolução;
    private double multaPorDia;
    private int diasDeAtraso;

    public Multa(){}

    public Multa(LocalDate emprestimoData, LocalDate dtDevolução, double multaPorDia, int diasDeAtraso) {
        this.emprestimoData = emprestimoData;
        this.dtDevolução = dtDevolução;
        this.multaPorDia = multaPorDia;
        this.diasDeAtraso = diasDeAtraso;
    }

    public int getdiasDeAtraso() {
        return diasDeAtraso;
    }

    public LocalDate getdtDevolução() {
        return dtDevolução;
    }

    public LocalDate getEmprestimoData() {
        return emprestimoData;
    }
    
    public double getMultaPorDia() {
        return multaPorDia;
    }

    public void setdiasDeAtraso(int diasDeAtraso) {
        this.diasDeAtraso = diasDeAtraso;
    }

    public void setdtDevolução(LocalDate dtDevolução) {
        this.dtDevolução = dtDevolução;
    }

    public void setEmprestimoData(LocalDate emprestimoData) {
        this.emprestimoData = emprestimoData;
    }

    public void setMultaPorDia(double multaPorDia) {
        this.multaPorDia = multaPorDia;
    }


}