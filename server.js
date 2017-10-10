const express = require('express');
// const favicon = require('serve-favicon');
const path = require('path');
const fs = require('fs');
const Product = require('./models/Product');

const app = express();
const port = process.env.PORT || 3000;

// app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')));
app.set('view engine', 'pug');
app.use(express.static('public'))

app.get('/', (req, res)=>{
	res.render('index');
});

app.get('/add', (req, res)=>{
	console.log('asdas');
	var product = new Product({model: req.query.model});
	product.save((err, result)=>{
		res.send(result);
	})
});

app.get('/update', (req, res)=>{
	const {model, field, value} = req.query;
	Product.update({model}, {$push: {description: {field, value} } }, (err, result)=>{
			if (err)
				return console.log(err);
			res.send(result);
	});
})

app.get('/getlist', (req, res)=>{
	Product.find({model: 'Автокран ZLJ5322JQZ30V'}, function(err, items) {
		res.send(items);
	})
})

app.get('/price', (req, res)=>{
	res.sendFile(`${__dirname}/public/static/pricelist.ppt`);
});

app.get('/:page?', (req,res)=>{
	if (req.params.page){
		res.redirect('/');
	}
});

app.listen(port, ()=>{
	console.log('Server is running...');
});