const express = require('express');
// const favicon = require('serve-favicon');
// const path = require('path');
const mongoose = require('./db/mongoose');
const Product = require('./models/Product');
const bp = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')));
app.use(bp.urlencoded({ extended: true }))
app.use(bp.json())
app.set('view engine', 'pug');
app.use(express.static('public'))

app.get('/', (req, res)=>{
	res.render('index');
});

app.get('/product', (req, res)=>{
	Product.findOne({mtype: 'автовоз'}, function(err, items) {
		res.render('product', {items});
	});

})

app.get('/del', (req, res)=>{
	Product.findOneAndRemove({model: req.query.model}, function(err, result) {
		res.send('deleted');
	});
})

app.get('/drop', (req, res)=>{
	mongoose.connection.db.dropDatabase(()=>{
		res.send('database has been dropped');
	});
})

app.post('/add', (req, res)=>{
	const {model, mtype, desc, feat, field, value} = req.body;
	if (desc){
		Product.update({model}, {$push: {description: {field, value}}}, function(err, result) {
			res.send('desc saved');
		});
	}else if(feat){
		Product.update({model}, {$push: {features: {field, value}}}, function(err, result) {
			res.send('features saved');
		});
	}else if(mtype){
		Product.update({model}, {$set: {mtype}}, function(err, result) {
			res.send('mtype saved');
		});
	}else{
		new Product({model}).save(function(err, result) {
			res.send('product saved');
		});
	}
});

app.get('/getlist', (req, res)=>{
	Product.find({}, function(err, items) {
		res.send(items);
	})
})

app.get('/price', (req, res)=>{
	res.sendFile(`${__dirname}/public/static/pricelist.ppt`);
});

// app.get('/:page?', (req,res)=>{
// 	if (req.params.page){
// 		res.redirect('/');
// 	}
// });

app.listen(port, ()=>{
	console.log('Server is running...');
});