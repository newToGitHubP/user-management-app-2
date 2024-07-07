const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'data', 'db.json'));
const middlewares = jsonServer.defaults();

server.use(cors()); // Enable CORS
server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  console.log('Request:', req.method, req.url, req.body);
  next();
});

server.post('/users', (req, res, next) => {
  console.log('Received Data:', req.body);
  res.json({ success: true, message: 'Data received', data: req.body });
});

server.put('/users/:id', (req, res, next) => {
  console.log('Received Data for Update:', req.body);
  res.json({ success: true, message: 'Data updated', data: req.body });
});

server.use(router);

server.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.sendStatus(500);
});

server.listen(5000, () => {
  console.log('JSON Server is running');
});
