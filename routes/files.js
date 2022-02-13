const { Router } = require('express');
const path = require('path');
const getFiles = require('../common/getFiles');
const router = Router();

router.get('', (req, res) => {
    res.send({files: getFiles(path.join(__dirname, '../../public_html'))})
});

module.exports = router;
