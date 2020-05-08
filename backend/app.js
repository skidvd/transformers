
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();
const battleRoutes = require('./routes/battle');
const defaultRoutes = require('./routes/default');

app.use(bodyParser.json());
app.use(cors());

app.use('/battle', battleRoutes);
app.use(defaultRoutes);

app.listen(4000);
