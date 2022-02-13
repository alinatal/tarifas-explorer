const fs = require('fs');
const path = require('path');

const getFiles = (dir, files) => {
    files = [];
    var newFiles = fs.readdirSync(dir);

    for (let i in newFiles){
        dir = dir.replace(path.join(__dirname, '..')+'/', '')
        let name =  dir + '/' + newFiles[i];
                
        if (fs.statSync(path.join(__dirname, '..', name)).isDirectory()) files.push(getFiles(path.join(__dirname, '..', name), files));
        else {
            name = name.replace('public', '');
            files.push({directory: dir, filename: newFiles[i], path: encodeURI(name)});
        }
    }

    return files;
}

module.exports = getFiles;