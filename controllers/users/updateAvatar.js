const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const targetFolder = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: temporaryName, originalname } = req.file;

  await Jimp.read(temporaryName)
    .then((image) => {
      image.resize(Jimp.AUTO, 250, (_, image) => {
        image.quality(90, (_, image) => {
          image.write(temporaryName);
        });
      });
    })
    .catch((error) => {
      next(error);
    });

  const { _id: id } = req.user;
  const newName = id + "_" + originalname;
  try {
    await fs.rename(temporaryName, path.join(targetFolder, newName));
    const avatarURL = path.join("public", "avatars", newName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(temporaryName);
    next(error);
  }
};

module.exports = updateAvatar;
