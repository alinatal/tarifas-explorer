const { Router } = require('express');
const path = require('path');
const router = Router();

router.get('', (req, res) => {
    if(req.signedCookies.tarifas_token == '654321') res.redirect('/');
    else res.sendFile(path.join(__dirname,'views/login.html'));
})

router.post('', (req, res) => {
    if(req.body.tarifas_token == '654321'){
        res.cookie('tarifas_token', req.body.tarifas_token, {httpOnly: true, signed: true});
        res.redirect('/');
    }
    else res.redirect('/login');
})

router.get('/out', (req, res) => {
    res.clearCookie('tarifas_token').redirect('/login');
})

module.exports = router;