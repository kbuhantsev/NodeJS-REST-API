const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.normalize("models/contacts.json");

const listContacts = async () => {
  try {
    const text = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(text);
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((element) => element.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filteredContacts = contacts.filter(
    (element) => element.id !== contactId
  );
  try {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      "utf-8"
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  const contact = { id: nanoid(5), name, email, phone };
  contacts.push(contact);
  try {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
    return contact;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  Object.assign(contact, body);
  try {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
    return contact;
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
