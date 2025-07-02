let draggedTerm = null;

// KI-RA's internal (wrong) mapping
const kiraConnections = {
  algorithm: "Training",
  training: "Windkraftwerk",
  windkraftwerk: "Algorithmus",
  katze: "Hund",
  hund: "Katze",
};

// Helper to get term text by its key (used when restoring terms)
function getTermTextByKey(key) {
  const termTexts = {
    algorithm: "Algorithmus",
    training: "Training",
    windkraftwerk: "Windkraftwerk",
    katze: "Katze",
    hund: "Hund",
  };
  return termTexts[key] || key;
}

function initGame() {
  const termList = document.getElementById("terms");
  const definitions = document.querySelectorAll("#definitions li");

  // Re-enable draggable terms
  termList.innerHTML = `
    <li draggable="true" data-term="training">Training</li>
    <li draggable="true" data-term="hund">Hund</li>
    <li draggable="true" data-term="windkraftwerk">Windkraftwerk</li>
    <li draggable="true" data-term="algorithm">Algorithmus</li>
    <li draggable="true" data-term="katze">Katze</li>
  `;

  // Reset definitions
  definitions.forEach((def) => {
    def.innerHTML =
      def.getAttribute("data-original-text") ||
      def.textContent.split("←")[0].trim();
    def.removeAttribute("data-mapped-term");
    def.style.backgroundColor = "";
  });

  // Clear result
  const resultText = document.getElementById("resultText");
  if (resultText) {
    resultText.style.display = "none";
    resultText.textContent = "";
  }

  setUpEvents(); // Re-attach events after reset
}

function setUpEvents() {
  const terms = document.querySelectorAll("#terms li");
  const definitions = document.querySelectorAll("#definitions li");

  terms.forEach((term) => {
    term.addEventListener("dragstart", () => {
      draggedTerm = term;
    });
  });

  definitions.forEach((def) => {
    if (!def.getAttribute("data-original-text")) {
      def.setAttribute("data-original-text", def.textContent);
    }

    def.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    def.addEventListener("drop", () => {
      if (draggedTerm) {
        const mappedTerm = draggedTerm.getAttribute("data-term");
        const text = draggedTerm.textContent;

        // If definition already has a mapped term, put it back to terms list
        const oldMapped = def.getAttribute("data-mapped-term");
        if (oldMapped) {
          const oldLi = document.createElement("li");
          oldLi.textContent = getTermTextByKey(oldMapped);
          oldLi.setAttribute("draggable", "true");
          oldLi.setAttribute("data-term", oldMapped);
          document.getElementById("terms").appendChild(oldLi);
          setUpEvents(); // Re-attach events for newly added term
        }

        // Update definition with dropped term ONLY (no KI-RA guess here)
        def.innerHTML = `${def.getAttribute(
          "data-original-text"
        )} ← <strong>${text}</strong>`;
        def.setAttribute("data-mapped-term", mappedTerm);

        draggedTerm.remove();
        draggedTerm = null;
      }
    });
  });
}

document.getElementById("checkBtn").addEventListener("click", () => {
  const definitions = document.querySelectorAll("#definitions li");
  let allCorrect = true;

  definitions.forEach((def) => {
    const correct = def.getAttribute("data-definition");
    const userChoice = def.getAttribute("data-mapped-term");

    if (userChoice !== correct) {
      allCorrect = false;
    }
  });

  // Show KI-RA guesses inside definitions after checking
  definitions.forEach((def) => {
    const mappedTerm = def.getAttribute("data-mapped-term");
    const kiraGuess = mappedTerm ? kiraConnections[mappedTerm] || "?" : "?";
    const originalText = def.getAttribute("data-original-text");
    const userText = mappedTerm
      ? `<strong>${getTermTextByKey(mappedTerm)}</strong>`
      : "";
    def.innerHTML = `${originalText} ← ${userText} (KI-RA denkt: <em>${kiraGuess}</em>)`;
  });

  const resultText = document.getElementById("resultText");
  resultText.style.display = "block";
  resultText.textContent = allCorrect
    ? "Perfekt! Deine Verbindungen stimmen."
    : "Einige Verbindungen waren falsch – zumindest denkt KI‑RA das, aber wir wissen nicht genau, warum.";

  if (allCorrect) {
    document.getElementById("nextChapter-btn")?.classList.remove("hidden");
  }
});

document.getElementById("resetBtn").addEventListener("click", () => {
  initGame();
});

// Initialize game on page load
initGame();
