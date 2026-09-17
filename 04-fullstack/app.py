from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder=".", static_url_path="")


@app.route("/")
def home():
    return send_from_directory(".", "index.html")


@app.route("/api/me")
def me():
    return jsonify(
        {
            "name": "Johny",
            "role": "web development student",
            "message": "This text came from Python, not from the HTML file.",
        }
    )


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000)
