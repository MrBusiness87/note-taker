const fs = require("fs")
const path = require("path");

var noteData;

module.exports = function (app) {
  fs.readFile("./db/db.json", "utf8", function (err, data) {
    if (err) throw err;
    noteData = JSON.parse(data);
  })

  app.get("/api/notes", function (req, res) {
    res.json(noteData);
  });

  app.post("/api/notes", function (req, res) {

    fs.readFile("./db/db.json", "utf8", function (err, data) {
      if (err) throw err;
      noteData = JSON.parse(data);
      const currIndex = noteData[noteData.length - 1].id
      console.log("test");
      var newNote = req.body;
      newNote.id = currIndex + 1;

      noteData.push(newNote);
      let parsedata = JSON.stringify(noteData)
      fs.writeFile(path.join('./db/db.json'), parsedata, (err) => {
        if (err) throw err;
      })
      res.json(noteData);
    })
  });

  app.delete("/api/notes/:id", function (req, res) {
    console.log("delete");
    var deleteData = parseInt(req.params.id);
    console.log(deleteData)
    fs.readFile("./db/db.json", "utf8", function (err, data) {
      if (err) throw err;
      noteData = JSON.parse(data);
      for (let i = 0; i < noteData.length; i++) {
        if (deleteData === noteData[i].id) {
          noteData.splice(i, 1)
        };
      };
      let parsedata = JSON.stringify(noteData)
      fs.writeFile(path.join(__dirname, 'db/db.json'), parsedata, (err) => {
        if (err) throw err;
      })
      console.log(noteData)
      res.json(noteData)
    })
  })
}