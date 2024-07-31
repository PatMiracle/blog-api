const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    name: {
      first: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 1,
        trim: true,
      },
      last: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 1,
        trim: true,
      },
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      minlength: 6,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

userSchema.virtual("fullName").get(() => {
  return this.name.first + " " + this.name.last; //concatenate first & last names.
});

module.exports = mongoose.model("User", userSchema);
