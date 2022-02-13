const fs = require('fs');
const path = require('path');

const getFiles = (dir, files) => {
    files = [];
    var newFiles = fs.readdirSync(dir);

    for (let i in newFiles){
        dir = dir.replace(path.join(__dirname, '..')+'/', '')
        return dir;
        let name =  dir + '/' + newFiles[i];
        
        if (fs.statSync(name).isDirectory()) files.push(getFiles(name, files));
        else files.push({directory: dir, filename: newFiles[i], path: encodeURI(name)});
    }

    return files;
}

module.exports = getFiles;