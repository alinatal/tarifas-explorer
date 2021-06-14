const express = require('express');
const fs = require('fs');
const path = require('path');
const { networkInterfaces } = require('os');
const app = express();
const port = process.env.PORT || 3000;

function getFiles (dir, files){
    files = [];
    var newFiles = fs.readdirSync(dir);

    for (let i in newFiles){
        let name = dir + '/' + newFiles[i];
        if (fs.statSync(name).isDirectory()) files.push(getFiles(name, files));
        else files.push({directory: dir, filename: newFiles[i], path: encodeURI(name)});
    }

    return files;
}

function getIps(){
    const nets = networkInterfaces();
    let results = []
    let i = 0;

    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                results[i] = {name, ip: net.address}
                i++
            }
        }
    }
    return results
}
app.use('/files', express.static('files'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/api/files', (req, res) => {
    res.send({files: getFiles('files')})
})

app.get('/api/network', (req, res) => {
    res.send({ips: getIps(), port})
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})