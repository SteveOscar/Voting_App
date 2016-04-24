
var closePoll = document.getElementById('close-poll');

closePoll.addEventListener('click', function () {
  console.log("Closing: " + this.dataset.id);
  this.innerText = "Poll Closed"
  socket.send('closePoll', this.dataset.id);
});
