// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("explanation-btn");
if (btn) {
  btn.onclick = function () {
    modal.style.display = "block";
  };
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
if (span) {
  span.onclick = function () {
    modal.style.display = "none";
    document.getElementById("nextChapter-btn").classList.toggle("hidden");
  };
}

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  document.getElementById("nextChapter-btn").classList.remove("hidden")
}

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


