const path = require("path");
const express = require("express");
const session = require("express-session");
const { DatabaseSync } = require("node:sqlite");

const SITE = path.join(__dirname, "..", "05-personal-site");
const DB_PATH = path.join(__dirname, "messages.db");
const ADMIN_PASSWORD = "johny-inbox";

const db = new DatabaseSync(DB_PATH);
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL
  )
`);

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "dev-only-not-for-the-internet",
    resave: false,
    saveUninitialized: false,
  })
);

function loginRequired(req, res, next) {
  if (!req.session.loggedIn) {
    if (req.path.startsWith("/api/")) {
      return res.status(401).json({ error: "login required" });
    }
    return res.redirect("/login");
  }
  next();
}

app.get("/login", function (req, res) {
  res.render("login", { error: null });
});

app.post("/login", function (req, res) {
  if (req.body.password === ADMIN_PASSWORD) {
    req.session.loggedIn = true;
    return res.redirect("/inbox");
  }
  res.render("login", { error: "Wrong password." });
});

app.get("/logout", function (req, res) {
  req.session.destroy(function () {
    res.redirect("/login");
  });
});

app.post("/api/contact", function (req, res) {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const message = String(req.body.message || "").trim();
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Fill in all fields." });
  }
  db.prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)").run(
    name,
    email,
    message
  );
  res.json({ ok: true });
});

app.get("/api/messages", loginRequired, function (req, res) {
  const rows = db.prepare("SELECT id, name, email, message FROM messages ORDER BY id").all();
  res.json(rows);
});

app.get("/inbox", loginRequired, function (req, res) {
  const messages = db
    .prepare("SELECT id, name, email, message FROM messages ORDER BY id")
    .all();
  res.render("inbox", { messages: messages });
});

app.post("/inbox/delete/:id", loginRequired, function (req, res) {
  db.prepare("DELETE FROM messages WHERE id = ?").run(Number(req.params.id));
  res.redirect("/inbox");
});

app.get("/inbox/edit/:id", loginRequired, function (req, res) {
  const item = db
    .prepare("SELECT id, name, email, message FROM messages WHERE id = ?")
    .get(Number(req.params.id));
  if (!item) {
    return res.redirect("/inbox");
  }
  res.render("edit", { item: item });
});

app.post("/inbox/edit/:id", loginRequired, function (req, res) {
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim();
  const message = String(req.body.message || "").trim();
  if (name && email && message) {
    db.prepare(
      "UPDATE messages SET name = ?, email = ?, message = ? WHERE id = ?"
    ).run(name, email, message, Number(req.params.id));
  }
  res.redirect("/inbox");
});

app.use(express.static(SITE));

app.listen(5001, "127.0.0.1", function () {
  console.log("Express running at http://127.0.0.1:5001");
});
