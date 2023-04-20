const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const connectDB = require('../config/db');

// connect to db
connectDB();

// middleware
app.use((req, res, next) => {
	console.log(`Incoming request: ${req.method} ${req.url}`);
	next();
});

app.use(express.static(path.join(__dirname, '../public')));

// serve index.html to all endpoints (spa)
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// binds to port to listen for any connections
const server = app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});

// on unhandledRejection error close server with exit code 1
process.on('unhandledRejection', err => {
	console.log(`An error occurred:  ${err.message}`);
	server.close(() => process.exit(1));
});