var buttons = document.getElementsByClassName('poll-button');

// test.addEventListener('click', function() {
//   console.log('Button Pressed!');
// });

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    console.log('Voted for ' + this.innerText)
    debugger
    socket.send('voteCast', [this.id, this.innerText]);
  });
}
