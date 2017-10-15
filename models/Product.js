const mongoose = require('mongoose');

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

const Product = mongoose.model('Product', productSchema);

module.exports = Product;