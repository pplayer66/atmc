const express = require('express');
// const favicon = require('serve-favicon');
// const path = require('path');
const mongoose = require('./db/mongoose');
const Product = require('./models/Product');

const app = express();
const port = process.env.PORT || 3000;

// app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')));
app.set('view engine', 'pug');
app.use(express.static('public'))

app.get('/', (req, res)=>{
	res.render('index');
});

// function loadData() {
// 	if (descr.length) {
// 		const {field, value} = descr.shift().split(': ');
// 		axios.get(`http://atmc2.herokuapp.com/update?model=${array[0]}&field=${field}&value=${value}`).then(function(resp) {
// 			if (resp)
// 				return loadData();
// 		})
// 	}else{
// 		return;
// 	}
// };

app.get('/drop', (req, res)=>{
	mongoose.connection.db.dropDatabase(()=>{
		res.send('database has been dropped');
	});
})

app.get('/add', (req, res)=>{
	const {model, feat, desc, mtype} = req.query;
	if (desc){
		Product.findOneAndUpdate({model}, {$push: {description: {field, value}}}, function(err, descr) {
			res.send('ok');
		});
	}else if (feat){
		Product.findOneAndUpdate({model}, {$push: {description: {field, value}}}, function(err, feature) {
			res.send('ok');
		});
	}else if (mtype){
		Product.findOneAndUpdate({model}, {$set: {mtype}}, function(err, mtype) {
			res.send('ok');
		});
	}else{
		new Product({model}).save(function(err, result) {
			res.send('ok');
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