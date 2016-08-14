// bundle in electron main process?

/* eslint no-console: 0 */
import express from 'express';
import pokemonServer from './pokemonServer';

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/../shared/assets'));

// create server
const server = app.listen(PORT, 'localhost', err => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(`Listening at http://localhost:${PORT}`);
});

// create socket.io server
pokemonServer(server);
