package br.com.ads.java.biblioteca.controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pagamentoConfirm")
public class PagamentoConfirmController  {

    @PostMapping
    public String confirmPagamento(@RequestBody String paymentId) {
        return "Pagamento confirmado com sucesso!";
    }
}
