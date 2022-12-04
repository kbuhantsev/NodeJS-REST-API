const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");

// Создай папку tmp в корне проекта и сохраняй в неё загруженную аватарку.

// Обработай аватарку пакетом jimp и задай для нее размеры 250 на 250

// Перенеси аватарку пользователя из папки tmp в папку public / avatars и дай ей уникальное
// имя для конкретного пользователя.

// Полученный URL / avatars / <имя файла с расширением> сохрани в поле avatarURL пользователя

const updateAvatar = async (req, res) => {
  try {
    const { path: tempUpload, originalname } = req.file;
    console.log(tempUpload);
    console.log(originalname);
  } catch (error) {}

  res.status(201).json({ avatarURL: "тут будет ссылка на изображение" });
};

module.exports = updateAvatar;
