const mongoose = require("mongoose");
const validator = require("validator")

// Define a schema (blueprint)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,   // Must provide a name
      trim: true        // Remove spaces around the string
    },
    email: {
      type: String,
      required: true,
      unique: true,     // Prevent duplicate emails
      lowercase: true,  // Always save in lowercase
      trim: true,
      validate(value){
        if(!validator.isEmail(value)){
          throw new Error("Invalid email address : " + value);
        }
      }
    },
    age: {
      type: Number,
      min: 1,           // Minimum age
      max: 120          // Maximum age
    },
    password: {
      type: String,
      required: true,   // Must have a password
      minlength: 6      // Basic validation
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"], // Allowed values
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    photoUrl:{
      type:String
    },
    skills:{
      type:[String]
    }
  },
  {
    timestamps: true // Automatically adds createdAt & updatedAt
  }
);

// Create a Model (used to query the DB)
const User = mongoose.model("User", userSchema);

module.exports = User;
