const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const registerSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// Define a static method to build instances of the model
registerSchema.statics.build = function(attributes) {
  return new userRegister(attributes);
};

// Static method to hash a password with a salt
registerSchema.statics.hashPassword = async function(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

// Static method to compare a hashed password during login
registerSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Create a Mongoose model based on the schema
const userRegister = mongoose.model('Users', registerSchema);

module.exports = userRegister;
