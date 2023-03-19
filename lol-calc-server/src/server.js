//Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const itemsRouter = require('../routes/items');
const championsRouter = require('../routes/champions');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/items', itemsRouter);
app.use('/champions', championsRouter);

//getChampionsJSON();
//filterChampionNamesAndIconsFromData();

// TODO check this against the tutorial on why its 8081 and not lke 8080
app.listen(process.env.PORT || 8081);