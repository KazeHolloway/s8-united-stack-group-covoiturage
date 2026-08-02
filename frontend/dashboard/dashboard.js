const btnMenu = document.getElementById("btn-menu");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay-menu");

function ouvrirMenu() {
  sidebar.classList.add("ouverte");
  overlay.classList.add("visible");
  btnMenu.style.display = "none";
}

function fermerMenu() {
  sidebar.classList.remove("ouverte");
  overlay.classList.remove("visible");
  btnMenu.style.display = "flex";
}

btnMenu.addEventListener("click", () => {
  if (sidebar.classList.contains("ouverte")) {
    fermerMenu();
  } else {
    ouvrirMenu();
  }
});

overlay.addEventListener("click", fermerMenu);
