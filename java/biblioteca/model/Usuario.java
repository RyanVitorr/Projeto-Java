// Classe Usuario 
/**
 * Usuario
 */
import java.util.Scanner;
public class Usuario {
    String Nome_Completo;
    String Email;
    int Nascimento;
    int Senha;

    //Construtor vazio
    public Usuario(){}

    // Construtor que referencia cada variavel
    public Usuario(String Nome_Completo,String Email,int Nascimento,int Senha){
        this.Nome_Completo = Nome_Completo;
        this.Email = Email;
        this.Nascimento = Nascimento;
        this.Senha = Senha;  
    }
    
    // Getters e Setter
   public String getEmail() {
       return Email;
   }
   public int getNascimento() {
       return Nascimento;
   }
   public String getNome_Completo() {
       return Nome_Completo;
   }
   public int getSenha() {
       return Senha;
   }
   public void setEmail(String email) {
       Email = email;
   }
   public void setNascimento(int nascimento) {
       Nascimento = nascimento;
   }
   public void setNome_Completo(String nome_Completo) {
       Nome_Completo = nome_Completo;
   }
   public void setSenha(int senha) {
       Senha = senha;
   }

   public void Cadastro() {
    Scanner scanner = new Scanner(System.in);

        System.out.print("Digite o nome completo: ");
            this.setNome_Completo(scanner.nextLine());

            System.out.print("Digite o email: ");
            this.setEmail(scanner.nextLine());

            System.out.print("Digite o ano de nascimento (ex: 1990): ");
            this.setNascimento(scanner.nextInt());

            System.out.print("Digite a senha numérica: ");
            this.setSenha(scanner.nextInt());


    System.out.println("\nUsuário cadastrado com sucesso!");
    System.out.println("Nome Completo: " + this.getNome_Completo());
    System.out.println("Email: " + this.getEmail());
    System.out.println("Ano de Nascimento: " + this.getNascimento());
    System.out.println("Senha: " + this.getSenha());

}
}

