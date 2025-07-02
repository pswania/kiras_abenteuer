let draggedOutput = null;

// KI-RA’s initial (bad) responses
let kiraBadMapping = {
  greeting: "Blau.",
  color: "Es regnet.",
  weather: "Hallo!",
  animal: "Spaghetti.",
  food: "Hund.",
  time: "Morgen."
};

// Stores user's trained mappings with both key and text
let trainedMapping = {};

// Setup initial display of KI‑RA's bad thoughts
document.querySelectorAll("#inputs li").forEach(input => {
  const inputKey = input.getAttribute("data-input");
  const kiraAnswer = kiraBadMapping[inputKey];

  const kiraThought = document.createElement("span");
  kiraThought.classList.add("kira-thought");
  kiraThought.innerHTML = `<br><em>KI‑RA denkt: ${kiraAnswer}</em>`;
  input.appendChild(kiraThought);
});

// Enable dragging for output terms
document.querySelectorAll("#outputs li").forEach(output => {
  output.addEventListener("dragstart", () => {
    draggedOutput = output;
  });
});

// Enable dropping on input items
document.querySelectorAll("#inputs li").forEach(input => {
  input.addEventListener("dragover", e => e.preventDefault());

  input.addEventListener("drop", () => {
    if (draggedOutput) {
      const inputKey = input.getAttribute("data-input");
      const outputKey = draggedOutput.getAttribute("data-output");
      const outputText = draggedOutput.textContent;

      trainedMapping[inputKey] = {
        key: outputKey,
        text: outputText
      };

      // Remove old answer if present
      const prev = input.querySelector(".user-answer");
      if (prev) prev.remove();

      const userTag = document.createElement("div");
      userTag.className = "user-answer";
      userTag.innerHTML = `Deine Antwort: <strong>${outputText}</strong>`;
      input.appendChild(userTag);

      draggedOutput.remove();
      draggedOutput = null;
    }
  });
});

// "Trainieren" button logic
document.getElementById("trainBtn").addEventListener("click", () => {
  document.getElementById("testBtn").classList.remove("hidden");
  alert("KI‑RA wurde trainiert!");
});

// "Testen" button logic
document.getElementById("testBtn").addEventListener("click", () => {
  const kiraOutput = document.getElementById("kiraOutput");
  kiraOutput.classList.remove("hidden");
  kiraOutput.innerHTML = "<h3>KI‑RAs Antworten nach Training:</h3>";

  Object.keys(kiraBadMapping).forEach(inputKey => {
    const before = kiraBadMapping[inputKey];
    const mapping = trainedMapping[inputKey];
    const afterText = mapping ? mapping.text : before;

    kiraOutput.innerHTML += `<p><strong>Frage:</strong> ${inputLabel(inputKey)}<br>
      <strong>Vorher:</strong> ${before}<br>
      <strong>Jetzt:</strong> ${afterText}</p>`;
  });
});

// Common reset setup
function setupResetButton(resetCallback = null) {
  const resetBtn = document.getElementById("resetBtn");
  if (!resetBtn) return;

  resetBtn.addEventListener("click", () => {
    if (typeof resetCallback === "function") {
      resetCallback();
    } else {
      location.reload(); // fallback
    }
  });
}

// Full custom reset for Game 3
setupResetButton(() => {
  draggedOutput = null;
  trainedMapping = {};

  const inputs = document.querySelectorAll("#inputs li");
  const outputs = document.getElementById("outputs");
  const kiraOutput = document.getElementById("kiraOutput");
  const testBtn = document.getElementById("testBtn");

  // Reset inputs
  inputs.forEach(input => {
    // Remove user answer
    const userAnswer = input.querySelector(".user-answer");
    if (userAnswer) userAnswer.remove();

    // Reset KI‑RA thought
    const kiraThought = input.querySelector(".kira-thought");
    if (kiraThought) kiraThought.remove();

    const inputKey = input.getAttribute("data-input");
    const kiraAnswer = kiraBadMapping[inputKey];
    const newThought = document.createElement("span");
    newThought.classList.add("kira-thought");
    newThought.innerHTML = `<br><em>KI‑RA denkt: ${kiraAnswer}</em>`;
    input.appendChild(newThought);
  });

  // Restore outputs
  outputs.innerHTML = `
    <li data-output="greeting" draggable="true">Hallo!</li>
    <li data-output="color" draggable="true">Blau.</li>
    <li data-output="weather" draggable="true">Es regnet.</li>
    <li data-output="animal" draggable="true">Katze.</li>
    <li data-output="food" draggable="true">Pizza.</li>
    <li data-output="time" draggable="true">12 Uhr.</li>
  `;


  // Hide KI‑RA's new output
  kiraOutput.classList.add("hidden");
  kiraOutput.innerHTML = "";

  // Hide test button
  testBtn.classList.add("hidden");

  // Rebind drag events
  document.querySelectorAll("#outputs li").forEach(output => {
    output.addEventListener("dragstart", () => {
      draggedOutput = output;
    });
  });
});

// Helper to turn input keys into readable text
function inputLabel(key) {
  return {
    greeting: "Wie begrüßt man jemanden?",
    color: "Was ist deine Lieblingsfarbe?",
    weather: "Wie ist das Wetter?",
    animal: "Was ist dein Lieblingstier?",
    food: "Was isst du am liebsten?",
    time: "Wie spät ist es?"
  }[key];
}
