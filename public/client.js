var socket = io();
// var $ = require('jQuery');
var connectionCount = document.getElementById('connection-count');
var statusMessage = document.getElementById('status-message');
var confirmation = document.getElementById('vote-confirmation');
var submitPoll = document.getElementById('submitPoll');
var form = document.getElementById('form');

submitPoll.addEventListener('click', function () {
  var poll = $('#form :input');
  var values = {};
  poll.each(function() {
      values[this.name] = $(this).val();
  });
  values["pollId"] = Math.floor((Math.random() * 10000000) + 1);
  var adminId = values["adminId"];
  socket.send('createPoll', values);
  window.location.replace('/polls/' + values["pollId"] + "/" + adminId + "?id=" + values["pollId"]);
});

function formatTally(tally) {
  for (var vote in tally) {
      if (tally.hasOwnProperty(vote)) {
          var line = document.getElementById(vote);
          line.innerText ='Option ' + vote + ' votes: ' + tally[vote]
      }
  }
}

socket.on('usersConnected', function (count) {

  // connectionCount.innerText = 'Connected Users: ' + count;
});

socket.on('statusMessage', function (message) {
  // statusMessage.innerText = 'Connected Users: ' + message;
});

socket.on('voteCount', function (votes) {
  console.log(votes);
});

socket.on('voteReceived', function (message) {
  // confirmation.innerText = 'Your vote was caste for: ' + message;
});

socket.on('tally', function (votes) {
  formatTally(votes);
});

var buttons = document.querySelectorAll('#choices button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    console.log('Voted for ' + this.innerText)
    socket.send('voteCast', this.innerText);
  });
}
