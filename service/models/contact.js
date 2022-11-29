const { Schema, model } = require("mongoose");

const contact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name for contact is required"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contact);

module.exports = Contact;
