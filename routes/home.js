const { Router } = require('express');
const path = require('path');
const router = Router();

router.get('', (req, res) => {
    res.sendFile(path.resolve('views/index.html'))
})

module.exports = router;
