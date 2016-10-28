const fs = require("fs");
const hbs = require("hbs");
const express = require("express");
const app = express();

const content = require("./content.js");

const port = process.env.PORT || 3000;

console.log(content);

app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "/n", err => {
    if (err) console.log("Unable to append to server.log.");
  });
  next();
});

if (false) {
  app.use((req, res, next) => {
    res.render("index.hbs", {
      pageTitle: "We'll be back shortly!",
      pageContent: "Site under maintenance."
    });
  });
}

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("currentYear", () => new Date().getFullYear());
hbs.registerHelper("capitalize", text => text.toUpperCase());

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index.hbs", content.home);
});

app.get("/projects", (req, res) => {
  res.render("index.hbs", content.projects);
})

app.get("/about", (req, res) => {
  res.render("index.hbs", content.about);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
