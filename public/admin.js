var thisPoll = document.getElementById('this-poll-status');
var closePoll = document.getElementById('close-poll');

closePoll.addEventListener('click', function () {
  console.log("Closing: " + this.dataset.id);
  this.innerText = "Poll Closed";
  socket.send('closePoll', this.dataset.id);
});

socket.on('close', function (pollId) {
  if (thisPoll.dataset.id === pollId.toString()) {
    thisPoll.innerText = 'Closed';
    closePoll.innerText = "Poll Closed";
    for (var i = 0; i < buttons.length; i++) {buttons[i].className += " disabled";}
  }
});
