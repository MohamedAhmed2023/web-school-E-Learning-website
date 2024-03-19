const questions = [
    {
        question: "How many sizes of headers are available in HTML by default?",
        answers: [
            { text: "1", correct: false },
            { text: "6", correct: true },
            { text: "8", correct: false },
            { text: "4", correct: false },
        ]
    },
    {
        question: "What is the smallest header in HTML by default? ?",
        answers: [
            { text: "h1", correct: false },
            { text: "h2", correct: false },
            { text: "h6", correct: true },
            { text: "h5", correct: false },
        ]
    },
    {
        question: "What is the full form of CSS?",
        answers: [
            { text: "Casecading Styles Sheet", correct: false },
            { text: " Cascading Style Sheets", correct: true },
            { text: "css", correct: false },
            { text: "react", correct: false },
        ]
    },
    {
        question: "How many types of CSS?",
        answers: [
            { text: "1", correct: false },
            { text: "2", correct: false },
            { text: "4", correct: false },
            { text: "3", correct: true },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQusetion();
}

function showQusetion() {
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetstate() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}


function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore() {
    resetstate();
    questionElement.innerHTML = `You scrord ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Another Try";
    nextButton.style.display = "block"
}



nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handelNextButton();
    } else {
        startQuiz();
    }
})

function handelNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQusetion();
    } else {
        showScore();
    }
}


startQuiz();