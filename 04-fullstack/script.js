const button = document.getElementById("load-btn");
const message = document.getElementById("message");

button.addEventListener("click", function () {
  fetch("/api/me")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      message.textContent =
        data.name + " is a " + data.role + ". " + data.message;
    });
});
