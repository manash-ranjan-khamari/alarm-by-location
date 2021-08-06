const express = require('express');
const config = require('./config/appconfig.js');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const stream = fs.createWriteStream(path.join(`${__dirname}/log`, 'access.log'), { flags: 'a+' })

const app = express();
const port = config.port;
const oneDay = 86400000;
app.use(express.json());
app.use(morgan('combined', {stream}));
app.set('views', `${__dirname}/client/`);
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes.js').exposeRoutes(app);


app.listen(port, () => {
    console.log(`Express server listening on port http://localhost:${port}`);
})


