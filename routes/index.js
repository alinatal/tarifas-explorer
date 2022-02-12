const { Router } = require('express');
const loginRouter = require('./login')
const homeRouter = require('./home')
const filesRouter = require('./files')
const checkLogin = require('../middlewares/checkLogin');
const router = Router();

router.use('/api/files', filesRouter);
router.use('/login', loginRouter);
router.use('/', checkLogin, homeRouter);

module.exports = router;