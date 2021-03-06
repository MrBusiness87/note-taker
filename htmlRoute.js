var path = require("path");

module.exports = function (router) {

  router.get("../assets/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"));
  });

  router.get("../assets/js/index.js", function (req, res) {
    res.sendFile(path.join(__dirname, "./assets/js/index.js"))
  });
  router.get("../assets/css/styles.css", function (req, res) {
    res.sendFile(path.join(__dirname, "./assets/css/styles.css"))
  });

  router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
}