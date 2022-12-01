const app = require("../app");
const mongoose = require("mongoose");

const { PORT = 3000, DB_HOST = "" } = process.env;

mongoose.Promise = global.Promise;

const connection = mongoose.connect(DB_HOST, {
  autoIndex: true,
});

connection
  .then(() => {
    console.log("Database connection successful");
    try {
      app.listen(PORT, function () {
        console.log(`Server running. Use our API on port: ${PORT}`);
      });
    } catch (error) {
      console.log(`Server not running. Error message: ${error.message}`);
    }
  })
  .catch((error) => {
    console.log(`Database connection failed. Error message: ${error.message}`);
    process.exit(1);
  });
