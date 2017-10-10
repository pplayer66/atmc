const express = require('express');
var fs = require('fs');
// const favicon = require('serve-favicon');
const path = require('path');
const Product = require('./models/Product');

const app = express();
const port = process.env.PORT || 3000;

// app.use(favicon(path.join(__dirname, 'favicon', 'favicon.ico')));
app.set('view engine', 'pug');
app.use(express.static('public'))

app.get('/', (req, res)=>{
	res.render('index');
});

function loadData() {
	if (descr.length) {
		const {field, value} = descr.shift().split(': ');
		axios(`/update?model=${array[0]}&field=${field}&value=${value}`).then(function(resp) {
			if (resp)
				return loadData();
		})
	}else{
		return;
	}
};

app.get('/makearray', (req, res)=>{
	fs.readFile('./features.txt', function(err, f){
	    var array = f.toString().split('&');
	    var i = 3;
	    var newarr = [];
	    console.log(array);
	  	var descr = array[3].split('\n').map(function(el) {
	  		return el.trim();
	  	})
	  	console.log(descr);
	    axios.get(`/add?model=${array[0]}`).then((resp)=>{
	    	loadData();
	    }).catch(function(err) {
	    	console.log(err);
	    })
	});
})


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