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

//Functions

function filterChampionNamesAndIconsFromData(callback) {
  fs.readFile('data/champions.json', (error,data) => {
    if (error) throw error;

    let championsArray = []

    const champions = JSON.parse(data);
    for (const champion in champions){
      championsArray.push([champions[champion].name,champions[champion].icon]);
    }

    //console.log(championsArray)

    callback(championsArray);
    //const namesAndIcons = champions.map(champion => ({name: champion.name, icon: champion.icon}));

    //console.log(namesAndIcons);
  });
  
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
    })
    .finally(function () {
      // always executed
    });
  }

app.get('/getAllChampionNames', (req,res) => {

    filterChampionNamesAndIconsFromData((dataToSend)=>{
      res.send({
          champions: dataToSend
      })

    })

    
});



//getChampionsJSON();
//filterChampionNamesAndIconsFromData();


app.listen(process.env.PORT || 8081);