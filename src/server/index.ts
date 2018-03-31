import app from './app';

const hostname = 'localhost';
const port = 3035;
app.listen(port, hostname, () =>  {
  process.stdout.write(`app listening on ${hostname}:${port}`);
});