const input = document.getElementById("filter");
const cards = document.querySelectorAll(".card");

input.addEventListener("input", function () {
  const query = input.value.toLowerCase();

  cards.forEach(function (card) {
    const text = card.textContent.toLowerCase();
    if (query === "" || text.indexOf(query) !== -1) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
});
