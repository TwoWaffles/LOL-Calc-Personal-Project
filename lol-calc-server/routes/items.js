const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');

function downloadItemsJSON() {

  axios.get('https://cdn.merakianalytics.com/riot/lol/resources/latest/en-US/items.json')
    .then(function (response) {
      // handle success
      fs.writeFile('data/items.json', JSON.stringify(response.data), function (error) {
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


function filterItemNameAndInfoForPicker(callback) {

  const idToRemove = ["2403","3599","2052","3901","3902","3903"]
  const itemTypesToRemove = []

  fs.readFile('data/itemsFormatted.json', (error, data) => {
    if (error) throw error;

    let itemsArray = []

    const items = JSON.parse(data);
    //Remove items which are not buildable
    for (const item in items) {
      //console.log(item)
      if (
        (
          (items[item].rank[0] === "MINION") ||
          (items[item].rank[0] === "TURRET") ||
          (items[item].rank[0] === "TRINKET") ||
          (idToRemove.includes(item))
        )
      )
      {
        continue
      }
      itemsArray.push([items[item].id, items[item].name, items[item].icon, items[item].simpleDescription]);
    }
    //console.log(itemsArray);
    callback(itemsArray);
  });

}

function filterSelectedItem(itemId, callback) {
  fs.readFile('data/itemsFormatted.json', (error, data) => {
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

//Need to make everything camel case
function fixItemsFileFormat() {
  fs.readFile('data/items.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
  
    const lines = data.split('\n');
  
    function toCamelCase(s) {
      return s.replace(/_([a-zA-Z])/g, (match, p1) => p1.toUpperCase());
    }
  
    let formattedData = '';
  
    for (const line of lines) {
      const parts = line.trim().split('"');
      const key = parts[1];
  
      if (key && !key.startsWith('http') && !key.startsWith('goldPer') && key.includes('_')) {
        const camelCase = toCamelCase(parts[1]);
        parts[1] = camelCase;
        const newLine = parts.join('"');
        formattedData += newLine + '\n';
      } else {
        formattedData += line + '\n';
      }
    }
  
    fs.writeFile('data/itemsFormatted.json', formattedData, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
}

router.get('/getAllItemNamesAndInfo', (req, res) => {

  filterItemNameAndInfoForPicker((dataToSend) => {
    res.send({
      items: dataToSend
    });

  });
});

router.get('/getItemData', (req, res) => {
  filterSelectedItem(req.query.itemId, (dataToSend) => {
    res.json(dataToSend);
  })
});



module.exports = router;