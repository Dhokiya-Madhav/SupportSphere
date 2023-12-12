const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    city: String,
    phoneNumber: {type:Number, unique:true},
},
{
    collection: "user",
}
);
const user = mongoose.model("UserInfo", UserSchema);
module.exports={user}