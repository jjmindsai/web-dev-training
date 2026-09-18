const toTop = document.getElementById("to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 200) {
    toTop.classList.remove("hidden");
  } else {
    toTop.classList.add("hidden");
  }
});

toTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
