const fs = require('fs');
const axios = require('axios');

fs.readFile('./model.txt', function(err, content) {
	var arr = content.toString().split('&').map(function(item) {
		return item.replace(/[\n\r]/g, '');
	});
	var desc = arr[3].split('\n');
	axios.get(`http://atmc2.herokuapp.com/add?model=asdf`).then(function(result) {
		console.log(result.data);
		// var descTrimed = desc.map(function(item) {
		// 	return {field: item.split(':').shift(), value: item[0]}
		// });
		// console.log(descTrimed);
	});
});