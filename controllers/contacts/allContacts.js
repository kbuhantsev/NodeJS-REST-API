const { listContacts } = require("../../service/contacts");

const allContacts = async (_, res) => {
  const contacts = await listContacts();
  res.json(contacts);
};

module.exports = {
  allContacts,
};
