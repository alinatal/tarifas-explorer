const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
const router = require('./routes')
const path = require('path');
const checkLogin = require('./middlewares/checkLogin')


app.use(cookieParser('secret'));
app.use(express.urlencoded({extended: true}));
app.use('/tarifas', express.static(path.join(__dirname, 'tarifas')));
app.use(router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})