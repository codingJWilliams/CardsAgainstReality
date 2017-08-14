var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jsonfile = require('jsonfile')
var file = 'storage/games.json'
var rs = require("randomstring");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/lobby.html');
});
app.get("/party-settings/", function(req, res){
  res.sendFile(__dirname + "/html/party-settings.html")
})
function generateGameCode(){
  return "CAH-" + rs.generate({
    "length": 4,
    "charset": "ABCDEFGHJKPQRSTWXYZabcdefghjkpqrstwxyz123456789-_"
  })
}
app.get("/new-game/", function (req, res){
  var games = jsonfile.readFileSync(file);
  var nsfw = req.query.nsfw;
  games.concat([{code: generateGameCode(), nsfw: nsfw}])
})
io.on('connection', function(socket){
  console.log('User joined your channel');
  socket.on("join-game")
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
