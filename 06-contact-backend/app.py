from functools import wraps
from flask import Flask, jsonify, redirect, render_template, request, send_from_directory, session
from pathlib import Path
import json
import sqlite3

SITE = Path(__file__).resolve().parent.parent / "05-personal-site"
DB = Path(__file__).resolve().parent / "messages.db"
OLD_JSON = Path(__file__).resolve().parent / "messages.json"

app = Flask(__name__)
app.secret_key = "dev-only-not-for-the-internet"
ADMIN_PASSWORD = "johny-inbox"


def login_required(view):
    @wraps(view)
    def wrapped(*args, **kwargs):
        if not session.get("logged_in"):
            if request.path.startswith("/api/"):
                return jsonify({"error": "login required"}), 401
            return redirect("/login")
        return view(*args, **kwargs)

    return wrapped


@app.route("/")
def home():
    return send_from_directory(SITE, "index.html")


@app.route("/api/contact", methods=["POST"])
def save_contact():
    data = request.get_json(silent=True) or {}
    name = str(data.get("name", "")).strip()
    email = str(data.get("email", "")).strip()
    message = str(data.get("message", "")).strip()

    if not name or not email or not message:
        return jsonify({"ok": False, "error": "Fill in all fields."}), 400

    db = get_db()
    db.execute(
        "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
        (name, email, message),
    )
    db.commit()
    db.close()
    return jsonify({"ok": True})


def get_db():
    conn = sqlite3.connect(DB)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    db = get_db()
    db.execute(
        """
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL
        )
        """
    )
    db.commit()
    count = db.execute("SELECT COUNT(*) FROM messages").fetchone()[0]
    if count == 0 and OLD_JSON.exists():
        old = json.loads(OLD_JSON.read_text(encoding="utf-8"))
        for item in old:
            db.execute(
                "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
                (item.get("name", ""), item.get("email", ""), item.get("message", "")),
            )
        db.commit()
    db.close()


def load_messages():
    db = get_db()
    rows = db.execute("SELECT id, name, email, message FROM messages ORDER BY id").fetchall()
    db.close()
    return [dict(row) for row in rows]


def get_message(message_id):
    db = get_db()
    row = db.execute(
        "SELECT id, name, email, message FROM messages WHERE id = ?",
        (message_id,),
    ).fetchone()
    db.close()
    return dict(row) if row else None


@app.route("/login", methods=["GET", "POST"])
def login():
    error = None
    if request.method == "POST":
        if request.form.get("password") == ADMIN_PASSWORD:
            session["logged_in"] = True
            return redirect("/inbox")
        error = "Wrong password."
    return render_template("login.html", error=error)


@app.route("/logout")
def logout():
    session.clear()
    return redirect("/login")


@app.route("/api/messages")
@login_required
def list_messages():
    return jsonify(load_messages())


@app.route("/inbox")
@login_required
def inbox():
    return render_template("inbox.html", messages=load_messages())


@app.route("/inbox/delete/<int:message_id>", methods=["POST"])
@login_required
def delete_message(message_id):
    db = get_db()
    db.execute("DELETE FROM messages WHERE id = ?", (message_id,))
    db.commit()
    db.close()
    return redirect("/inbox")


@app.route("/inbox/edit/<int:message_id>", methods=["GET", "POST"])
@login_required
def edit_message(message_id):
    item = get_message(message_id)
    if not item:
        return redirect("/inbox")

    if request.method == "POST":
        name = request.form.get("name", "").strip()
        email = request.form.get("email", "").strip()
        message = request.form.get("message", "").strip()
        if name and email and message:
            db = get_db()
            db.execute(
                "UPDATE messages SET name = ?, email = ?, message = ? WHERE id = ?",
                (name, email, message, message_id),
            )
            db.commit()
            db.close()
            return redirect("/inbox")

    return render_template("edit.html", item=item)


@app.route("/<path:filename>")
def site_file(filename):
    return send_from_directory(SITE, filename)


if __name__ == "__main__":
    init_db()
    app.run(host="127.0.0.1", port=5000)
