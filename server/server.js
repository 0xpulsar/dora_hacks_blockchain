var express = require("express");
var app = express();
var body_parser = require("body-parser");
app.use(body_parser.json());

var config = {
  apiKey: "AIzaSyDS18k-EBnMfdYSsu5zyNKw2WKOmDccE8M",
  authDomain: "dorahacks-46355.firebaseapp.com",
  databaseURL: "https://dorahacks-46355.firebaseio.com",
  projectId: "dorahacks-46355",
  storageBucket: "dorahacks-46355.appspot.com",
  messagingSenderId: "866832139187"
};
const firebase = require("firebase");
firebase.initializeApp(config);
let database = firebase.database();

app.all("/*", function(req, res, next) {
  // we need this to work properly // do not delete this
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, GET");
  next();
});

app.post("/getUrls", function(req, res) {
  var data = req.body;
  var uid = data.uid;
  var arr = [];
  console.log(uid);
  database
    .ref("/users/" + uid)
    .once("value")
    .then(function(snapshot) {
      if (snapshot.val() == null) res.status(500).send("x");

      var shot = snapshot.val();
      var DAT = shot.data;
      for (var ele in DAT) {
        arr.push(DAT[ele]);
      }
      res.status(200).send(arr);
    })
    .catch(error => {
      res.status(500).send({error:"x"});
    });
});
app.get("/data", (req, res) => {
  res.status(200).send("hi");
});

app.listen(55667);

// database.ref("/dskhdkhkh" + "/data").once("value", result => {
//   let dataarr = result.val();

//   console.log(dataarr);
// });
