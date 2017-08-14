var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/lobby.html');
});
app.get("/party-settings/", function(req, res){
  res.sendFile(__dirname + "/html/party-settings.html")
})
io.on('connection', function(socket){
  console.log('User joined your channel');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
