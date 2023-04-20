const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGODB_URI

const connectDB = async () => {
	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}).then(() => {
		console.log('MongoDB Connected');
	}).catch(err => {
		console.error(err);
	});
};

module.exports = connectDB;