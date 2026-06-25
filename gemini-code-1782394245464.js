// Dados do Quiz (Perguntas curtas e diretas)
const quizData = [
    {
        question: "1. Um amigo deixou o Instagram aberto no seu PC. O que é ético fazer?",
        options: [
            "Postar uma zoeira no perfil dele.",
            "Olhar os directs dele em segredo.",
            "Deslogar a conta dele imediatamente e avisá-lo."
        ],
        correct: 2
    },
    {
        question: "2. Você recebeu um link dizendo que há um vazamento de fotos de alguém da escola. E aí?",
        options: [
            "Não clico, não espalho e aviso que isso é crime.",
            "Abro para ver se é verdade e depois decido.",
            "Passo adiante no grupo dos amigos mais íntimos."
        ],
        correct: 0
    },
    {
        question: "3. Comentar xingamentos ou 'cancelar' alguém de forma agressiva nos comentários é:",
        options: [
            "Apenas liberdade de expressão.",
            "Cyberbullying, e pode machucar de verdade o outro.",
            "De boa, todo mundo faz isso na internet."
        ],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;

// Elementos do DOM
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const questionContainer = document.getElementById("question-container");
const scoreContainer = document.getElementById("score-container");
const finalScoreText = document.getElementById("final-score");
const usernameInput = document.getElementById("username");
const saveScoreBtn = document.getElementById("save-score-btn");
const rankingBody = document.getElementById("ranking-body");
const counterVal = document.getElementById("counter-val");

// Inicializador
document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
    loadRanking();
    setupCounter();
});

// Contador de visitas simulado de forma dinâmica
function setupCounter() {
    let visits = localStorage.getItem("visit_count") || 1337;
    visits = parseInt(visits) + 1;
    localStorage.setItem("visit_count", visits);
    counterVal.innerText = visits;
}

// Carrega a pergunta do Quiz
function loadQuestion() {
    if (currentQuestion < quizData.length) {
        const currentData = quizData[currentQuestion];
        questionText.innerText = currentData.question;
        optionsContainer.innerHTML = "";

        currentData.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.classList.add("option-btn");
            button.innerText = option;
            button.onclick = () => checkAnswer(index);
            optionsContainer.appendChild(button);
        });
    } else {
        showScore();
    }
}

// Valida a resposta
function checkAnswer(selectedIndex) {
    if (selectedIndex === quizData[currentQuestion].correct) {
        score++;
    }
    currentQuestion++;
    loadQuestion();
}

// Mostra a tela de fim de jogo
function showScore() {
    questionContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    finalScoreText.innerText = score;
}

// Salva pontuação no Ranking (Local Storage)
saveScoreBtn.onclick = () => {
    const name = usernameInput.value.trim();
    if (name === "") {
        alert("Digita um nickname válido aí!");
        return;
    }

    const ranking = JSON.parse(localStorage.getItem("ethics_ranking")) || [
        { name: "CyberNinja", score: 3 },
        { name: "Anti_Fake", score: 2 },
        { name: "EthicPlayer", score: 1 }
    ];

    ranking.push({ name: name, score: score });
    // Ordena do maior score para o menor
    ranking.sort((a, b) => b.score - a.score);
    
    // Guarda apenas o top 5
    localStorage.setItem("ethics_ranking", JSON.stringify(ranking.slice(0, 5)));
    
    // Reseta tela do quiz e recarrega ranking
    usernameInput.value = "";
    scoreContainer.classList.add("hide");
    questionContainer.classList.remove("hide");
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    loadRanking();
};

// Exibe o ranking na tabela
function loadRanking() {
    const ranking = JSON.parse(localStorage.getItem("ethics_ranking")) || [
        { name: "CyberNinja", score: 3 },
        { name: "Anti_Fake", score: 2 },
        { name: "EthicPlayer", score: 1 }
    ];

    rankingBody.innerHTML = "";
    ranking.forEach((player, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>#${index + 1}</td>
            <td>${player.name}</td>
            <td><strong>${player.score}</strong></td>
        `;
        rankingBody.appendChild(row);
    });
}