const button = document.getElementById("greet-btn");
const message = document.getElementById("message");

button.addEventListener("click", function () {
  message.textContent = "Nice work, Johny. JavaScript is running.";
});