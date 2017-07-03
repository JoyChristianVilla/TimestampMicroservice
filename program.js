var express = require('express');
var app = express();
var obj;
var givenDate;
var json;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

app.get('/:date', function(req, res) {
  //Create a new date object called givenDate based on the date we received in the url
  givenDate = new Date(req.params.date);
  //Create an object with the unix and natural time based on givenDate
  obj = {
    unix: givenDate.getTime(),
    natural: months[givenDate.getMonth()] + ' ' + givenDate.getDate() + ', ' + givenDate.getFullYear()
  };
  //If unix property has a falsey value, check if the date parameter given is a number
  if (!obj['unix']) {
    //If the date parameter is not a number, then make the unix property and the natural property have a value of null
    if (isNaN(Number(req.params.date))) {
      obj['unix'] = null;
      obj['natural'] = null;
    //If the date parameter is a number, then reassign givenDate with the unix timestamp given, turning it from a string into a number so that it works
    } else {
      givenDate = new Date(Number(req.params.date));
    //Then reassign obj based on the new value of givenDate
      obj = {
        unix: givenDate.getTime(),
        natural: months[givenDate.getMonth()] + ' ' + givenDate.getDate() + ', ' + givenDate.getFullYear()
      };
    }
  }

  //Header for the response
  // res.writeHead(200, { 'Content-Type': 'application/json' });
  // //Turn json into a string
  // json = JSON.stringify(obj);
  //Send the stringified json as the response to the client
  res.send(obj);
});
app.listen(process.env.PORT || 3000, function() {
  console.log('Congregation is running');
});
