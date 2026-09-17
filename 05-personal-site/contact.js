const form = document.getElementById("contact-form");
const thanks = document.getElementById("thanks");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  form.classList.add("hidden");
  thanks.classList.remove("hidden");
});
