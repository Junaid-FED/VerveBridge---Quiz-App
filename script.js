const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "Shark", correct: false},
            {text: "Blue Whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the largest river in the world?",
        answers: [
            {text: "Ganga", correct: false},
            {text: "Amazon", correct: false},
            {text: "Sindhu", correct: false},
            {text: "Nile", correct: true},
        ]
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: [
            {text: "Oxygen", correct: true},
            {text: "Gold", correct: false},
            {text: "Osmium", correct: false},
            {text: "Silver", correct: false},
        ]
    },
    {
        question: "What is the smallest country in the world by land area?",
        answers: [
            {text: "Monaco", correct: false},
            {text: "San Marino", correct: false},
            {text: "Liechtenstein", correct: false},
            {text: "Vatican City", correct: true},
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            {text: "Gold", correct: false},
            {text: "Iron", correct: false},
            {text: "Diamond", correct: true},
            {text: "Platinum", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const modal = document.getElementById("modal");
const startBtn = document.getElementById("start-btn");
const closeBtn = document.querySelector(".close");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer));
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
    });
}

function selectAnswer(button, answer) {
    const isCorrect = answer.correct;
    if (isCorrect) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(btn => {
        if (btn.dataset.correct === "true") {
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });
    nextButton.style.display = "block";
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    nextButton.removeEventListener("click", handleNextButton); 
    nextButton.addEventListener("click", startQuiz); 
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


function showModal() {
    modal.style.display = "block";
}

function hideModal() {
    modal.style.display = "none";
}


startBtn.addEventListener("click", () => {
    hideModal();
    startQuiz();
});

closeBtn.addEventListener("click", hideModal);
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        hideModal();
    }
});


showModal();


nextButton.addEventListener("click", handleNextButton);
