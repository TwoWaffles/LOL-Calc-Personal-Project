const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');

function downloadItemsJSON(){
  
    axios.get('https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/items.json')
      .then(function (response) {
        // handle success
        fs.writeFile('data/items.json',JSON.stringify(response.data) , function(error) {
            if (error) throw error;
            console.log('Saved Items!');
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    }

router.get('/', (req, res) => {
    res.send("Generic Item");
});


function filterItemNameAndInfoForPicker(callback){

  fs.readFile('data/items.json', (error,data) => {
    if (error) throw error;

    let itemsArray = []

    const items = JSON.parse(data);
    for (const item in items){
      itemsArray.push([items[item].name]);
    }
    console.log(itemsArray);
    callback(itemsArray);
  });

}

router.get('/getAllItemNamesAndInfo', (req,res) => {

  filterItemNameAndInfoForPicker((dataToSend)=>{
    res.send({
        items: dataToSend
    });

  });
});


module.exports = router;