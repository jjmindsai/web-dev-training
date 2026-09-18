const copyBtn = document.getElementById("copy-url");
const copyStatus = document.getElementById("copy-status");

copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(window.location.href).then(function () {
    copyStatus.classList.remove("hidden");
  });
});
