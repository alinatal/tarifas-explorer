const fs = require('fs');

const getFiles = (dir, files) => {
    files = [];
    var newFiles = fs.readdirSync(dir);

    for (let i in newFiles){
        let name = dir + '/' + newFiles[i];
        if (fs.statSync(name).isDirectory()) files.push(getFiles(name, files));
        else files.push({directory: dir, filename: newFiles[i], path: encodeURI(name)});
    }

    return files;
}

module.exports = getFiles;