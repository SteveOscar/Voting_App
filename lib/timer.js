function startTimer(time, id, io, app) {
  var timeLeft = time;
  var surveyId = id;
  var interval = setInterval( function() {
    console.log("Time Remaining: ", timeLeft);
    timeLeft--
    if (timeLeft < 1) {
      app.locals.polls[surveyId]["status"] = "closed";
      io.sockets.emit('close', surveyId);
      clearInterval(interval);
    } else if (timeLeft < 0) {
      clearInterval(interval);
    }
  }, 1000);
};

module.exports = startTimer;
