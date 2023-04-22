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
      itemsArray.push([items[item].id,items[item].name,items[item].icon,items[item].simpleDescription]);
    }
    console.log(itemsArray);
    callback(itemsArray);
  });

}

function filterSelectedItem(itemId, callback) {
  fs.readFile('data/items.json', (error,data) => {
    if (error) throw error;

    const items = JSON.parse(data);
    const item = items[itemId];

    // const allowed = ['key', 'stats', 'resource', 'abilities', 'attackType'];

    // const filtered = Object.keys(item)
    //   .filter(key => allowed.includes(key))
    //   .reduce((obj, key) => {
    //     obj[key] = item[key];
    //     return obj;
    //   }, {});

    //console.log(filtered);
    callback(item)
  });
}

router.get('/getAllItemNamesAndInfo', (req,res) => {

  filterItemNameAndInfoForPicker((dataToSend)=>{
    res.send({
        items: dataToSend
    });

  });
});

router.get('/getItemData', (req,res) => {
  filterSelectedItem(req.query.itemId,(dataToSend) => {
    res.json(dataToSend);
  })
});


module.exports = router;