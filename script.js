// ================= SCREEN FLOW =================
let screens = ["intro", "fullform", "message", "gallery", "final"];
let current = 0;

function nextScreen() {
    let currentScreen = document.getElementById(screens[current]);

    currentScreen.style.opacity = 0;

    setTimeout(() => {
        currentScreen.classList.remove("active");

        current++;
        let next = document.getElementById(screens[current]);
        next.classList.add("active");

        // 🎬 FULL FORM AUDIO
        if (screens[current] === "fullform") {
            playLetterSequence();
        }

        // 💬 MESSAGE
        if (screens[current] === "message") {
            startTyping();
            startCountdown();
        }

    }, 500);
}

// ================= 🎵 START EXPERIENCE =================
function startExperience() {
    const music = document.getElementById("music");

    if (music) {
        music.currentTime = 0;
        music.volume = 0;

        music.play().catch(() => {});

        let vol = 0;
        const target = 0.6;

        const fade = setInterval(() => {
            if (vol < target) {
                vol += 0.05;
                music.volume = Math.min(vol, target);
            } else {
                clearInterval(fade);
            }
        }, 200);
    }

    nextScreen();
}

// ================= TYPING EFFECT =================
let text = "You are not just my Sister, you are my Brother, my Body Guard, and someone I can always count on. Thank you for everything ❤️";
let i = 0;

function startTyping() {
    let speed = 40;
    let element = document.getElementById("typedText");
    element.innerHTML = "";
    i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ================= SLIDESHOW =================
let images = [
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg",
    "images/photo5.jpg",
    "images/photo6.jpg",
    "images/photo7.jpg",
    "images/photo8.jpg",
    "images/photo9.jpg",
    "images/photo10.jpg",
    "images/photo11.jpg",
    "images/photo12.jpg",
    "images/photo13.jpg",
    "images/photo14.jpg",
    "images/photo15.jpg",
    "images/photo16.jpg",
    "images/photo17.jpg",
    "images/photo18.jpg",
    "images/photo19.jpg",
    "images/photo20.jpg",
    "images/photo21.jpg"
];

let index = 0;

setInterval(() => {
    let gallery = document.getElementById("gallery");
    let slide = document.getElementById("slide");

    if (gallery.classList.contains("active")) {

        slide.style.opacity = 0;

        setTimeout(() => {
            index = (index + 1) % images.length;

            slide.src = images[index];

            slide.classList.remove("slide-animate");
            void slide.offsetWidth;
            slide.classList.add("slide-animate");

            slide.style.opacity = 1;

        }, 600);
    }

}, 3500);

// ================= COUNTDOWN =================
let countdownStarted = false;

function startCountdown() {
    if (countdownStarted) return;
    countdownStarted = true;

    let target = new Date();
    target.setHours(23, 59, 59);

    setInterval(() => {
        let now = new Date();
        let diff = target - now;

        if (diff < 0) {
            document.getElementById("countdown").innerHTML = "🎉 It's your day!";
            return;
        }

        let hrs = Math.floor(diff / (1000 * 60 * 60));
        let mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let secs = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById("countdown").innerHTML =
            `⏳ ${hrs}h ${mins}m ${secs}s left`;
    }, 1000);
}

// ================= SURPRISE =================
function showSurprise() {
    let surprise = document.getElementById("surprise");
    surprise.style.display = "block";

    let music = document.getElementById("music");
    if (music) music.play().catch(() => {});

    let duration = 3000;
    let end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 8,
            spread: 70,
            origin: { y: 0.6 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// ================= FLOATING HEARTS =================
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (3 + Math.random() * 3) + "s";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

setInterval(createHeart, 500);

// ================= AUTO INTRO =================
setTimeout(() => {
    if (current === 0) {
        nextScreen();
    }
}, 10000);

// ================= 🔊 LETTER AUDIO =================
function playLetterSound(letter) {
    const audio = document.getElementById("audio-" + letter);
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
    }
}

// ================= PLAY LETTER SEQUENCE =================
function playLetterSequence() {
    const letters = ["R", "I", "D", "H", "I"];
    const delays = [1000, 2500, 4000, 5500, 7000];

    letters.forEach((letter, index) => {
        setTimeout(() => {
            playLetterSound(letter);
        }, delays[index]);
    });
}