import express from 'express';
const app = express();

app.get('/', (req, res) => res.send('hi there'));

app.listen(5100, () => {
	console.log('server running..');
});
