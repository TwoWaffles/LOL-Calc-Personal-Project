//Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const fs = require('fs');

const itemsRouter = require('../routes/items');
const championsRouter = require('../routes/champions');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/items', itemsRouter);
app.use('/champions', championsRouter);


function filterChampionNamesAndIconsFromData(callback) {
  fs.readFile('data/champions.json', (error,data) => {
    if (error) throw error;

    let championsArray = []

    const champions = JSON.parse(data);
    for (const champion in champions){
      championsArray.push([champions[champion].name,champions[champion].icon,champions[champion].key]);
    }

    callback(championsArray);
  });
  
}

function filterSelectedChampionFromData(championKey) {
  fs.readFile('data/champions.json', (error,data) => {
    if (error) throw error;

    const champions = JSON.parse(data);
    const champion = champions[championKey];

    const allowed = ['key', 'stats', 'resource', 'abilities', 'attackType'];

    const filtered = Object.keys(champion)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = champion[key];
        return obj;
      }, {});

    console.log(filtered);


  })
}

function getChampionsJSON(){

  axios.get('https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/champions.json')
    .then(function (response) {
      // handle success
      fs.writeFile('data/champions.json',JSON.stringify(response.data) , function(error) {
          if (error) throw error;
          console.log('Saved!');
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

//Handle Gets

app.get('/getAllChampionNamesAndIcons', (req,res) => {

    filterChampionNamesAndIconsFromData((dataToSend)=>{
      res.send({
          champions: dataToSend
      })

    })
});

app.get('/getChampionData', (req,res) => {

 console.log(req.query.championKey);
 filterSelectedChampionFromData(req.query.championKey);

});



//getChampionsJSON();
//filterChampionNamesAndIconsFromData();

// TODO check this against the tutorial on why its 8081 and not lke 8080
app.listen(process.env.PORT || 8081);