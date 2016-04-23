var buttons = document.getElementsByClassName('poll-button');

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    console.log('Voted for ' + this.innerText);
    socket.send('voteCast', [this.id, this.innerText]);
  });
}
