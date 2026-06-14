// Mapeando elementos do HTML
const formLogin = document.getElementById('form-login');
const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const mensagemErro = document.getElementById('mensagem-erro');

// Seleciona o icone bootstrap que ja esta no HTML
const iconeOlho = document.querySelector('#password ~ .bi');
// Transforma o icone em botao clicavel via javaScript
iconeOlho.setAttribute('role', 'button');
iconeOlho.setAttribute('aria-label', 'Mostrar senha');
iconeOlho.style.cursor = 'poiter';
//Alterna entre mostrar e ocultar a senha ao clicar no olho
iconeOlho.addEventListener('click', function() {
    const senhaVisivel = inputPassword.type === 'text';
    if (senhaVisivel) {
        // Oculta a senha novamente
        inputPassword.type = 'password';
        iconeOlho.classList.remove('bi-eye-slash-fill');
        iconeOlho.classList.add('bi-eye-fill');
        iconeOlho.setAttribute('aria-label', 'Mostrar senha');
    } else {
        // Revela a senha
        inputPassword.type = 'text';
        iconeOlho.classList.remove('bi-eye-fill');
        iconeOlho.classList.add('bi-eye-slash-fill');
        iconeOlho.setAttribute('aria-label', 'Ocultar senha');
    }
});

//popup customizado na tela
function mostrarPopup(tipo, mensagem) {
    // Remove qualquer popup anterior que ainda esteja na tela
    const popupExistente = document.querySelector('.popup-overlay');
    if (popupExistente) popupExistente.remove();

    // Montando a estrutura do popup dinamicamente
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';

    const box = document.createElement('div');
    box.className = 'popup-box popup-' + tipo;

    const emoji = document.createElement('span');
    emoji.className = 'popup-emoji';
    emoji.textContent = tipo === 'sucesso' ? '✅' : '🙁';

    const texto = document.createElement('p');
    texto.className = 'popup-mensagem';
    texto.textContent = mensagem;

    const botao = document.createElement('button');
    botao.className = 'popup-btn';
    botao.textContent = tipo === 'sucesso' ? 'Continuar' : 'Tentar novamente';

    box.appendChild(emoji);
    box.appendChild(texto);
    box.appendChild(botao);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    //Pequeno delay para o css de entrada funcionar corretamente
    requestAnimationFrame(() => overlay.classList.add('popup-visivel'));

    //Ao clicar no botao fecha o popup e age conforme o tipo
    botao.addEventListener('click', function(){
        overlay.classList.remove('popup-visivel');
        overlay.addEventListener('transitionend', function() {
            overlay.remove();
            if (tipo == 'sucesso') {
                window.location.href = 'https://portfoliopedroaraujo.netlify.app/';
            }
        });
    }); 
}

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
        mostrarPopup('sucesso', 'Login efetuado com sucesso!');
    } else {
        // se errar injeta o texto e faz a mensagem aparecer suavemente
        mensagemErro.textContent = 'email ou senha incorretos. Tente novamente.';
        mensagemErro.classList.add('mostrar');

        //Exibe o popup de erro
        mostrarPopup('erro', 'Email ou senha incorretos. Verifique seus dados e tente novamente.');

        // limpa o campo de senha para o usuario tentar novamente UX
        inputPassword.value = '';
        inputPassword.focus(); //cursor piscando novamente no campo da senha
    }
});