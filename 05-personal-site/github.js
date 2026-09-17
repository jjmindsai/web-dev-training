const status = document.getElementById("gh-status");

fetch("https://api.github.com/users/jjmindsai")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("GitHub request failed");
    }
    return response.json();
  })
  .then(function (data) {
    const repos = data.public_repos;
    const name = data.login;
    const word = repos === 1 ? "repository" : "repositories";
    status.innerHTML =
      '<a href="' +
      data.html_url +
      '" target="_blank">' +
      name +
      "</a> has <strong>" +
      repos +
      "</strong> public " +
      word +
      ".";
  })
  .catch(function () {
    status.textContent = "Could not load GitHub data right now.";
  });
