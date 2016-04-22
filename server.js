// server.js
pry = require('pryjs')
const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
// const generateId = require('./lib/generate_id');
var votes = {};

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.locals.polls = {};

app.get('/', (request, response) => {
  // response.sendFile(path.join(__dirname, '/static/index.html'));
  response.render('index');
});


app.get('/polls/:id/:adminId', function(req, res){
  console.log("POLL ID: " + req.query.id);
  var poll = app.locals.polls[req.params.id];
  // eval(pry.it)
  res.render('_admin_poll', {poll: app.locals.polls[req.query.id], id: req.params.id, adminID: req.params.adminId, votes: countVotes(poll)});
})

app.get('/poll/:id', (request, response) => {
  var poll = app.locals.polls[request.params.id];

  response.render('_open_poll.ejs', { poll: poll });
});

const port = process.env.PORT || 3000;

const server = http.createServer(app)
                 .listen(port, function () {
                    console.log('Listening on port ' + port + '.');
                  });

const socketIo = require('socket.io');
const io = socketIo(server);

io.on('connection', function (socket) {
  console.log('A user has connected.', io.engine.clientsCount);

  io.sockets.emit('usersConnected', io.engine.clientsCount);

  socket.emit('statusMessage', 'You have connected.');

  socket.on('disconnect', function () {
    console.log('A user has disconnected.', io.engine.clientsCount);
    delete votes[socket.id];
    console.log(votes);
    io.sockets.emit('usersConnected', io.engine.clientsCount);
  });

  socket.on('message', function (channel, message) {
    if (channel === 'voteCast') {
      votes[socket.id] = message;
      socket.emit('voteReceived', message);
      io.sockets.emit('tally', countVotes(votes));
    }
    if (channel === 'createPoll') {
      app.locals.polls[message["pollId"]] = message;
    }
  });
});

function countVotes(votes) {
  var voteCount = {
      A: 0,
      B: 0,
      C: 0,
      D: 0
  };
  for (var vote in votes) {
    voteCount[votes[vote]]++
  }
  return voteCount;
}



module.exports = server;
