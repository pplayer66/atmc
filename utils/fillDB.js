const fs = require('fs');
const axios = require('axios');

const qs = 'http://atmc2.herokuapp.com/add';

fs.readFile('./model.txt', function(err, content) {
	var arr = content.toString().split('&').map(function(item) {
		return item.replace(/[\n\r]/g, '');
	});
	// var desc = arr[3].split('@');
	const model = arr.shift();
	const mtype = arr.shift();
	const feat = arr.shift();
	const desc = arr.shift();
	axios.post(qs, {model}).then(function(result) {
		axios.post(qs, {model, mtype}).then(function(result) {
			console.log(result.data);
			const featArr = feat.split('@');
			while(featArr.length){
				const currentFeature = featArr.shift().replace(/[\n\r]/g, '');
				const currentFeatureArr = currentFeature.split(': ');
				const field = currentFeatureArr[0];
				const value = currentFeatureArr[1].replace(/[\n\r]/g, '');
				console.log(field);
				console.log(value);
				axios.post(qs, {model, feat:'1', field, value}).then(function(result) {
					console.log(result.data);
				});
			}
			const descArr = desc.split('@');
			while(descArr.length){
				const currentDesc = descArr.shift().replace(/[\n\r]/g, '');
				const currentDescArr = currentDesc.split(': ');
				const field = currentDescArr[0];
				const value = currentDescArr[1].replace(/[\n\r]/g, '');
				console.log(field);
				console.log(value);
				axios.post(qs, {model, desc:'1', field, value}).then(function(result) {
					console.log(result.data);
				});
			}
		});
	});
});