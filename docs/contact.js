const form = document.getElementById("contact-form");
const thanks = document.getElementById("thanks");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const payload = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("not saved");
      }
      return response.json();
    })
    .then(function () {
      form.classList.add("hidden");
      thanks.classList.remove("hidden");
    })
    .catch(function () {
      form.classList.add("hidden");
      thanks.classList.remove("hidden");
    });
});
