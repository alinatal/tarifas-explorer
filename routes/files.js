const { Router } = require('express');
const getFiles = require('../common/getFiles');
const router = Router();

router.get('', (req, res) => {
    res.send({files: getFiles('tarifas')})
});

module.exports = router;
