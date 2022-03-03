import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

const menus = [
  { name: 'Vanilla', description: 'A plain vanilla ice cream' },
  { name: 'Choco Chips', description: 'A chocolate chips ice cream' },
];

app.get('/', (req, res, next) => {
  res.send('Hello, World!');
});

app.get('/goodbye', (req, res, next) => {
  res.send('Goodbye, World!');
});

app.get('/menu', (req, res, next) => {
  res.json({
    data: menus,
  });
});

app.post('/menu', (req, res, next) => {
  menus.push(req.body);
  res.json({
    message: 'Success!',
  });
});

app.listen(port, () => {
  console.log('listening to port', port);
});
