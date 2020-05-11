// Otetaan tarvittavat moduulit käyttöön
// Including necessary modules
var mongoose = require("mongoose");
var express = require("express");
var cors = require("cors");
var app = express();

// This is needed to deploy the app on Heroku
// Tämä pitää tehdä, että Heroku toimii
var path = require("path");
app.use(express.static(path.join(__dirname, "myfrontend/build")));
// Enabling cors
// Laitetaan cors toimimaan
app.use(cors());
// support parsing of application/json type post data
app.use(express.json());
// Specifying the port
// Määritetään portti
const port = process.env.PORT || 5000;

// Specifying the connection address and options
// Määritetään databasen yhteys ja asetukset
var uri = "mongodb+srv://kayttaja:sala1234@cluster0-smrfa.mongodb.net/animal";
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connecting to the database
// Yhdistetään databaseen
mongoose.connect(process.env.MONGODB_URI || uri, options);

var db = mongoose.connection;

// Defining a mongoose model
// Määritetään mongoosen malli
const Animal = mongoose.model(
  "Animal",
  {
    laji: String,
    rotu: String,
    vari: String,
    nimi: String,
    ika: String,
    pvm: String,
  },

  "animal" // This is the collection that is going to be used
  // animal collectionia tullaan käyttämään tässä apissa
);

// Handling errors / success
// Hallitsee errorit ja onnistumiset
db.on("error", function () {
  console.log("Connection error!");
});

db.once("open", function () {
  console.log("Connected to the database!");
});

// parsing support
// parsii tuen
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
// Creating routes and functionalities
// Tekee reitit ja toiminnallisuudet

// Retrieving ALL animals
// Hakee kaikki eläimet tietokannasta
app.get("/api/getall", function (req, res) {
  Animal.find({}, null, function (err, results) {
    // Handling errors, returning status
    if (err) {
      res.status(500).json("Something went wrong " + err);
      console.log("Something went wrong " + err);
    }
    // success
    else {
      res.status(200).json(results);
      console.log(results);
    }
  });
});

app.get("/api/get/:id", function (req, res) {
  // Poimitaan id talteen ja välitetään se tietokannan poisto-operaatioon
  // Getting the id and sending information to the database
  var id = req.params.id;

  Animal.findById(id, function (err, results) {
    // Handling errors, returning status
    if (err) {
      res.status(500).json("Something went wrong " + err);
      console.log("Something went wrong " + err);
    }
    // success
    else {
      res.status(200).json("Found animal by id: " + results);
      console.log("Found animal " + results);
    }
  });
});

// Formatting the date to the format dd/mm/yyyy
// Määritetään että päivämäärä tulee muotoa dd/mm/yyyy
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0");
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = today.getFullYear();

today = dd + "/" + mm + "/" + yyyy;

// Luodaan uusi tallennettava olio (Animal)
// Creating a new object
app.post("/api/add", function (req, res) {
  console.log(req.body);
  var newAnimal = new Animal({
    laji: req.body.laji,
    rotu: req.body.rotu,
    vari: req.body.vari,
    nimi: req.body.nimi,
    ika: req.body.ika,
    pvm: today,
  });

  // Tallennetaan olio tietokantaan (Animal)
  // Saving the object to the database
  newAnimal.save(function (err, results) {
    // Handling errors
    if (err) {
      res.status(500).json("Something went wrong: " + err);
      console.log("Something went wrong" + err);
    }
    // Sending the succesful results back
    // Lähettää onnistuneet tulokset takaisin
    else {
      res.status(200).json("Lisätty tietokantaan: \n" + results);
      console.log("Added:" + results);
    }
  });
});

// Muokataan eläimen tietoja id-numeron perusteella.
// Editing Animal information with id-number
app.put("/api/update/:id", function (req, res) {
  // Poimitaan id talteen
  // Collection id
  var id = req.params.id;

  Animal.findByIdAndUpdate(
    id,
    {
      laji: req.body.laji,
      rotu: req.body.rotu,
      vari: req.body.vari,
      nimi: req.body.nimi,
      ika: req.body.ika,
    },
    { new: true },
    function (err, results) {
      if (err) {
        res.status(500).json("Järjestelmässä tapahtui virhe" + err);
        console.log("Järjestelmässä tapahtui virhe" + err);
      }
      // Muuten lähetetään tietokannan tulokset selaimelle
      // Otherwise sending results of database to browser
      else {
        res.status(200).json("Päivitetty: \n" + results);
        console.log("Päivitetty: " + results);
      }
    }
  );
});

// Poistetaan eläin id:n perusteella
// Finding a animal by ID and deleting it
app.delete("/api/delete/:id", function (req, res) {
  // Poimitaan id talteen ja välitetään se tietokannan poisto-operaatioon
  // Getting the id and sending information to the database
  var id = req.params.id;

  Animal.findByIdAndDelete(id, function (err, results) {
    // Handling errors
    if (err) {
      console.log("Something went wrong: " + err);
      res.status(500).json("Something went wrong.");
    } // Handling error when there is nothing to delete with the selected id
    else if (results == null) {
      res.status(200).json("There is nothing to remove.");
      console.log("There is nothing to remove.");
    } // Successful request
    else {
      console.log("Removed animal" + results);
      res.status(200).json("Removed animal: " + results);
    }
  });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./myfrontend/build"));
}

// Web-palvelimen luonti Expressin avulla
// Making of web with Express
app.listen(port, function () {
  console.log("Using port " + port);
});
