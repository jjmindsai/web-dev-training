from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return """
    <!DOCTYPE html>
    <html>
      <head>
        <title>Johny's Flask server</title>
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
        <h1>Hello from Flask</h1>
        <p>Python is answering the browser now.</p>
        <p><a href="/about">Open the About page</a></p>
      </body>
    </html>
    """


@app.route("/about")
def about():
    return """
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
        <p>I am learning Python backend.</p>
        <p><a href="/">Back home</a></p>
      </body>
    </html>
    """


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)