// Mapeando elementos do HTML
const formLogin = document.getElementById('form-login');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const mensagemErro = document.getElementById('mensagem-erro');

// Interceptando o envio do formulario
formLogin.addEventListener('submit', function(evento) {
    // Previne o recarregamento da pagina sem isso, a pagina pisca e limpa tudo
    evento.preventDefault();

    //Capturando o que o usuario digitou
    const emailDigitado = inputEmail.value;
    const senhaDigitada = inputPassword.value;

    // Logica de validação simulando um banco de dados
    // Aqui estamos definindo que o email correto é "contato@pedro.com" e a senha "1234"
    if (emailDigitado === 'contato@pedro.com' && senhaDigitada === '1234') {
        // Se acertar limpa a mensagem de erro e simula o login
        mensagemErro.classList.remove('mostrar');
        mensagemErro.textContent = '';

        //Aqui redireciona para o meu portfolio por exemplo
        alert('Login efetuado com sucesso!');
    } else {
        // se errar injeta o texto e faz a mensagem aparecer suavemente
        mensagemErro.textContent = 'Email ou senha incorretos. Tente novamente.';
        mensagemErro.classList.add('mostrar');
        // limpa o campo de senha para o usuario tentar novamente UX
        inputPassword.value = '';
        inputPassword.focus(); //cursor piscando novamente no campo da senha
    }
});