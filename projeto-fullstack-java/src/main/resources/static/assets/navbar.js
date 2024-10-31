$(document).ready(function() {
    // Ao clicar no menu hamburguer
    $('#menuBurger').on('click', function() {
        // Alterna a classe 'collapsed' na navbar e no conteúdo
        $('#navbar').toggleClass('collapsed');
        $('.main-content').toggleClass('collapsed');
        $('#menuBurger').toggleClass('collapsed');
        $('#img').toggleClass('collapsed');
    });
});
