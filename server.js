const express = require("express");
const apiRoutes = require("./apiRoutes.js")
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static('public'));

app.use("/api", apiRoutes);
require("./htmlRoute")(app);

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});