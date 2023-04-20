const Mongoose = require('mongoose');
const uri = 'mongodb+srv://wdrgibson:ommanipadmehum3@cluster0.odup4vd.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
	await Mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log('MongoDB Connected');
};
module.exports = connectDB;