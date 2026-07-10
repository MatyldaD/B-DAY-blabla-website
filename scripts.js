// === 1. DATA URODZENIA MAI ===
// 28 czerwca 2008, godzina 12:54 (miesiąc 5 to czerwiec)
const birthDate = new Date(2008, 5, 28, 12, 54, 0); 

// === 2. FUNKCJA LICZNIKA ===
function updateCounter() {
    const counterElement = document.getElementById('counter');
    if (!counterElement) return;

    const now = new Date();
    const difference = now - birthDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    counterElement.innerHTML = `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
}

// === 3. KARUZELA ZDJĘĆ (WSPOMNIENIA) ===
const images = [
    { src: 'images/foto1.JPG', caption: '★ Kiedy byłaś jeszcze mała... ★' },
    { src: 'images/foto2.JPG', caption: 'Szalone czasy! 😉' },
    { src: 'images/foto3.JPG', caption: 'BUM! Oficjalnie Dorosła! 🎉' }
];

let currentSlide = 0;

function showSlide(index) {
    const imgElement = document.getElementById('carousel-img');
    const captionElement = document.getElementById('carousel-caption');
    
    if (!imgElement || !captionElement || images.length === 0) return;

    if (index >= images.length) currentSlide = 0;
    else if (index < 0) currentSlide = images.length - 1;
    else currentSlide = index;

    imgElement.src = images[currentSlide].src;
    captionElement.innerText = images[currentSlide].caption;
}

function nextSlide() { showSlide(currentSlide + 1); }
function prevSlide() { showSlide(currentSlide - 1); }

// === 4. OBSŁUGA QUIZU ===
// === 3. INTERAKTYWNY RETRO QUIZ O MAI ===
const quizData = [
    {
        q: "1. Jaki jest Twój ostateczny plan na radzenie sobie z dorosłym życiem?",
        options: [
            { text: "A) Udawanie, że wiem co robię i liczenie na farta", points: 25 },
            { text: "B) Ignorowanie dorosłości i oglądanie tiktoka/słuchanie muzyki", points: 20 },
            { text: "C) Płakanie w kącie na sam dźwięk słowa 'podatki'", points: 25 },
            { text: "D) Kupowanie losowych rzeczy w internecie jako terapia", points: 30 }
        ]
    },
    {
        q: "2. Idziesz do sklepu i kupujesz energetyka bez pytania o dowód. Co czujesz?",
        options: [
            { text: "A) Nielimitowaną władzę nad światem i systemem", points: 25 },
            { text: "B) Strach, że kasjerka zaraz krzyknie 'Żartowałam, dawaj dowód!'", points: 15 },
            { text: "C) Dumę, że urosłam te dodatkowe 2 centymetry", points: 20 },
            { text: "D) Nic, jestem już na to zbyt dojrzała", points: 25 }
        ]
    },
    {
        q: "3. Ktoś prosi Cię o podjęcie ważnej, życiowej decyzji. Twoja reakcja?",
        options: [
            { text: "A) Dzwonię do mamy. Natychmiast.", points: 10 },
            { text: "B) Rzucam monetą albo sprawdzam horoskop", points: 20 },
            { text: "C) Mówię 'YOLO' i wybieram najbardziej chaotyczną opcję", points: 25 },
            { text: "D) Udaję, że nagle straciłam zasięg w telefonie", points: 20 }
        ]
    },
    {
        q: "4. Najbardziej dorosła rzecz, jaką udało Ci się dziś zrobić to:",
        options: [
            { text: "A) Wstanie z łóżka przed godziną 12:00", points: 20 },
            { text: "B) Napicie się wody zamiast słodkiego napoju", points: 25 },
            { text: "C) Przeżycie dnia bez zgubienia słuchawek", points: 20 },
            { text: "D) Pomyślenie o tym, że powinnam posprzątać pokój", points: 15 }
        ]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;

function loadQuestion() {
    const qElement = document.getElementById('question');
    const progressElement = document.getElementById('quiz-progress');
    const optionsContainer = document.getElementById('quiz-options');
    const resultZone = document.getElementById('quiz-result-zone');

    if (!qElement || !optionsContainer) return;

    // Ukryj strefę wyniku na czas gry
    resultZone.style.display = "none";
    qElement.style.display = "block";
    optionsContainer.style.display = "block";

    if (currentQuestionIndex < quizData.length) {
        const currentQuiz = quizData[currentQuestionIndex];
        progressElement.innerText = `PYTANIE ${currentQuestionIndex + 1} z ${quizData.length}`;
        qElement.innerText = currentQuiz.q;
        optionsContainer.innerHTML = '';

        currentQuiz.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'y2k-btn-option';
            btn.innerText = opt.text;
            btn.onclick = () => handleAnswer(opt.points);
            optionsContainer.appendChild(btn);
        });
    } else {
        showQuizResult();
    }
}

function handleAnswer(points) {
    totalScore += points;
    currentQuestionIndex++;
    loadQuestion();
}

function showQuizResult() {
    const qElement = document.getElementById('question');
    const progressElement = document.getElementById('quiz-progress');
    const optionsContainer = document.getElementById('quiz-options');
    const resultZone = document.getElementById('quiz-result-zone');
    const percentElement = document.getElementById('quiz-percentage');
    const summaryElement = document.getElementById('quiz-summary-text');

    // Maksymalny wynik z punktów to około 105-110, przeskalujmy to ładnie na procenty (max 100%)
    let finalPercentage = Math.min(totalScore, 100);

    qElement.style.display = "none";
    progressElement.innerText = "★ WYNIK TESTU ★";
    optionsContainer.style.display = "none";
    resultZone.style.display = "block";

    percentElement.innerText = `${finalPercentage}%`;

    // Śmieszne werdykty retro
    if (finalPercentage >= 90) {
        summaryElement.innerHTML = "👑 POTĘŻNA DOROSŁOŚĆ! Maja ma oficjalnie 18 lat na papierze i w głowie! Możesz rządzić światem (albo chociaż pilotem do TV).";
    } else if (finalPercentage >= 70) {
        summaryElement.innerHTML = "⚡ PRAWIE PEŁNOLETNIA! Dowód jest, chęci są, ale w serduszku nadal drzemie ochota na robienie głupot. Idealny balans!";
    } else if (finalPercentage >= 50) {
        summaryElement.innerHTML = "🧸 PÓŁ NA PÓŁ! 18 lat wjechało na konto, ale dorosłe obowiązki to wciąż czarna magia. I bardzo dobrze, baw się dobrze!";
    } else {
        summaryElement.innerHTML = "🍼 ERROR 404! Twoja dojrzałość uciekła z pokoju. Maja ma 18 lat tylko na papierze, w środku to wciąż czysty sabotaż i dziecięcy chaos!";
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    totalScore = 0;
    loadQuestion();
}

// Odpalenie quizu przy starcie strony (upewnij się, że ta linijka wywołuje się na dole pliku)
document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
});

// === 5. ZEGAREK NA PASKU ZADAŃ ===
function updateClock() {
    const clockElement = document.getElementById('live-clock');
    if (!clockElement) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clockElement.innerText = `${hours}:${minutes}`;
}

// === 6. AUTOMATYCZNE URUCHOMIENIE WSZYSTKIEGO ===
// Odpalamy od razu bez czekania na DOM, żeby ominąć blokady przeglądarki
showSlide(currentSlide);

updateCounter();
setInterval(updateCounter, 1000);

updateClock();
setInterval(updateClock, 1000);
// Na samym dole scripts.js dopisz:
loadQuestion();

// --- INTERAKTYWNE TAMAGOTCHI (WERSJA KAOMOJI) ---
function actionPet(type) {
    const statusText = document.getElementById('pet-status');
    const petImg = document.getElementById('pet-img');
    if (!statusText || !petImg) return;

    if (type === 'feed') {
        statusText.innerText = "Maja's Cyber Cat: Najedzony! 🐟";
        petImg.innerText = "(๑´ڡ`๑) <3"; // Kotek oblizuje się ze smakiem
    } 
    else if (type === 'pet') {
        statusText.innerText = "Maja's Cyber Cat: Mruczy! 🥰";
        petImg.innerText = "(=`ω´=) *miau*"; // Zadowolony, mruczący kot
    } 
    else if (type === 'sleep') {
        statusText.innerText = "Maja's Cyber Cat: Śpi... 💤";
        petImg.innerText = "(–_–)zzZ"; // Śpiący kotek
    }
    
    // Po 4 sekundach kotek wraca do normy, chyba że śpi
    setTimeout(() => {
        if (statusText.innerText.includes("Śpi")) return;
        statusText.innerText = "Maja's Cyber Cat: Szczęśliwy!";
        petImg.innerText = "(=^･ω･^=)"; // Powrót do standardowej minkii
    }, 4000);
}