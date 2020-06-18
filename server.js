const path = require('path');
const express = require('express');
const chalk = require('chalk');
const compression = require('compression');
const server = express();
const PORT = 8889;
const PATH = path.join(__dirname, './dist');

server.use(compression());
server.use(express.static(PATH));

server.listen(PORT, () => console.log(`
    ${chalk.green('Express-server is running up ...')}
    ---------------------------------------
    [MODE]       ${chalk.yellow.bold('PRODUCTION')}
    [Folder]     Serving files from:' ${chalk.cyan('./dist')}
    [URL]        ${chalk.blue.underline.bold('http://localhost:' + PORT)}
  `)
);
