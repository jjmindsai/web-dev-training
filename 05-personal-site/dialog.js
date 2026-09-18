const openBtn = document.getElementById("open-dialog");
const closeBtn = document.getElementById("close-dialog");
const dialog = document.getElementById("about-dialog");

openBtn.addEventListener("click", function () {
  dialog.showModal();
});

closeBtn.addEventListener("click", function () {
  dialog.close();
});
