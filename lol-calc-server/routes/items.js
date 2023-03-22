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


module.exports = router;