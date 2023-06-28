
// import http from 'http';

// const server = http.createServer((req) => {
//   console.log('req', req);
//   process.exit();
// })

// server.listen(3333)




import * as express from 'express';
import * as path from 'path';

const app = express.default();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to express!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
