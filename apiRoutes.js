const fs = require("fs")
const path = require("path");

const router = require("express").Router();
var noteData;


fs.readFile("./db/db.json", "utf8", function (err, data) {
  if (err) throw err;
  noteData = JSON.parse(data);
})

router.get("/notes", function (req, res) {
  res.json(noteData);
});


router.post("/notes", function (req, res) {
  console.log("post");
  var newNote = req.body;
  noteData.push(newNote);
  let parsedata = JSON.stringify(noteData)
  fs.writeFile(path.join('./db/db.json'), parsedata, (err) => {
    if (err) throw err;
  })
  res.json(noteData);
});

router.delete("/notes/:id", function (req, res) {
  console.log("delete");
  var deleteData = req.params.id;
  console.log(deleteData)
  for (let i = 0; i < noteData.length; i++) {
    if (deleteData === noteData[i].title) {
      noteData.splice(i, 1)
    };
  };
  let parsedata = JSON.stringify(noteData)
  fs.writeFile(path.join(__dirname, '/db/db.json'), parsedata, (err) => {
    if (err) throw err;
  })
  console.log(noteData)
  res.json(noteData)
})

module.exports = router