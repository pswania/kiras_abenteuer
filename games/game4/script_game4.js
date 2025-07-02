const questions = [
  { text: "Darf ich wissen, wie alt du bist?", key: "age", risky: true },
  { text: "Darf ich deinen Vornamen kennen?", key: "name", risky: false },
  { text: "Darf ich wissen, wo du wohnst?", key: "location", risky: true },
  { text: "Darf ich deine Lieblingsfarbe kennen?", key: "color", risky: false },
  { text: "Darf ich wissen, auf welche Schule du gehst?", key: "school", risky: true }
];

const responses = {};

window.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("privacy-questions");
  const submitBtn = document.getElementById("submitBtn");
  const resetBtn = document.getElementById("resetBtn");
  const submitInfo = document.getElementById("submitInfo");
  const result = document.getElementById("result"); // in deinem HTML nicht vorhanden, kannst du ggf. weglassen oder hinzufügen

  // Fragen einfügen
  questions.forEach(q => {
    const li = document.createElement("li");
    li.classList.add("question-box");
    li.innerHTML = `
      <p><strong>KI‑RA:</strong> ${q.text}</p>
      <div class="btn-row">
        <button class="yes-btn" data-key="${q.key}">Ja, darf sie.</button>
        <button class="no-btn" data-key="${q.key}">Nein, lieber nicht.</button>
      </div>
      <div class="inline-warning hidden">⚠️ Vorsicht: Diese Information ist sensibel!</div>
    `;
    list.appendChild(li);
  });

  // Auswahl-Logik
  list.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    const key = e.target.getAttribute("data-key");
    const isYes = e.target.classList.contains("yes-btn");

    const parent = e.target.closest("li");
    const warning = parent.querySelector(".inline-warning");

    responses[key] = isYes ? "yes" : "no";

    // Visuelle Auswahl aktualisieren
    parent.querySelectorAll("button").forEach(btn => btn.classList.remove("selected"));
    e.target.classList.add("selected");

    // Warnung ein- oder ausblenden
    const question = questions.find(q => q.key === key);
    if (question.risky && isYes) {
      warning.classList.remove("hidden");
    } else {
      warning.classList.add("hidden");
    }
  });

  // Fertig-Button
  submitBtn.addEventListener("click", () => {
    if (Object.keys(responses).length < questions.length) {
      alert("Bitte beantworte alle Fragen, bevor du fortfährst.");
      return;
    }

    // Alles beantwortet: Zusatzinfo anzeigen
    submitInfo.classList.remove("hidden");
    submitBtn.disabled = true;
  });

  // Zurücksetzen
  setupResetButton(() => {
    for (let key in responses) delete responses[key];

    document.querySelectorAll(".question-box").forEach(box => {
      box.querySelectorAll("button").forEach(btn => btn.classList.remove("selected"));
      box.querySelector(".inline-warning").classList.add("hidden");
    });

    submitBtn.disabled = false;
    submitInfo.classList.add("hidden");
  });
});

// Gemeinsamer Reset-Button
function setupResetButton(resetCallback = null) {
  const resetBtn = document.getElementById("resetBtn");
  if (!resetBtn) return;

  resetBtn.addEventListener("click", () => {
    if (typeof resetCallback === "function") {
      resetCallback();
    } else {
      location.reload(); // Fallback
    }
  });
}

