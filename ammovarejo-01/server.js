var express = require('express');
var open    = require('open');
var bd      = require('./backend/usersBackend.js');
var app     = express();

bd.backend;

app.set('port', 4000);
app.set("view options", {
	layout: false
});
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname));

app.get('/', function(req, res){
	res.render('index.html');
});

var server = app.listen(app.get('port'), function(){
	console.log('SERVER ONLINE: localhost:' + server.address().port );
	open('http://localhost:' + server.address().port );
});