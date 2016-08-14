/* eslint no-console: 0 */
import express from 'express';
import pokemonServer from './pokemonServer';

// webpack module
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.config.development';

const app = express();
const compiler = webpack(config);
const PORT = 3000;
const wdm = webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
});

app.use(wdm);
app.use(webpackHotMiddleware(compiler));
app.use(express.static(__dirname + '/../shared/assets'));

// create server
const server = app.listen(PORT, 'localhost', err => {
  if (err) {
    console.error(err);
    return;
  }

  const exec = require('child_process').exec;
  const child = exec('npm run start-hot', (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
    console.log(stdout);
  });

  console.log(`Listening at http://localhost:${PORT}`);
});

// create socket.io server
pokemonServer(server);

process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  wdm.close();
  server.close(() => {
    process.exit(0);
  });
});
