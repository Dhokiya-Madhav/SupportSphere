const express = require('express');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer')
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
const { fundRaiser } = require("./models/fundRaiserDetails.js")
const { Payment } = require("./models/payment.js")

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

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {

      const user1 = await user.findOne({ email });
      if (!user1) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const isPasswordValid = await bcrypt.compare(password, user1.password);

      if (isPasswordValid) {
        return res.status(200).json({ message: "Login successful", data: { email: email } });
      } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get('/user-profile/:email', async (req, res) => {
    try {
      const userEmail = req.params.email;
      const userGet = await user.findOne({ email: userEmail });

      if (!userGet) {
        return res.status(404).json({ status: 'error', error: 'User not found' });
      }
      res.status(200).json({
        username: userGet.username,
        email: userGet.email,
        city: userGet.city,
        phoneNumber: userGet.phoneNumber,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
  });

  app.put('/user-profile-update/:email', async (req, res) => {
    try {
      const userEmail = req.params.email;
      const updatedData = req.body;
      const result = await user.findOneAndUpdate({ email: userEmail }, updatedData, { new: true });

      if (!result) {
        return res.status(404).json({ status: 'error', error: 'User not found' });
      }

      res.status(200).json(result);
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
  });

  app.post('/submitFundRaiser', async (req, res) => {
    const formData = req.body;
    try {
      const savedFormData = await fundRaiser.create(formData);
      res.status(200).json({ message: 'Form data saved successfully', data: savedFormData });
    } catch (error) {
      console.error('Error saving form data to MongoDB Atlas:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get("/myfundraiser/:urEmail", async (req, res) => {
    try {
      const urEmail = req.params.urEmail;
      const fundraisers = await fundRaiser.find({ "fundRaiser.urEmail": urEmail });

      if (!fundraisers || fundraisers.length === 0) {
        return res.status(404).json({ error: "Fundraisers not found for the given urEmail" });
      }

      res.json(fundraisers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.get('/fund-raiser/:id', async (req, res) => {
    const fundRaiserId = req.params.id;
    try {
      const result = await fundRaiser.findById(fundRaiserId);

      if (!result) {
        return res.status(404).json({ error: 'Fund raiser not found' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/getall', async (req, res) => {
    try {
      const fundraisers = await fundRaiser.find();
      res.json(fundraisers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/updateFundraisers/:id', async (req, res) => {
    try {
      const fundraiser = await fundRaiser.findById(req.params.id);

      if (!fundraiser) {
        return res.status(404).json({ error: 'Fundraiser not found' });
      }
      res.json(fundraiser);
    } catch (error) {
      console.error('Error fetching fundraiser:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.put('/api/updateFundRaiser/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const updatedFundRaiser = await fundRaiser.findByIdAndUpdate(id, req.body, { new: true });

      if (!updatedFundRaiser) {
        return res.status(404).json({ error: 'Fundraiser not found' });
      }

      res.json(updatedFundRaiser);
    } catch (error) {
      console.error('Error updating fundraiser:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/store-payment', async (req, res) => {
    try {
      const { name, phoneNumber, amount, fundRaiserId } = req.body;


      const data = await Payment.create({ name, phoneNumber, amount, fundRaiserId });
      if (data) {
        res.status(201).json(data);
      }

    } catch (error) {
      console.error('Error storing data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/payment-details/:id', async (req, res) => {
    const fundRaiserId = req.params.id;
    try {
      const result = await Payment.find({ fundRaiserId: fundRaiserId });

      if (!result) {
        return res.status(404).json({ error: 'Fund raiser not found' });
      }
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get("/trending", async (req, res) => {
    try {
      const fundraisers = await fundRaiser.find({
        "fundRaiser.amount": { $gt: 500000 },
      });

      res.json(fundraisers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.delete("/delete-fundraiser/:id", async (req, res) => {
    try {
      const deletedFundraiser = await fundRaiser.findByIdAndDelete(req.params.id);

      if (!deletedFundraiser) {
        return res.status(404).json({ message: "Fundraiser not found" });
      }

      res.json({ message: "Fundraiser deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.post("/send-email", async (req, res) => {
    try {
      const userData = await user.findOne({ email: req.body.email });
      if (!userData) {
        return res.status(404).json({ message: "User not found" });
      }

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "madhavdhokiya7069@gmail.com",
          pass: "fipkxcmktoixpsad",
        },
      });

      const resetLink = `http://localhost:3000/reset-password/`;
      const mailOptions = {
        from: "madhavdhokiya7069@gmail.com",
        to: req.body.email,
        subject: "Support-Sphere Password Reset Link",
        html: `<p>You have requested a password reset. Click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Email could not be sent", error });
        }
        res.status(200).json({ message: "Email sent successfully", info });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put('/resetPassword', async (req, res) => {
    try {
      const email = req.body.email;
      const newPassword = req.body.psw;
      const foundUser = await user.findOne({ email });

      if (!foundUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      foundUser.password = hashedPassword;
      await foundUser.save();
      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
}

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});