let player = "";

function myFunction() {
  event.stopPropagation();
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
function closePopup() {
  event.stopPropagation();
  var popup = document.getElementById("myPopup");
  popup.classList.remove("show");
}

function toggleMenu() {
  const dropdown = document.getElementById("dropdownContent");
  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
  } else {
    dropdown.style.display = "block";
  }
}

// Optional: close the dropdown when clicking outside
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].style.display = "none";
    }
  }
}




document.addEventListener("DOMContentLoaded", function () {
  fetch("/dropdownMenu.html")
    .then(response => {
      if (!response.ok) throw new Error("Failed to load dropdown");
      return response.text();
    })
    .then(html => {
      console.log("Dropdown HTML content:", html); // ← Add this
      document.getElementById("menu-container").innerHTML = html;

      // Additional test: Log after insertion
      console.log("Dropdown inserted into page");
    })
    .catch(error => {
      console.error("Error loading dropdown menu:", error);
    });
});

function getPlayerName() {
  const input = document.getElementById("playerName");
  return input.value || "Freund*in"; // Fallback-Name, falls nichts eingegeben
}

function saveNameAndContinue() {
  const name = document.getElementById("playerName").value.trim();
  localStorage.setItem("playerName", name || "Freund*in");
  window.location.href = "/chapters/chapter1.html";
}

const playerName = getPlayerName();

