var submitPoll = document.getElementById('submitPoll');

submitPoll.addEventListener('click', function () {
  var poll = $('#form :input');
  var values = {};
  poll.each(function() {
      values[this.name] = $(this).val();
  });
  values["pollId"] = Math.floor((Math.random() * 10000000) + 1);
  values["status"] = "open";
  var adminId = values["adminId"];
  socket.send('createPoll', values);
  window.location.replace('/polls/' + values["pollId"] + "/" + adminId + "?id=" + values["pollId"]);
});
