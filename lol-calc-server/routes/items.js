const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Generic Item");
});

module.exports = router;