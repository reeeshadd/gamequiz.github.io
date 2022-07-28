const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let shuffledQuestions, currentQuestionIndex
let queCount = 0

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    queCount = 0
    currentQuestionIndex = 0
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    queCount++
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1 && queCount < 5) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Reset'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is the 3rd largest GDP in the world ?',
        answers: [
            {text: 'USA', correct: false},
            {text: 'UK', correct:false},
            {text: 'Japan', correct:true},
            {text: 'China', correct:false}
        ]
    },
    {
        question: 'Morocco is a country of ?',
        answers: [
            {text: 'Asia', correct: false},
            {text: 'Africa', correct:true},
            {text: 'Europe', correct: false},
            {text: 'North America', correct:false}
        ]
    },
    {
        question: 'Largest country in the world ?',
        answers: [
            {text: 'USA', correct: false},
            {text: 'Canada', correct:false},
            {text: 'Russia', correct:true},
            {text: 'China', correct:false}
        ]
    },
    {
        question: 'a = 2 and b = 3, what is 2ab + 3b ?',
        answers: [
            {text: '21', correct: true},
            {text: '22', correct:false},
            {text: '23', correct: false},
            {text: '24', correct:false}
        ]
    },
    {
        question: 'if 3 = 5, 5 = 7 , then 11 = ?',
        answers: [
            {text: '11', correct: false},
            {text: '15', correct: false},
            {text: '13', correct: true},
            {text: '17', correct:false}
        ]
    },
]