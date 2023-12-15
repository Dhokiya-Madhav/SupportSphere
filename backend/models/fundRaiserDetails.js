const mongoose = require("mongoose");

const fundRaiserDetails = new mongoose.Schema({
    fundRaiser: {
        amount: String,
        fundRaiserTitle: String,
        fundRaiseFor: String,
        employmentStatus: String,
        image: String,
        urEmail: String
    },
    patientDetails: {
        Name: String,
        age: String,
        condition: String,
        hospitalName: String,
        city: String,
    },
    whyFundRaiser: {
        story: String,
        gdrive: String,
    },
    paymentDetails: {
      bankName: String,
      accountNo: String,
      ifscCode: String,
      upiId: String,
    }   
},
    {
        collection: 'fund-raiser',
    }
);
const fundRaiser = mongoose.model("Fund raiser Info", fundRaiserDetails);
module.exports = { fundRaiser }