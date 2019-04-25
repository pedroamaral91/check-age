const express = require("express");
const routes = express.Router();

routes.get("/", (req, res) => {
  return res.render("index");
});

const checkIfAgeExists = (req, res, next) => {
  const { age } = req.query;
  if (!age || age <= 0) {
    return res.redirect("/");
  }
  return next();
};

routes.get("/major", checkIfAgeExists, (req, res) => {
  const { age } = req.query;
  return res.render("major", { age });
});

routes.get("/minor", checkIfAgeExists, (req, res) => {
  const { age } = req.query;
  return res.render("minor", { age });
});

routes.post("/check", (req, res) => {
  const { age } = req.body;
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`);
  }
  return res.redirect(`/minor?age=${age}`);
});

module.exports = routes;
