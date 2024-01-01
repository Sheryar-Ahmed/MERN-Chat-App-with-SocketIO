import mongoose from 'mongoose';

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
      },
    },
  }
);

// Define a static method to build instances of the model
registerSchema.statics.build = (attributes) => {
  return new Register(attributes);
};

// Create a Mongoose model based on the schema
const Register = mongoose.model('Register', registerSchema);

export { Register };
