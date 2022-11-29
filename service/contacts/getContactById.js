const Contact = require("../models/contact");
const { NotFound } = require("http-errors");

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);
  if (!result) {
    throw NotFound(`Can not find contact with ID:${contactId}`);
  }
  return result;
  // return await Contact.findOne({ _id: contactId });
};

module.exports = getContactById;
