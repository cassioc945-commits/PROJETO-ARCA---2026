//============================================================================
//    1. CARROSSEL / SLIDER (Protegido contra ausência de elementos)
//============================================================================
(function () {
    const slider = document.querySelectorAll('.slider');
    const btnPrev = document.getElementById('prev-button');
    const btnNext = document.getElementById('next-button');

    let currentSlide = 0;
    let timer;

    if (slider.length > 0 && btnPrev && btnNext) {
        function hideSlider() {
            slider.forEach(item => item.classList.remove('on'));
        }

        function showSlider() {
            if (slider[currentSlide]) {
                slider[currentSlide].classList.add('on');
            }
        }

        function nextSlider() {
            hideSlider();
            currentSlide = (currentSlide === slider.length - 1) ? 0 : currentSlide + 1;
            showSlider();
            resetTimer();
        }

        function prevSlider() {
            hideSlider();
            currentSlide = (currentSlide === 0) ? slider.length - 1 : currentSlide - 1;
            showSlider();
            resetTimer();
        }

        function startTimer() {
            timer = setInterval(nextSlider, 2000);
        }

        function resetTimer() {
            clearInterval(timer);
            startTimer();
        }

        btnNext.addEventListener('click', nextSlider);
        btnPrev.addEventListener('click', prevSlider);

        startTimer();
    }
})();

//============================================================================
// POPUP UNIVERSAL
//============================================================================

(function () {

    const pagina = document.body.dataset.page;

    const btnAbrirModal = document.querySelectorAll(".btnAbrirModal");
    const modal = document.querySelector(".meuModal");
    const telaCarregando = document.querySelector(".telaCarregando");
    const telaSucesso = document.querySelector(".telaSucesso");

    const botoesCancelar = document.querySelectorAll(".btnCancelar");
    const botoesConfirmar = document.querySelectorAll(".btnConfirmar");
    const botoesFecharSucesso = document.querySelectorAll(".btnFecharSucesso");

    if (!modal || !telaCarregando || !telaSucesso) {
        return;
    }

    // ==========================
    // ABRIR MODAL
    // ==========================
    btnAbrirModal.forEach(function (botao) {

        botao.onclick = function (event) {

            event.preventDefault();

            modal.classList.add("mostrar");

        };

    });

    // ==========================
    // CANCELAR
    // ==========================
    botoesCancelar.forEach(function (btn) {

        btn.onclick = function () {

            modal.classList.remove("mostrar");

        };

    });

    // ==========================
    // CONFIRMAR
    // ==========================
    botoesConfirmar.forEach(function (btn) {

        btn.onclick = function () {

            modal.classList.remove("mostrar");

            telaCarregando.classList.add("mostrar");

            setTimeout(function () {

                telaCarregando.classList.remove("mostrar");

                telaSucesso.classList.add("mostrar");

            }, 3000);

        };

    });

    // ==========================
    // CONCLUIR
    // ==========================
    botoesFecharSucesso.forEach(function (btn) {

        btn.onclick = function () {

            if (pagina === "resgate") {

                window.location.href =
                    "./protocolo.html";

            }

            else if (pagina === "adocao") {

                window.location.href =
                    "../../pages/adocao/check.html";

            }

            else if (pagina === "castracao") {

                window.location.href =
                    "../../pages/castracao/check.html";

            }

            else if (pagina === "denuncia") {

                window.location.href =
                    "../../pages/denuncia";

            }

            else {

                telaSucesso.classList.remove("mostrar");

            }

        };

    });

})();
//============================================================================
//    3. HEADER - NAV & DROPDOWNS GERÉRICOS
//============================================================================
function gerenciarMenu(botao, menu, outroMenu) {
    if (botao && menu) {
        botao.addEventListener('click', function (evento) {
            evento.stopPropagation();
            if (outroMenu && outroMenu.classList.contains('active')) {
                outroMenu.classList.remove('active');
            }
            menu.classList.toggle('active');
        });
    }
}

const btnApps = document.querySelector('.menu-lista .dropdown-trigger');
const listaApps = document.querySelector('.menu-lista .dropdown-menu');
const btnPerfil = document.querySelector('.menu-lista-02 .dropdown-trigger');
const listaPerfil = document.querySelector('.menu-lista-02 .dropdown-menu');

gerenciarMenu(btnApps, listaApps, listaPerfil);
gerenciarMenu(btnPerfil, listaPerfil, listaApps);

document.addEventListener('click', function () {
    if (listaApps && listaApps.classList.contains('active')) { listaApps.classList.remove('active'); }
    if (listaPerfil && listaPerfil.classList.contains('active')) { listaPerfil.classList.remove('active'); }
});

// ==========================================================================
//    4. BASE DE DADOS E VALIDAÇÃO DE PERFIS (REQUISITOS DO PROFESSOR)
// ==========================================================================
const USUARIOS_PERFIS = {
    "cassio": {
        senha: "23082007",
        nome: "Cassio Oliveira",
        links: [
            { texto: "👤 Meus Animais", url: "../../pages/user-pages/tutor.html" },
            { texto: "🛠️ Minhas Solicitações", url: "../../pages/user-pages/handout.html" },
            { texto: "📅 Favoritos", url: "../../pages/user-pages/favoritos.html" }
        ]
    },
    "tutor": {
        senha: "123456",
        nome: "Tutor de Animais",
        links: [
            { texto: "👤 Meus Animais", url: "../../pages/user-pages/tutor.html" },
            { texto: "🛠️ Minhas Solicitações", url: "../../pages/user-pages/handout.html" },
            { texto: "📅 Favoritos", url: "../../pages/user-pages/favoritos.html" }
        ]
    },
    "candidato": {
        senha: "cand!098",
        nome: "Candidato a Adotante",
        links: [
            { texto: "🐾 Animais Disponíveis", url: "../../pages/adocao/index.html" },
            { texto: "📝 Formulário de Interesse", url: "../../pages/user-pages/form_savor.html" },
            { texto: "ℹ️ Status do Processo", url: "../../pages/user-pages/processo.html" }
        ]
    },
    "ong": {
        senha: "ong$-135",
        nome: "ONG Parceira",
        links: [
            { texto: "🐾 Cadastrar Animal", url: "../../pages/user-pages/favoritos.html" },
            { texto: "📊 Relatórios de Adoção", url: "../../pages/user-pages/favoritos.html" },
            { texto: "🤝 Solicitar Apoio", url: "../../pages/user-pages/favoritos.html" }
        ]
    },
    "prefeitura": {
        senha: "pref@456",
        nome: "Gestão Prefeitura",
        links: [
            { texto: "📈 Painel de Castrações", url: "../../pages/user-pages/favoritos.html" },
            { texto: "🚨 Gerenciar Denúncias", url: "../../pages/user-pages/favoritos.html" },
            { texto: "🏢 Alocação de Recursos", url: "../../pages/user-pages/favoritos.html" }
        ]
    }
};

// Elementos Globais do Modal de Autenticação
const caixaConteudoPerfil = document.getElementById('conteudo-perfil');
const modalAuth = document.getElementById('modal-auth');
const btnFecharAuth = document.getElementById('btn-fechar-auth');
const tabLogin = document.getElementById('tab-login');
const tabCadastro = document.getElementById('tab-cadastro');
const labelUsuario = document.getElementById('label-usuario');
const inputUsuario = document.getElementById('auth-email');
const btnAuthPrincipal = document.getElementById('btn-auth-principal');
const formAutenticacao = document.getElementById('form-autenticacao');

let modoFormulario = 'login';

if (caixaConteudoPerfil && modalAuth) {

    // --- MUDANÇA AQUI: Verifica se já existe um usuário salvo no sessionStorage ao carregar o arquivo ---
    const usuarioSalvo = sessionStorage.getItem('arca_usuario_ativo');
    if (usuarioSalvo && USUARIOS_PERFIS[usuarioSalvo]) {
        renderizarMenuLogado(usuarioSalvo, USUARIOS_PERFIS[usuarioSalvo]);
        window.usuarioEstaLogado = true;
    } else {
        renderizarMenuDeslogado();
        window.usuarioEstaLogado = false;
    }

    caixaConteudoPerfil.addEventListener('click', function (evento) {
        const target = evento.target;
        const textoClique = target.innerText || '';

        if (target.id === 'btn-entrar' || textoClique.includes('Criar uma Conta') || textoClique.includes('🔑 Entrar / Login')) {
            evento.preventDefault();
            abrirModalAutenticacao(textoClique.includes('Criar uma Conta') ? 'cadastro' : 'login');
        }

        if (target.id === 'btn-sair' || textoClique.includes('Sair do Painel')) {
            evento.preventDefault();

            // --- MUDANÇA AQUI: Limpa a sessão quando o usuário clica em "Sair" ---
            sessionStorage.removeItem('arca_usuario_ativo');

            renderizarMenuDeslogado();
            window.usuarioEstaLogado = false; // Sincroniza com o script de adoção
            alert("Você saiu do painel do projeto Arca.");
        }
    });

    if (btnFecharAuth) {
        btnFecharAuth.onclick = () => fecharModalAutenticacao();
    }

    modalAuth.onclick = (e) => {
        if (e.target === modalAuth) fecharModalAutenticacao();
    };

    if (tabLogin && tabCadastro) {
        tabLogin.onclick = () => mudarModoFormulario('login');
        tabCadastro.onclick = () => mudarModoFormulario('cadastro');
    }

    function abrirModalAutenticacao(modo) {
        modalAuth.style.display = 'flex';
        modalAuth.classList.add('active');
        mudarModoFormulario(modo);
    }

    function fecharModalAutenticacao() {
        modalAuth.style.display = 'none';
        modalAuth.classList.remove('active');
    }

    function mudarModoFormulario(modo) {
        modoFormulario = modo;

        if (inputUsuario) inputUsuario.value = "";
        const inputSenha = document.getElementById('auth-senha');
        if (inputSenha) inputSenha.value = "";

        if (modo === 'login') {
            if (tabLogin) tabLogin.classList.add('active');
            if (tabCadastro) tabCadastro.classList.remove('active');
            if (labelUsuario) labelUsuario.innerText = "Usuário / Perfil";
            if (inputUsuario) inputUsuario.placeholder = "Ex: tutor, candidato, ong...";
            if (btnAuthPrincipal) btnAuthPrincipal.innerText = 'Entrar';
        } else {
            if (tabCadastro) tabCadastro.classList.add('active');
            if (tabLogin) tabLogin.classList.remove('active');
            if (labelUsuario) labelUsuario.innerText = "E-mail para Cadastro";
            if (inputUsuario) inputUsuario.placeholder = "seu@email.com";
            if (btnAuthPrincipal) btnAuthPrincipal.innerText = 'Criar Conta';
        }
    }

    if (formAutenticacao) {
        formAutenticacao.addEventListener('submit', function (e) {
            e.preventDefault();

            const valorUsuario = inputUsuario ? inputUsuario.value.trim() : '';
            const elSenha = document.getElementById('auth-senha');
            const senhaDigitada = elSenha ? elSenha.value : '';

            if (modoFormulario === 'login') {
                const usuarioMinusculo = valorUsuario.toLowerCase();

                if (USUARIOS_PERFIS[usuarioMinusculo]) {
                    const perfil = USUARIOS_PERFIS[usuarioMinusculo];

                    if (perfil.senha === senhaDigitada) {
                        fecharModalAutenticacao();

                        // --- MUDANÇA AQUI: Salva o login efetuado no sessionStorage antes de renderizar ---
                        sessionStorage.setItem('arca_usuario_ativo', usuarioMinusculo);

                        renderizarMenuLogado(usuarioMinusculo, perfil);

                        window.usuarioEstaLogado = true;
                        alert(`Login realizado com sucesso como: ${perfil.nome}!`);

                        document.dispatchEvent(new CustomEvent('loginSucesso'));
                    } else {
                        alert("Senha incorreta para este perfil!");
                    }
                } else {
                    alert("Usuário não encontrado! Para testes escolares, use: tutor, candidato, ong ou prefeitura.");
                }
            } else {
                alert(`O e-mail "${valorUsuario}" foi detectado pelo sistema! Como este site está em ambiente de testes, os perfis já foram pré-configurados. Por favor, utilize a aba "Entrar".`);
                mudarModoFormulario('login');
            }
        });
    }

    const btnGoogle = document.getElementById('btn-login-google');
    if (btnGoogle) {
        btnGoogle.onclick = function () {
            alert("O login via Google está ativo apenas como demonstração de interface. Use os perfis locais na aba 'Entrar'.");
        };
    }

    function renderizarMenuLogado(idUsuario, dadosPerfil) {
        let linksHTML = '';
        dadosPerfil.links.forEach(link => {
            linksHTML += `<li><a href="${link.url}">${link.texto}</a></li>`;
        });

        caixaConteudoPerfil.innerHTML = `
            <div class="user-header">
                <span class="user-name">${dadosPerfil.nome}</span>
                <span class="user-email">Painel Arca: @${idUsuario}</span>
            </div>
            <hr class="divisor">
            <ul class="dropdown-links">
                ${linksHTML}
                <hr class="divisor">
                <li><a href="#" id="btn-sair">Sair do Painel</a></li>
            </ul>
        `;
    }

    function renderizarMenuDeslogado() {
        caixaConteudoPerfil.innerHTML = `
            <ul class="dropdown-links">
                <li><a href="#" id="btn-entrar">🔑 Entrar / Login</a></li>
                <li><a href="#">📝 Criar uma Conta</a></li>
            </ul>
        `;
    }
}

//============================================================================
//    5. RENDERIZAÇÃO DINÂMICA DO PET (PÁGINA DE DETALHES)
//============================================================================
const animais = [
    {
        id: 1,
        nome: "Thor",
        subtitulo: '"Um companheiro cheio de energia, carinho e amor."',
        imagem: "../../public/images/thor-cao.jpg",
        titulo_descricao: "Sobre o Thor",
        descricao: "Thor está procurando um lar cheio de amor e cuidado. Ele ama brincar, correr, explorar novos lugares e receber carinho de toda a família.",
        idade: "2 anos", porte: "Médio", sexo: "Macho", temperamento: "Dócil",
        endereco_retirada: "Rua Maestro Antônio Cícero, 111 – Caçaroca, Serra – ES, CEP 29176-100.",
        data_retirada: "10/08/2026",
        numero_identificacao: "000.000.01"
    },
    {
        id: 2,
        nome: "Bidu",
        subtitulo: '"Um amigo leal e calmo para todas as horas."',
        imagem: "../../public/images/bidu-cao.jpeg",
        titulo_descricao: "Sobre o Bidu",
        descricao: "Bidu ama carinho, passeios ao ar livre e é extremamente companheiro.",
        idade: "3 anos", porte: "Pequeno", sexo: "Macho", temperamento: "Calmo",
        endereco_retirada: "Av. Governador Bley, 230 – Centro, Vitória – ES, CEP 29010-150.",
        data_retirada: "12/08/2026",
        numero_identificacao: "000.000.02"
    },
    {
        id: 3,
        nome: "Luna",
        subtitulo: '"Um companheiro cheio de energia..."',
        imagem: "../../public/images/luna-cao.jpg",
        titulo_descricao: "Sobre a Luna",
        descricao: "Luna está procurando um lar cheio de amor e cuidado.",
        idade: "5 meses", porte: "Médio", sexo: "Fêmea", temperamento: "Dócil",
        endereco_retirada: "Rua Maestro Antônio Cícero, 111 – Caçaroca, Serra – ES, CEP 29176-100.",
        data_retirada: "15/08/2026",
        numero_identificacao: "000.000.03"
    },
    {
        id: 4,
        nome: "Max",
        subtitulo: '"Um amigo leal..."',
        imagem: "../../public/images/max-cao.jpg",
        titulo_descricao: "Sobre o Max",
        descricao: "Max ama carinho, passeios ao ar livre e é extremamente companheiro.",
        idade: "3 anos", porte: "Pequeno", sexo: "Macho", temperamento: "Calmo",
        endereco_retirada: "Av. Governador Bley, 230 – Centro, Vitória – ES, CEP 29010-150.",
        data_retirada: "18/08/2026",
        numero_identificacao: "000.000.04"
    },
    {
        id: 5,
        nome: "Rex",
        subtitulo: '"Um amigo leal..."',
        imagem: "../../public/images/rex-cao.jpg",
        titulo_descricao: "Sobre o Rex",
        descricao: "Rex ama carinho, passeios ao ar livre e é extremamente companheiro.",
        idade: "4 anos", porte: "Pequeno", sexo: "Macho", temperamento: "Calmo",
        endereco_retirada: "Rua Maestro Antônio Cícero, 111 – Caçaroca, Serra – ES, CEP 29176-100.",
        data_retirada: "20/08/2026",
        numero_identificacao: "000.000.05"
    }
];

function pegarId() {
    let parametros = window.location.search;
    let url = new URLSearchParams(parametros);
    let id = url.get("id");

    if (!id) {
        console.warn("Nenhum ID encontrado na URL. Carregando o animal padrão (ID: 1).");
        return 1;
    }

    return parseInt(id, 10);
}

function carregarAnimal() {
    let id = pegarId();
    let animalEncontrado = animais.find(animal => animal.id == id);

    if (!animalEncontrado) {
        console.error(`Animal com o ID ${id} não foi encontrado.`);
        return;
    }

    const elNome = document.querySelector(".js-animal-nome");
    if (elNome) elNome.innerText = animalEncontrado.nome;

    const elImg = document.querySelector(".js-animal-imagem");
    if (elImg) elImg.src = animalEncontrado.imagem;

    const elSubtitulo = document.querySelector(".js-animal-subtitulo");
    if (elSubtitulo) elSubtitulo.innerText = animalEncontrado.subtitulo;

    const elSobreTitulo = document.querySelector(".js-animal-sobre-titulo");
    if (elSobreTitulo) elSobreTitulo.innerText = animalEncontrado.titulo_descricao;

    const elDescricao = document.querySelector(".js-animal-descricao");
    if (elDescricao) elDescricao.innerText = animalEncontrado.descricao;

    const elIdade = document.querySelector(".js-animal-idade");
    if (elIdade) elIdade.innerText = animalEncontrado.idade;

    const elPorte = document.querySelector(".js-animal-porte");
    if (elPorte) elPorte.innerText = animalEncontrado.porte;

    const elSexo = document.querySelector(".js-animal-sexo");
    if (elSexo) elSexo.innerText = animalEncontrado.sexo;

    const elTemperamento = document.querySelector(".js-animal-temperamento");
    if (elTemperamento) elTemperamento.innerText = animalEncontrado.temperamento;

    const elBotaoAdotar = document.querySelector(".js-botao-adotar");
    if (elBotaoAdotar) elBotaoAdotar.innerText = `🐾 Quero Adotar o ${animalEncontrado.nome}`;

    const elConfFoto = document.querySelector(".js-confirmacao-foto");
    if (elConfFoto) elConfFoto.src = animalEncontrado.imagem;

    const elConfNome = document.querySelector(".js-confirmacao-nome");
    if (elConfNome) elConfNome.innerText = animalEncontrado.nome;

    const elConfEndereco = document.querySelector(".js-confirmacao-endereco");
    if (elConfEndereco) elConfEndereco.innerText = animalEncontrado.endereco_retirada;

    const elConfData = document.querySelector(".js-confirmacao-data");
    if (elConfData) elConfData.innerText = animalEncontrado.data_retirada;

    const elConfId = document.querySelector(".js-confirmacao-id");
    if (elConfId) elConfId.innerText = animalEncontrado.numero_identificacao;
}

function voltarPagina() {
    window.history.back();
}

carregarAnimal();

// ==========================================================================
//    6. CONTROLADOR DE AÇÕES DE ADOÇÃO / FAVORITO (BLINDADO)
// ==========================================================================
window.usuarioEstaLogado = sessionStorage.getItem('arca_usuario_ativo') !== null;

document.addEventListener("DOMContentLoaded", function () {
    const btnAdoteAqui = document.getElementById('botao-adotar') || document.querySelector('.js-botao-adotar');
    const btnFavoritar = document.getElementById('botao-favoritar');

    if (btnAdoteAqui) {
        btnAdoteAqui.addEventListener('click', function (evento) {
            evento.preventDefault();
            evento.stopPropagation();

            // Atualiza o ID na memória no exato momento do clique
            let idDetectado = pegarId();
            if (idDetectado) {
                localStorage.setItem('arca_id_animal_ativo', idDetectado);
                console.log("ID atualizado no clique de adoção:", idDetectado);
            }

            verificarEExecutarPet('adotar');
        });
    }

    if (btnFavoritar) {
        btnFavoritar.addEventListener('click', function (evento) {
            evento.preventDefault();
            evento.stopPropagation();
            verificarEExecutarPet('favoritar');
        });
    }

    function verificarEExecutarPet(acao) {
        window.usuarioEstaLogado = sessionStorage.getItem('arca_usuario_ativo') !== null;

        if (window.usuarioEstaLogado === true) {
            executarAcaoFinal(acao); // <-- Chamada corrigida
        } else {
            acaoPendente = acao;

            if (typeof abrirModalAutenticacao === "function") {
                abrirModalAutenticacao('login');
            } else {
                const modalAlvo = document.getElementById('modal-auth');
                if (modalAlvo) {
                    modalAlvo.style.display = 'flex';
                    modalAlvo.classList.add('active');
                }
            }
        }
    }
});

// CORREÇÃO DA LETRA: Mudado de "ejecutar..." para "executar..." para bater com o resto do script!
function executarAcaoFinal(acao) {
    if (acao === 'adotar') {
        window.location.href = "../adocao/registrar.html";
    } else if (acao === 'favoritar') {
        alert("Animal adicionado aos seus favoritos com sucesso!");
    }
}
//============================================================================
//    7. TELA DE STATUS, CHECK & SORTEIO DE VALIDAÇÃO
//============================================================================
window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);

    const body = document.getElementById('telaStatus');
    const message = document.getElementById('mensagem');
    const botaoAcao = document.getElementById('botaoAcao');

    // Recupera o ID do bicho clicado que deixamos guardado na memória
    let idSalvo = localStorage.getItem('arca_id_animal_ativo');
    if (!idSalvo) {
        idSalvo = 1; // Padrão de segurança caso não ache nada
    }

    // --- CORREÇÃO PARA A TELA DE CHECK (A tela do botão verde) ---
    // Procura o botão verde "VERIFICAR APROVAÇÃO" na tela atual
    const btnVerificarAprovacao = document.getElementById('botaoAcaoStatus') || document.querySelector('a[href*="action=sorteio"]') || document.getElementById('verificar-aprovacao');

    // Se encontrar o botão verde na página, força ele a levar a ação de sorteio junto com o ID salvo
    if (btnVerificarAprovacao) {
        btnVerificarAprovacao.onclick = function (e) {
            e.preventDefault();
            // Redireciona para a página de status passando a ação de sorteio E o ID correto do animal
            window.location.href = `status.html?action=sorteio&id=${idSalvo}`;
        };
    }
    // Uma segunda tentativa caso o botão verde seja um link simples (com a classe ou ID do seu projeto)
    const btnVerificarGenerico = document.querySelector('.btn-enviar, .verificar-btn, button, a');
    if (btnVerificarGenerico && btnVerificarGenerico.textContent.includes('VERIFICAR APROVAÇÃO')) {
        btnVerificarGenerico.onclick = function (e) {
            e.preventDefault();
            window.location.href = `status.html?action=sorteio&id=${idSalvo}`;
        };
    }


    // --- CÓDIGO DO SORTEIO (Roda apenas quando a URL tiver "?action=sorteio") ---
    if (params.get('action') === 'sorteio') {
        if (!body || !message || !botaoAcao) return;

        const sorteio = Math.random();

        if (sorteio < 0.5) {
            body.className = "approved";
            message.textContent = "Solicitação de aprovada";
            botaoAcao.textContent = "Local de retirada";

            // Injeta o ID recuperado da memória no link do botão final
            botaoAcao.href = `../../pages/adocao/confirm.html?id=${idSalvo}`;
        } else {
            body.className = "rejected";
            message.textContent = "Solicitação rejeitada.";
            botaoAcao.textContent = "Tentar Recadastro.";
            botaoAcao.href = "javascript:window.history.back()";
        }
    } else {
        // Se entrou na página de status sem o parâmetro de sorteio, ignora
        if (!body && !message && !botaoAcao) {
            return;
        }
        if (window.history && window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "index.html";
        }
    }
});








const etapa1 = document.getElementById("etapa1");
const etapa2 = document.getElementById("etapa2");
const txtEtapa = document.getElementById("txt-etapa");

function proximaEtapa() {
    etapa1.classList.add("oculto");
    etapa2.classList.remove("oculto");

    txtEtapa.textContent = "Etapa 2";
}

function voltarEtapa() {
    etapa2.classList.add("oculto");
    etapa1.classList.remove("oculto");

    txtEtapa.textContent = "Etapa 1";
}