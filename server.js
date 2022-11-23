const app = require("./app");

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log("Server running. Use our API on port: 3000");
});
