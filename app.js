// Dataset of Questions Categorized
const questionsDataset = {
    ai: [
        "What is AI?",
        "Explain the Turing Test.",
        "What are the types of AI?",
        "Define Artificial General Intelligence.",
        "What is Natural Language Processing?",
        "How does AI differ from Machine Learning?",
    ],
    ml: [
        "What is Machine Learning?",
        "Explain Supervised Learning.",
        "What is Unsupervised Learning?",
        "What is a neural network?",
        "Explain gradient descent.",
        "What is overfitting in Machine Learning?",
    ],
    web: [
        "What is HTML?",
        "What is CSS?",
        "Explain the DOM.",
        "What is a REST API?",
        "What is the difference between frontend and backend?",
        "How does JavaScript handle asynchronous calls?",
    ],
};

// Store previously asked questions
let previousQuestions = [];
let selectedQuestion = "";

// Initialize SpeechRecognition for Question
const recognitionQuestion = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognitionQuestion.lang = 'en-US';
recognitionQuestion.interimResults = false;
recognitionQuestion.maxAlternatives = 1;

// Initialize SpeechRecognition for Answer
const recognitionAnswer = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognitionAnswer.lang = 'en-US';
recognitionAnswer.interimResults = false;
recognitionAnswer.maxAlternatives = 1;

recognitionQuestion.onstart = function () {
    console.log('Voice recognition started for question');
    document.getElementById('voiceButton').textContent = '🛑 Stop Listening';
};

recognitionQuestion.onspeechend = function () {
    console.log('Voice recognition ended for question');
    document.getElementById('voiceButton').textContent = '🎤 Start Listening';
};

recognitionQuestion.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    console.log('Question result: ' + transcript);
    document.getElementById("userQuestion").value = transcript;
};

recognitionAnswer.onstart = function () {
    console.log('Voice recognition started for answer');
    document.getElementById('voiceAnswerButton').textContent = '🛑 Stop Listening';
};

recognitionAnswer.onspeechend = function () {
    console.log('Voice recognition ended for answer');
    document.getElementById('voiceAnswerButton').textContent = '🎤 Start Listening';
};

recognitionAnswer.onresult = function (event) {
    const transcript = event.results[0][0].transcript;
    console.log('Answer result: ' + transcript);
    document.getElementById("userAnswer").value = transcript;
};

// Function to start/stop speech recognition for asking a question
function toggleQuestionVoiceInput() {
    if (recognitionQuestion) {
        if (recognitionQuestion.speechRecognizer) {
            recognitionQuestion.stop();
        } else {
            recognitionQuestion.start();
        }
    } else {
        alert("Speech recognition is not supported in this browser.");
    }
}

// Function to start/stop speech recognition for answering
function toggleAnswerVoiceInput() {
    if (recognitionAnswer) {
        if (recognitionAnswer.speechRecognizer) {
            recognitionAnswer.stop();
        } else {
            recognitionAnswer.start();
        }
    } else {
        alert("Speech recognition is not supported in this browser.");
    }
}

// Function to go back to the category selection view
function goBack() {
    document.getElementById("questionsList").classList.add("hidden");
    document.getElementById("selectedQuestionSection").classList.add("hidden");
    document.getElementById("categorySelect").classList.remove("hidden");
    document.getElementById("backButton").classList.add("hidden");
    document.getElementById("categoryTitle").textContent = "";
    document.getElementById("questions").innerHTML = "";
}

// Function to Display Questions Based on Selected Category
function displayQuestions() {
    const category = document.getElementById("categorySelect").value;
    const questionsList = document.getElementById("questionsList");
    const questionsUl = document.getElementById("questions");
    const categoryTitle = document.getElementById("categoryTitle");

    if (category && questionsDataset[category]) {
        categoryTitle.textContent = `Questions for ${category.toUpperCase()}`;
        questionsUl.innerHTML = "";
        questionsDataset[category].forEach((question) => {
            const li = document.createElement("li");
            li.textContent = question;
            li.onclick = () => selectQuestion(question);
            questionsUl.appendChild(li);
        });

        questionsList.classList.remove("hidden");
        document.getElementById("categorySelect").classList.add("hidden");
        document.getElementById("backButton").classList.remove("hidden");
    }
}

// Function to Handle User Questions
function askQuestion() {
    const questionInput = document.getElementById("userQuestion");
    const questionText = questionInput.value.trim();
    const previousQuestionsUl = document.getElementById("previousQuestions");

    if (questionText) {
        previousQuestions.push(questionText);

        const li = document.createElement("li");
        li.textContent = questionText;
        previousQuestionsUl.appendChild(li);

        questionInput.value = "";
    } else {
        alert("Please type a question!");
    }
}

// Function to Select a Question
function selectQuestion(question) {
    selectedQuestion = question;
    document.getElementById("selectedQuestionText").textContent = question;
    document.getElementById("selectedQuestionSection").classList.remove("hidden");
}

// Function to Submit an Answer
function submitAnswer() {
    const answerInput = document.getElementById("userAnswer").value.trim();

    if (answerInput) {
        document.getElementById("answerResponse").textContent = "Your answer has been submitted!";
        document.getElementById("userAnswer").value = "";
    } else {
        alert("Please provide an answer!");
    }
}
