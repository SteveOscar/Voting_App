var buttons = document.getElementsByClassName('poll-button');

// test.addEventListener('click', function() {
//   console.log('Button Pressed!');
// });

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    console.log('Voted for ' + this.innerText)
    socket.send('voteCast', this.innerText);
  });
}
