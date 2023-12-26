const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  fundRaiserId: {type: mongoose.Schema.Types.ObjectId,required:true}
});
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {Payment};
