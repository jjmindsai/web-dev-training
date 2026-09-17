const root = document.documentElement;
const button = document.getElementById("theme-btn");

function applyTheme(theme) {
  if (theme === "light") {
    root.classList.add("light");
  } else {
    root.classList.remove("light");
  }
  localStorage.setItem("theme", theme);
  if (button) {
    button.textContent = theme === "light" ? "Dark" : "Light";
  }
}

const saved = localStorage.getItem("theme") === "light" ? "light" : "dark";
applyTheme(saved);

button.addEventListener("click", function () {
  const next = root.classList.contains("light") ? "dark" : "light";
  applyTheme(next);
});
