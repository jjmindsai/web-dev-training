const express = require("express");
const app = express();

app.get("/", function (request, response) {
  response.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Johny's Express server</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #010712;
            color: #d9d5e5;
            padding: 40px;
          }
          h1 { color: #5b8def; }
          a { color: #8ab4f8; }
        </style>
      </head>
      <body>
        <h1>Hello from Express</h1>
        <p>Same idea as server.js, less typing.</p>
        <p><a href="/about">Open the About page</a></p>
      </body>
    </html>
  `);
});
app.get("/about", function (request, response) {
  response.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>About</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #010712;
            color: #d9d5e5;
            padding: 40px;
          }
          h1 { color: #5b8def; }
          a { color: #8ab4f8; }
        </style>
      </head>
      <body>
        <h1>About Johny</h1>
        <p>I am learning web development.</p>
        <p><a href="/">Back home</a></p>
      </body>
    </html>
  `);
});
app.listen(3000, "127.0.0.1", function () {
  console.log("Express running at http://127.0.0.1:3000");
});