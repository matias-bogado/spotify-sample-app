const colors = require('colors/safe');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const credentials = require('../credentials/spotify');

class Server {
  constructor(port) {
    this.app = express();
    this.app.use('/public', express.static('./build/dist'));
    this.app.use('/public', express.static('./public'));
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // parse application/json
    this.app.use(bodyParser.json());

    // TODO: use middleware serve-favicon
    this.app.get('/favicon.ico', (req, res) => {
      res.sendStatus(204); // No-content
    });
    this.app.post('/token-request', (req, res) => this.handleRequest(req, res));

    this.server = this.app.listen(port, () => {
      console.log(`Backend server running at http://localhost:${port}/`);
    });

    process.on('SIGTERM', this.gracefulShutdown.bind(this)); // listens to TERM signal (kill)
    process.on('SIGINT', this.gracefulShutdown.bind(this)); // listens to INT signal (ctrl + c)
  }

  handleRequest(req, res) {
    const requestOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: req.body.code || null,
        redirect_uri: credentials.redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(credentials.client_id + ':' + credentials.client_secret).toString('base64'))
      },
      json: true
    };

    console.log('>');
    console.log('>');
    console.log('>');
    console.log(`Production server -> New token request: ${req.method} ${req.url}`);

    request.post(requestOptions, (error, response, body) => {
      // Both success & error data are returned in body
      if (body) {
        res.json(body);
      } else {
        res.json({ error: 'unknown_error' });
      }
    });
  }

  gracefulShutdown() {
    this.server.close(() =>
      console.log(`Production server -> ${colors.yellow('Server was shutted down without any problems')}`)
    );

    setTimeout(() => {
      console.log(
        `Production server -> ${colors.red('Could not close connections in time, forcefully shutting down')}`
      );
      process.exit(1);
    }, 30 * 1000);
  }
}

module.exports = new Server(5000);
