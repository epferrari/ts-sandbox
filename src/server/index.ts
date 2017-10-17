import app from './app';

const hostname = 'localhost';
const port = 3030;
app.listen(port, hostname, () =>  {
  console.log(`app listening on ${hostname}:${port}`);
});