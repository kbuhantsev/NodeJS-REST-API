const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) => {
  try {
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error(error);
  }
};

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
  return contacts.find((element) => element.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const contact = { id: nanoid(5), ...body };
  contacts.push(contact);
  await updateContacts(contacts);
  return contact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  Object.assign(contact, body);
  await updateContacts(contacts);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
