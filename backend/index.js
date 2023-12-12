const express = require('express');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '50mb' }));

const port = 5000;
const cors = require("cors");
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


mongoose.connect(

    "mongodb+srv://madhavdhokiya7069:JxnEYkaLpxUEOivb@cluster0.a1jkqnw.mongodb.net/Support-Sphere?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

const { user } = require("./models/user.js")

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", mongoConnected);

function mongoConnected() {
    console.log("Database connected");

    app.post('/signup', async (req, res) => {
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10);
          const newUser = new user({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            city: req.body.city,
            phoneNumber: req.body.phoneNumber,
          });
          const savedUser = await newUser.save();
          res.json(savedUser);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
}

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});