const mongoose = require('../db/mongoose');

const productSchema = new mongoose.Schema({
	model: String,
	mtype: String,
	features:
	[
		{field: String, value: String}
	],
	description: 
	[
		{field: String, value: String}
	]
});

const Product = mongoose.model('Book', productSchema);

module.exports = Product;