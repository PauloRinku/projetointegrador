// ============================================
// LEIGOSCOOKIE · BANCO DE DADOS MOCKADO
// ============================================

const glossario = {
    "uma pitada": {
        termo: "Uma Pitada",
        explicacao: "Pegue sal (ou tempero) com as pontas de TRÊS dedos (polegar, indicador e médio). A quantidade que grudar é uma pitada. NÃO é um punhado.",
        imagem: "assets/gifs/pitada.gif",
        nivelDificuldade: "Básico"
    },
    "refogar": {
        termo: "Refogar",
        explicacao: "Coloque um fio de óleo ou manteiga na panela quente. Jogue cebola picada (ou alho). Mexa até ficar transparente e cheirosa. Isso é refogar. É a base de tudo.",
        imagem: "assets/gifs/refogar.gif",
        nivelDificuldade: "Básico"
    },
    "fogo baixo": {
        termo: "Fogo Baixo",
        explicacao: "É a menor chama do seu fogão. Se for elétrico, é a temperatura mais baixa. Serve para não queimar comida enquanto você se distrai.",
        imagem: null,
        nivelDificuldade: "Básico"
    },
    "ponto de fio": {
        termo: "Ponto de Fio",
        explicacao: "Quando você levanta a colher e o líquido cai formando um 'fio' contínuo, como um fio de mel. Ignore se for doce de leite ou brigadeiro; para o leigo, se engrossou, já era.",
        imagem: null,
        nivelDificuldade: "Intermediário"
    },
    "al dente": {
        termo: "Al Dente",
        explicacao: "Macarrão cozido por fora, mas ainda firme por dentro. Morda um fio: se estiver duro no meio, tá al dente. Se estiver mole, virou papa.",
        imagem: null,
        nivelDificuldade: "Básico"
    }
};

const receitas = [
    {
        id: 1,
        nome: "Macarrão Alho e Óleo de Verdade (Sem Erro)",
        descricao: "O clássico que salva vidas. 4 ingredientes. Uma panela. 10 minutos.",
        categoria: ["5ingredientes", "panelaunica", "impossivelerrar"],
        dificuldade: "Sobrevivente",
        tempoPreparo: 10,
        rendimento: "2 pratos",
        ingredientes: [
            { nome: "Macarrão Espaguete", quantidade: "250g (meio pacote)", check: false },
            { nome: "Alho", quantidade: "4 dentes", check: false },
            { nome: "Azeite ou Óleo", quantidade: "4 colheres de sopa", check: false },
            { nome: "Sal", quantidade: "1 colher de sopa (para água)", check: false }
        ],
        passos: [
            { 
                ordem: 1, 
                texto: "Encha uma panela grande com água e leve ao fogo ALTO.", 
                timer: 0,
                dica: "Coloque água até a metade da panela. Menos que isso, o macarrão fica grudento.",
                check: false
            },
            { 
                ordem: 2, 
                texto: "Quando ferver (fizer bolhas), adicione o sal e o macarrão.", 
                timer: 0,
                dica: "Cuidado com o vapor! Jogue o macarrão de lado para não espirrar água quente.",
                check: false
            },
            { 
                ordem: 3, 
                texto: "Cozinhe pelo tempo da embalagem (geralmente 8 minutos). MEXA de vez em quando.", 
                timer: 480,
                dica: "Prove um fio aos 7 minutos. Se estiver al dente (firme), pode escorrer.",
                check: false
            },
            { 
                ordem: 4, 
                texto: "Enquanto o macarrão cozinha, DESCASCUE e PIQUE o alho em pedacinhos pequenos.", 
                timer: 0,
                dica: "Use a lateral da faca para amassar o alho primeiro. A casca sai sozinha.",
                check: false
            },
            { 
                ordem: 5, 
                texto: "Em uma frigideira ou panela separada (ou na mesma depois de escorrer), coloque o azeite e o alho picado.", 
                timer: 0,
                dica: "Fogo BAIXO nessa etapa. Alho queima rápido e fica amargo.",
                check: false
            },
            { 
                ordem: 6, 
                texto: "Ligue o fogo BAIXO e mexa o alho até dourar LEVEMENTE (fica cheiroso).", 
                timer: 120,
                dica: "Assim que começar a dourar, desligue o fogo. O calor residual termina o serviço.",
                check: false
            },
            { 
                ordem: 7, 
                texto: "Escorra o macarrão e jogue na frigideira com o alho e óleo. Misture bem.", 
                timer: 0,
                dica: "Guarde um pouquinho da água do cozimento. Se ficar seco, adicione uma colher.",
                check: false
            }
        ]
    },
    {
        id: 2,
        nome: "Ovo Frito Perfeito (Sem Estourar a Gema)",
        descricao: "Gema mole, clara crocante. O básico que ninguém ensina.",
        categoria: ["5ingredientes", "impossivelerrar"],
        dificuldade: "Iniciante",
        tempoPreparo: 5,
        rendimento: "1 ovo",
        ingredientes: [
            { nome: "Ovo", quantidade: "1 unidade (fresco de preferência)", check: false },
            { nome: "Óleo ou Manteiga", quantidade: "1 colher de sopa", check: false },
            { nome: "Sal", quantidade: "Uma pitada", check: false }
        ],
        passos: [
            { ordem: 1, texto: "Quebre o ovo em uma tigela separada primeiro.", timer: 0, dica: "Isso evita cascas na frigideira e estouro da gema.", check: false },
            { ordem: 2, texto: "Aqueça a frigideira em fogo MÉDIO com o óleo/manteiga.", timer: 60, dica: "Não deixe a manteiga queimar e ficar marrom.", check: false },
            { ordem: 3, texto: "Despeje o ovo da tigela na frigideira com cuidado.", timer: 0, dica: "Abaixe a tigela perto da frigideira para não espirrar.", check: false },
            { ordem: 4, texto: "Tempere com sal. Abaixe o fogo para BAIXO.", timer: 180, dica: "Tampe a frigideira se quiser a gema cozida por cima também.", check: false },
            { ordem: 5, texto: "Retire quando a clara estiver branca e firme.", timer: 0, dica: "Use uma espátula. Sirva imediatamente.", check: false }
        ]
    },
    {
        id: 3,
        nome: "Panqueca Americana de Liquidificador",
        descricao: "Massa infalível. Fofinha. Café da manhã de rei.",
        categoria: ["5ingredientes", "impossivelerrar"],
        dificuldade: "Sobrevivente",
        tempoPreparo: 15,
        rendimento: "6 panquecas",
        ingredientes: [
            { nome: "Farinha de Trigo", quantidade: "1 xícara (de chá)", check: false },
            { nome: "Leite", quantidade: "1 xícara (de chá)", check: false },
            { nome: "Ovo", quantidade: "1 unidade", check: false },
            { nome: "Açúcar", quantidade: "2 colheres de sopa", check: false },
            { nome: "Fermento em Pó", quantidade: "1 colher de sopa", check: false },
            { nome: "Sal", quantidade: "Uma pitada", check: false }
        ],
        passos: [
            { ordem: 1, texto: "Bata TUDO no liquidificador (exceto o fermento).", timer: 0, dica: "Ordem: líquidos primeiro (leite, ovo), depois secos.", check: false },
            { ordem: 2, texto: "Adicione o fermento por último e bata SÓ PARA MISTURAR (5 segundos).", timer: 0, dica: "Se bater demais o fermento, a panqueca não cresce.", check: false },
            { ordem: 3, texto: "Aqueça uma frigideira antiaderente em fogo MÉDIO.", timer: 60, dica: "Não precisa untar se a frigideira for boa.", check: false },
            { ordem: 4, texto: "Despeje uma concha pequena de massa no centro.", timer: 0, dica: "Ela vai se espalhar sozinha.", check: false },
            { ordem: 5, texto: "Espere formar bolhas na superfície. VIRE.", timer: 90, dica: "Quando as bordas parecerem secas, está na hora de virar.", check: false },
            { ordem: 6, texto: "Deixe dourar o outro lado por 1 minuto. Repita até acabar a massa.", timer: 60, dica: "Mantenha as prontas em um prato com pano de prato por cima para não esfriar.", check: false }
        ]
    }
];

const primeirosSocorros = [
    {
        problema: "Comida Salgada Demais",
        solucao: "Adicione uma batata crua descascada e cortada ao meio na panela. Deixe cozinhar por 10 minutos. A batata suga o excesso de sal. Retire a batata antes de servir. Alternativa: Adicione um pouco de açúcar ou limão para neutralizar.",
        gravidade: "Média"
    },
    {
        problema: "Arroz Queimado no Fundo",
        solucao: "NÃO RASPE O FUNDO. Retire com cuidado o arroz de cima que não queimou e coloque em outra vasilha. Coloque uma cebola crua cortada ao meio sobre o arroz, tampe e espere 5 minutos. A cebola absorve o cheiro de queimado.",
        gravidade: "Alta"
    },
    {
        problema: "Comida Sem Gosto",
        solucao: "Falta de sal ou acidez. Adicione sal aos poucos, provando. Se mesmo assim estiver 'apagado', adicione umas gotas de limão ou vinagre. O ácido 'acorda' o sabor da comida. Um tablete de caldo de galinha também resolve na emergência.",
        gravidade: "Baixa"
    },
    {
        problema: "Molho Ralo / Água",
        solucao: "Misture 1 colher de chá de amido de milho (maizena) em 2 colheres de sopa de água FRIA. Despeje no molho fervendo mexendo sem parar. Em 30 segundos engrossa.",
        gravidade: "Baixa"
    }
];

// Dados de técnicas visuais
const tecnicasVisuais = [
    {
        nome: "Como Picar Cebola Sem Chorar",
        gif: "assets/gifs/picar-cebola.gif",
        passos: [
            "Corte a cebola ao meio.",
            "Deixe a raiz intacta (ela segura a cebola).",
            "Faça cortes horizontais e verticais sem chegar na raiz.",
            "Corte perpendicular para fazer cubinhos."
        ],
        dicaAntiChoro: "Mastigue um chiclete de menta ou deixe a cebola 15 min na geladeira."
    },
    {
        nome: "Como Segurar a Faca (Sem Perder o Dedo)",
        gif: "assets/gifs/segurar-faca.gif",
        passos: [
            "Polegar e indicador seguram a LÂMINA (perto do cabo).",
            "Os outros 3 dedos envolvem o cabo.",
            "A mão que segura o alimento deve ficar em 'garra' (dedos dobrados para dentro)."
        ],
        dicaAntiChoro: null
    }
];

// Salvar no localStorage
function salvarProgresso() {
    localStorage.setItem('leigosCookie_receitas', JSON.stringify(receitas));
    localStorage.setItem('leigosCookie_historico', JSON) 
 }