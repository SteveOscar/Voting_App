
var closePoll = document.getElementById('close-poll');

closePoll.addEventListener('click', function () {
  console.log("Closing: " + this.dataset.id);
  socket.send('closePoll', this.dataset.id);
});
