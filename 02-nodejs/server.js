const http = require("http");

const server = http.createServer(function (request, response) {
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Johny's server</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #010712;
            color: #d9d5e5;
            padding: 40px;
          }
          h1 { color: #5b8def; }
        </style>
      </head>
      <body>
        <h1>Hello from Johny's first server</h1>
        <p>This HTML was sent by Node, not by Live Server.</p>
      </body>
    </html>
  `);
});

server.listen(3000, "127.0.0.1", function () {
  console.log("Server running at http://127.0.0.1:3000");
});