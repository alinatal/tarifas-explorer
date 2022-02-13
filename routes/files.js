const { Router } = require('express');
const path = require('path');
const getFiles = require('../common/getFiles');
const router = Router();

router.get('', (req, res) => {
    console.log(path.join(__dirname, '../tarifas'))
    res.send({files: getFiles(path.join(__dirname, '../tarifas'))})
});

module.exports = router;
