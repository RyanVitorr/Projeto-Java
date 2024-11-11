package br.com.ads.java.biblioteca.controller;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;


@RestController
@RequestMapping("/gerar-qrcode")
public class PagamentoController {

    @GetMapping
    @ResponseBody
    public void geraQrcode(HttpServletResponse response) throws IOException, WriterException {
        String pixCode = "https://exemplo.com/pix-payment";

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(pixCode, BarcodeFormat.QR_CODE, 250, 250);

        response.setContentType("image/png");
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", response.getOutputStream());
    }
}
