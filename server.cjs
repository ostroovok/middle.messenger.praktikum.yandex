const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.resolve(process.cwd(), 'dist')));

app.get('*', (_, res) => {
	res.sendFile(path.join(path.resolve(process.cwd(), 'dist'), 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Приложение запущено! Порт: ${PORT}!`);
});
