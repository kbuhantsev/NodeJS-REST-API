const { Contact } = require("../../models/contact");

const allContacts = async (req, res) => {
  const user = req.user;
  const { page = 1, limit = 10, favorite } = req.query;

  const favoriteFilter = {};
  if (favorite) {
    favoriteFilter.favorite = favorite;
  }
  const skip = page === 1 ? 0 : limit * (page - 1);
  const contacts = await Contact.find({
    owner: user._id,
    ...favoriteFilter,
  })
    .skip(skip)
    .limit(Number(limit));
  res.json(contacts);
};

module.exports = allContacts;
