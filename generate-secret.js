require('crypto').randomBytes(48, function (err, buffer) {
  var token = buffer.toString('hex');
  console.log(token);
});
