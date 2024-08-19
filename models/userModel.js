const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  pic: {
    type: String,
    default: "https://res.cloudinary.com/dungnguyen25/image/upload/v1679318563/avatar-default/143086968_2856368904622192_1959732218791162458_n_edneps.png",
  },
  picId: {
    type: String,
    default: "",
  },
  googleId: {
    type: String,
    default: "",
  },
  secret: {
    type: String,
    default: "",
  },
  number: {
    type: String,
  },
  address: {
    type: String,
    default: "",
  },
  password: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin", "super-admin"],
    default: "user",
  },
}, { timestamps: true });


// encrypting password before saving
userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcrypt.hash(this.password, 10);
});



// verify password
userSchema.methods.comparePassword = async function (yourPassword) {
  return await bcrypt.compare(yourPassword, this.password);
}

// get the token
userSchema.methods.jwtGenerateToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: 3600
  });
}


module.exports = mongoose.model("users", userSchema);