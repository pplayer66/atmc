const fs = require('fs');
var qs = require('qs');
const axios = require('axios');

fs.readFile('./model.txt', function(err, content) {
	var arr = content.toString().split('&').map(function(item) {
		return item.replace(/[\n\r]/g, '');
	});
	// var desc = arr[3].split('@');
	axios.post('http://atmc2.herokuapp.com/add', {model: arr[0]}).then(function(result) {
		console.log(result.data);
	});

});