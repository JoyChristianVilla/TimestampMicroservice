var express = require('express');
var app = express();
var url = require('url');
var obj;
var givenDate;
var json;
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

app.get('/:date', function(req, res) {
  //Create a new date object called givenDate based on the date we received in the url
  givenDate = new Date(req.params.date);
  obj = {
    'unix': givenDate.getTime(),
    'natural': months[givenDate.getMonth()] + ' ' + givenDate.getDate() + ', ' + givenDate.getFullYear()
  };

  if (!obj['unix']) {
    if (isNaN(Number(req.params.date))) {
      obj['unix'] = null;
      obj['natural'] = null;
    } else {
      givenDate = new Date(Number(req.params.date));
      obj = {
        'unix': givenDate.getTime(),
        'natural': months[givenDate.getMonth()] + ' ' + givenDate.getDate() + ', ' + givenDate.getFullYear()
      };
    }
  }

  //Header for the response
  res.writeHead(200, { 'Content-Type': 'application/json' });
  //Turn json into a string
  json = JSON.stringify(obj);
  //Send the stringified json as the response to the client
  res.end(json);
});
app.listen(3000);
console.log('Congregation is running on port 3000');
