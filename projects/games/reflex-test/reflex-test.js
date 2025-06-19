// reflex-test.js

// Sons
const clickSound  = new Audio("projets/games/reflex-test/sound/click.mp3");
const recordSound = new Audio("projets/games/reflex-test/sound/record.mp3");
const failSound   = new Audio("projets/games/reflex-test/sound/too-early.mp3");

// Éléments
const startButton = document.getElementById("start-button");
const screen      = document.getElementById("screen");
const message     = document.getElementById("message");
const score       = document.getElementById("score");
const expandBtn   = document.getElementById("expand-btn");
const reduceBtn   = document.getElementById("reduce-btn");
const wrapper     = document.getElementById("reflex-test-wrapper");

let startTime, timeoutId, waitingForClick = false;
let bestScore = localStorage.getItem("bestScore");

// Icônes pour les boutons
expandBtn.textContent = "⛶";
reduceBtn.textContent = "🗗";

// Affiche le meilleur score si existant
if (bestScore) {
  score.textContent = `🏆 Meilleur score : ${bestScore} ms`;
}

// Lancement du test
startButton.addEventListener("click", () => {
  startButton.style.display = "none";
  score.textContent = bestScore
    ? `🏆 Meilleur score : ${bestScore} ms`
    : "";
  message.textContent = "Prépare-toi...";
  screen.className = "waiting active";

  const delay = Math.random() * 3000 + 2000;
  timeoutId = setTimeout(() => {
    screen.className = "ready";
    message.textContent = "CLIQUE !";
    startTime = performance.now();
    waitingForClick = true;
  }, delay);
});

// Gestion du clic dans la zone de jeu
screen.addEventListener("click", () => {
  if (startButton.style.display === "none") {
    // Clic trop tôt
    if (!waitingForClick) {
      clearTimeout(timeoutId);
      screen.className = "too-early";
      screen.classList.remove("active");
      message.textContent = "Trop tôt ! 😵";
      failSound.play();
      startButton.style.display = "inline-block";
    }
    // Clic valide
    else {
      const reactionTime = performance.now() - startTime;
      screen.className = "waiting";
      screen.classList.remove("active");
      waitingForClick = false;

      let reactionText = `⏱ ${reactionTime.toFixed(0)} ms`;
      if (!bestScore || reactionTime < bestScore) {
        bestScore = reactionTime.toFixed(0);
        localStorage.setItem("bestScore", bestScore);
        reactionText += " 🔥 Nouveau record !";
        recordSound.play();
      } else {
        clickSound.play();
      }

      score.textContent = reactionText;
      message.textContent = "Clique pour rejouer";
      startButton.style.display = "inline-block";
    }
  }
});

// Plein écran / réduire
expandBtn.addEventListener("click", () => {
  wrapper.classList.add("fullscreen");
  expandBtn.style.display = "none";
  reduceBtn.style.display = "inline-block";
});
reduceBtn.addEventListener("click", () => {
  wrapper.classList.remove("fullscreen");
  expandBtn.style.display = "inline-block";
  reduceBtn.style.display = "none";
});
