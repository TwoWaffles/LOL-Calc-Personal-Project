console.log("test123");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/getAllChampionNames', (req,res) => {
    res.send({
        champions: ["Draven", "Ashe", "Malphite"]
    })
});

app.listen(process.env.PORT || 8081);