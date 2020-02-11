const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const httpPort = 3000;
const path = require('path');

class Server {
  constructor() {
    this.init();
  }

  init() {
    try {
      this.initHTTPServer();
    } catch (err) {
      console.error(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  initHTTPServer() {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(`${process.env.PUBLICPATH}`, express.static(path.join(__dirname, 'build')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
    app.listen(httpPort, () => {
      console.log(`Server running on port ${httpPort}`);
      console.log(`server uri ${process.env.URI} and public path ${process.env.PUBLICPATH}`);
    });
  }
}
const server = new Server();
