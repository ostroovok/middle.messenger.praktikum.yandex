const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(process.cwd(), "dist")));

// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist/index.html"));
// });

app.listen(PORT, () => {
  console.log(`Приложение запущено! Порт: ${PORT}!`);
});
