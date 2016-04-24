var buttons = document.getElementsByClassName('poll-button');
var thisPoll = document.getElementById('this-poll-status');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    if (thisPoll.innerText === 'open') {
      socket.send('voteCast', [this.id, this.innerText]);
    } else {
      alert("Poll has been closed by the admin");
    }
  });
}

socket.on('close', function (pollId) {
  if (thisPoll.dataset.id === pollId) {
    thisPoll.innerText = 'closed';
    for (var i = 0; i < buttons.length; i++) {buttons[i].className += " disabled";};
  }
});
