const correctOrder = [
  "Start",
  "Prüfen, ob KI‑RA genug Speicher hat",
  "Daten aus der Umgebung sammeln",
  "Eingabe analysieren",
  "Antwort erstellen",
  "Antwort überprüfen",
  "Antwort senden",
  "Ende"
];


function createList() {
  const list = document.getElementById("steps-list");
  list.innerHTML = ""; // Clear existing items

  const shuffledOrder = [...correctOrder].sort(() => Math.random() - 0.5); // 🔄 Shuffle here

  shuffledOrder.forEach((step, index) => {
    const li = document.createElement("li");
    li.textContent = step;
    li.draggable = true;
    li.id = `step-${index}`;
    li.addEventListener("dragstart", dragStart);
    li.addEventListener("dragover", dragOver);
    li.addEventListener("drop", drop);
    list.appendChild(li);
  });
}

function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.id);
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const draggedId = e.dataTransfer.getData("text/plain");
  const draggedEl = document.getElementById(draggedId);
  const dropTarget = e.target;

  const parent = dropTarget.parentNode;
  parent.insertBefore(draggedEl, dropTarget.nextSibling === draggedEl ? dropTarget : dropTarget);
}

function checkOrder() {
  const listItems = document.querySelectorAll("#steps-list li");
  const userOrder = Array.from(listItems).map((li) => li.textContent);

  const feedback = document.getElementById("feedback");

if (JSON.stringify(userOrder) === JSON.stringify(correctOrder)) {
  feedback.textContent = "🎉 Super gemacht! KI‑RAs Algorithmus ist bereit!";
  feedback.style.color = "#008b8b";
  document.getElementById("info-box").classList.remove("hidden");
} else {
  feedback.textContent = "Hmm… das stimmt noch nicht ganz. Versuch es nochmal!";
  feedback.style.color = "#cc3366";
}

  }

document.addEventListener("DOMContentLoaded", () => {
  createList();

  setupResetButton(() => {
    document.getElementById("feedback").textContent = "";
    document.getElementById("feedback").style.color = "";
    document.getElementById("info-box").classList.add("hidden");
    createList(); // ✅ This now reshuffles every time
  });
});
