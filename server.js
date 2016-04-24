// server.js
pry = require('pryjs')
const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const beginTimer = require('./lib/timer');
var votes = {};

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.locals.polls = {};

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/polls/:id/:adminId', function(req, res){
  console.log("POLL ID: " + req.query.id);
  var poll = app.locals.polls[req.params.id];
  res.render('_admin_poll', {poll: poll, id: req.params.id, adminID: req.params.adminId, votes: countVotes(poll)});
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
      votes[socket.id] = message[0];
      socket.emit('voteReceived', message);
      io.sockets.emit('tally', countVotes(votes));
    }
    if (channel === 'createPoll') {
      var timeSpan = message["timer"] * 60
      beginTimer(timeSpan, message["pollId"], io, app);
      app.locals.polls[message["pollId"]] = message;
    }
    if (channel === 'closePoll') {
      app.locals.polls[message]["status"] = "closed";
      io.sockets.emit('close', message);
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
