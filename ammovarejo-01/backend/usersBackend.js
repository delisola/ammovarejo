var express = require('express');
var bodyParser = require('body-parser');

var backend = function(){
	var app = express();

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());
	app.set('port', 3412);
	app.use(express.static(__dirname));

	var users = [
		{user: 'toin', name: 'Antonio Marcos', password: '123456', permission: 3},
		{user: 'admin', name: 'Adminstrador', password: '234567', permission: 3},
		{user: 'rafa', name: 'Rafaela Castro', password: '345678', permission: 2},
		{user: 'tati', name: 'Tatiana Molman', password: '456789', permission: 1},
		{user: 'pe', name: 'Gustavo Pedregulho', password: '567890', permission: 0}
	];

	app.listen(app.get('port'), function(){
		console.log('BANCO RODANDO NA PORTA:', app.get('port'));
	});

	app.all('*', function(req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	  res.header('Access-Control-Allow-Headers', 'Content-Type');
	  next();
	});

	app.get('/users', function(req, res) {
	  res.json(users);
	});
}

module.exports = new backend();