const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res, next) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log('listening to port', port);
});
