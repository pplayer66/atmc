const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	model: {type:String, trim:true},
	mtype: {type:String, trim:true},
	features:
	[
		{field: {type:String, trim:true}, value: {type:String, trim:true}}
	],
	description: 
	[
		{field: {type:String, trim:true}, value: {type:String, trim:true}}
	]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;