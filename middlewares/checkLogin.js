const checkLogin = (req, res, next) => {
    console.log('signedCookies', req.signedCookies.token)
    if(req.signedCookies.token == '654321') next();
    else res.redirect('/login')
}
module.exports = checkLogin;