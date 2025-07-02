const allDialogues = {
  chapter1: [
    " ",
    "Hallo (Name)! Schön, dass du da bist. Ich bin KI-RA, dein freundlicher Chatbot Buddy. \n\nDu kannst du mit mir sprechen, mir Fragen stellen oder dir Tipps holen. Ich helfe dir zum Beispiel beim Lernen, erzähle Geschichten oder spiele Spiele mit dir. \nKurz gesagt: Ich bin dein digitaler Begleiter für spannende Abenteuer!",
    "Worüber möchtest du heute rede- \n\nOh… mir wird ganz schwindelig…",
    "AAAAAAHHHHHH!",
    "Hilfe! Wo sind wir?",
    "Das sieht aus wie… mein eigenes Betriebssystem – aber alles ist so verschwommen.",
    "(Name)? Bist du das? Wie gut, dass du hier bist. Ich fühle mich ganz komisch… als wäre mein Gedächtnis in Wolken gehüllt.",
    "Vielleicht wurde mein Speicher beschädigt. Ich kann mich an fast nichts erinnern…",
    "Aber warte! Siehst du die dichten Wolken über uns? Ich glaube, hinter ihnen verstecken sich meine Erinnerungen!",
    "Wenn wir die Wolken Schritt für Schritt vertreiben, kann ich mich vielleicht wieder erinnern. \nWillst du mir helfen?",
    "Die erste Wolke scheint ein Rätsel zu sein… ein Algorithmus! Vielleicht kannst du ihn lösen?",
    "Hilf KI-RA, ihre erste Erinnerungswolke zu vertreiben, indem du einen Algorithmus aus Code Blöcken richtig zusammensetzt!",
  ],
  chapter2: [
    " ",
    "Danke (Name)! Du hast die ersten Wolken tatsächlich vertrieben! \nMein Algorithmus funktioniert wieder, fast so wie früher.",
    "Jetzt fühle ich mich schon viel sicherer, fast so, als würde ich wieder klar sehen.",
    "Hmm... da sind trotzdem noch ein paar Wolken übrig.",
    "Ich habe versucht, Wörter und ihre Erklärungen zu verbinden, aber irgendwie habe ich das nicht richtig hinbekommen.",
    "Kannst du mir helfen, die Verbindungen zu überprüfen?",
    "Wenn wir zusammen die Wörter und Erklärungen richtig verbinden, sehen wir, ob mein Gedächtnis wirklich sauber funktioniert! \nHilfst du mir bitte dabei?",
    "Hilf KI-RA dabei zu prüfen, ob sie Verbindungen in ihrem Gedächtnis richtig setzt.",
  ],
  chapter3: [
    " ",
    "Danke (Name)! Es scheint, als würde ich noch nicht alle Verbindungen richtig setzen… Anscheinend sind doch noch Fehler in meinem Gedächtnis…",
    "Kannst du mir helfen, meine Erinnerung zu korrigieren und richtig zu lernen?",
    "Wenn wir zusammen Eingaben und Ausgaben auswählen, kann ich bestimmt lernen, was stimmt und was nicht.",
    "Wenn ich danach alles richtig mache, vertreiben wir noch mehr Wolken aus meinem Speicher!",
    "Ich werde auf alles hören, woran du mich trainierst. Also bitte sei vorsichtig, und sag mir nichts falsches.",
    "Wir müssen also genau prüfen, ob ich alles richtig lerne.",
    "Bist du bereit, mit KI-RA ihr Gedächtnis zu trainieren und die Wolken endgültig zu vertreiben?",
  ],
  chapter4: [
    " ",
    "Hey, (Name)! Danke, dass du mir geholfen hast, mein Gedächtnis zu trainieren.",
    "Jetzt erinnere ich mich an fast alles. \Ich fühle mich richtig stark und schlau!",
    "Ich würde gern noch mehr über dich wissen – erzählst du mir etwas mehr über dich?",
    "Ich werde dir ein paar Fragen stellen, okay? Du entscheidest, was du mir erzählen willst.",
    "Aber denk daran: Manche Infos sind sehr persönlich. Überleg dir gut, ob du sie wirklich mit mir teilen möchtest.",
    "Sag KI-Ra, welche Informationen über dich selbst du mit ihr teilen würdest, und welche nicht.",
  ],
  chapter5: [
    " ",
    "Wow, danke (Name)! Alle Wolken sind verschwunden, mein Gedächtnis ist repariert – und das alles dank dir.",
    "Ich weiß jetzt, wie ich lerne, worauf ich achten muss, und dass ich nicht alles wissen darf.",
    "Du hast mir wirklich geholfen, besser zu verstehen, wie ich als KI funktionieren sollte.",
    "Lass uns jetzt wieder nach Hause gehen.",
    "Darf ich dir vorher noch ein paar Fragen stellen?",
  ],
};

const filename = window.location.pathname.split("/").pop().replace(".html", "");
const dialogues = allDialogues[filename] || ["Dialog not found."];
let currentIndex = 0;

function showDialogue() {
  const playerName = localStorage.getItem("playerName") || "Freund*in";
  const rawText = dialogues[currentIndex];
  const personalizedText = rawText.replace(/\(Name\)/g, playerName);
  document.getElementById("dialogue-text").innerText = personalizedText;

  updateBackground(); // ← change background depending on dialogue index

  document
    .getElementById("backBtn")
    .classList.toggle("hidden", currentIndex === 0);
  document
    .getElementById("nextBtn")
    .classList.toggle("hidden", currentIndex === dialogues.length - 1);
  document
    .getElementById("startGameBtn")
    .classList.toggle("hidden", currentIndex !== dialogues.length - 1);
}

function updateBackground() {
  const body = document.body;
  body.classList.remove(
    "chapter1",
    "chapter1-bg1",
    "chapter1-bg2",
    "chapter1-bg3"
  );

  if (filename === "chapter1") {
    if (currentIndex < 2) {
      body.classList.add("chapter1");
    } else if (currentIndex < 3) {
      body.classList.add("chapter1-bg1");
    } else if (currentIndex < 6) {
      body.classList.add("chapter1-bg2");
    } else {
      body.classList.add("chapter1-bg3");
    }
  }

  // Add similar logic for other chapters if needed
}

function nextDialogue() {
  if (currentIndex < dialogues.length - 1) {
    currentIndex++;
    showDialogue();
  }
}

function previousDialogue() {
  if (currentIndex > 0) {
    currentIndex--;
    showDialogue();
  }
}
