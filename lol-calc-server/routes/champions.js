const express = require('express');
const router = express.Router();


const axios = require('axios');
const fs = require('fs');

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
  
  function filterSelectedChampionFromData(championKey, callback) {
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
  
      //console.log(filtered);
      callback(filtered)
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


router.get('/xd', (req, res) => {

    res.send("LOL");

});

router.get('/getAllChampionNamesAndIcons', (req,res) => {

    filterChampionNamesAndIconsFromData((dataToSend)=>{
      res.send({
          champions: dataToSend
      });

    });
});

router.get('/getChampionData', (req,res) => {
    filterSelectedChampionFromData(req.query.championKey,(dataToSend) => {
        res.json(dataToSend);
    });
});

//do refresher on promises and async use the simple web dev guy



module.exports = router;