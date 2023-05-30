function organizeFn(dirPath) {
    // 1. input directory path
    let destPath;
    if (dirPath == undefined) {
        destPath = process.cwd()
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            // 2. create organized file directory
            destPath = path.join(dirPath, "organized_files");
            if (fs.existsSync(destPath) == false) {
                fs.mkdirSync(destPath);
            }

        } else {
            console.log("kindly enter the correct path")
            return;
        }

    }

    organizeHelper(dirPath, destPath);

}

function organizeHelper(src, dest) {
    // 3. identify categories for all the files
    let childNames = fs.readdirSync(src);
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if (isFile) {
            // 4. copy all files in organized directory under category folders.
            let category = getCategory(childNames[i]);
            sendFiles(childAddress, dest, category);
        }
    }

}

function getCategory(name) {
    let ext = path.extname(name);
    ext = ext.slice(1); // remove dot
    for (let type in types) {
        let currentType = types[type];
        for (let i = 0; i < currentType.length; i++) {
            if (ext == currentType[i]) {
                return type;
            }
        }
    }
    return "others";
}

function sendFiles(srcFilePath, dest, category) {
    let categoryPath = path.join(dest, category);
    if (fs.existsSync(categoryPath) == false) {
        fs.mkdirSync(categoryPath);
    }
    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName, " coppied to ", category);
}

module.exports = {
    organizeKey: organizeFn
}