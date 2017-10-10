const axios = require('axios');
const fs  = require("fs");

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