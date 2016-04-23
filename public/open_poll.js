var buttons = document.getElementsByClassName('poll-button');
var thisPoll = document.getElementById('this-poll-status');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    console.log('Voted for ' + this.innerText);
    socket.send('voteCast', [this.id, this.innerText]);
  });
}

socket.on('close', function (pollId) {
  if (thisPoll.dataset.id === pollId) {
    thisPoll.innerText = 'closed';
  }
});
