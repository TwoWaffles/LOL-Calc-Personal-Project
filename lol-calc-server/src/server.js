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

//TODO: REFACTOR THIS AND GET ROUTE THING SO IT MAKES SENSE

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

 console.log(req.body)
 console.log("poggies")

});



//getChampionsJSON();
//filterChampionNamesAndIconsFromData();


app.listen(process.env.PORT || 8081);