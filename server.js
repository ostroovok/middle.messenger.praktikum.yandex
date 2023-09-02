const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path(__dirname, 'dist')));

app.listen(PORT, () => {
    console.log(`Приложение запущено! Порт: ${PORT}!`);
}); 