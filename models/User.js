const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, minlength: 3, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, required: true, minlength: 6 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.virtual("fullName").get(() => {
  return this.firstName + this.lastName; //concatenate first & last names.
});

module.exports = mongoose.model("User", userSchema);
