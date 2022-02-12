const checkLogin = (req, res, next) => {
    if(req.signedCookies.tarifas_token == '654321') next();
    else res.redirect('/login')
}
module.exports = checkLogin;