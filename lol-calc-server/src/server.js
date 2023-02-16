//Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const fs = require('fs');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/getAllChampionNames', (req,res) => {
    res.send({
        champions: ["Draven", "Ashe", "Malphite"]
    })
});

function getChampionsJSON(){

axios.get('https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json')
  .then(function (response) {
    // handle success
    fs.writeFile('data/champions.json',JSON.stringify(response.data) , function(error) {
        if(error) throw error;
        console.log('Saved!');
    });
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
}

getChampionsJSON();


app.listen(process.env.PORT || 8081);