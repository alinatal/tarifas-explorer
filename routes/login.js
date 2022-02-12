const { Router } = require('express');
const path = require('path');
const router = Router();

router.get('', (req, res) => {
    if(req.signedCookies.token == '654321') res.redirect('/');
    else res.sendFile(path.resolve('views/login.html'));
})

router.post('', (req, res) => {
    if(req.body.token == '654321'){
        res.cookie('token', req.body.token, {httpOnly: true, signed: true});
        res.redirect('/');
    }
    else res.redirect('/login');
})

router.get('/out', (req, res) => {
    res.clearCookie('token').redirect('/login');
})

module.exports = router;