const { triggerAsyncId } = require("async_hooks");

function treeFn(dirPath) {

    if (dirPath == undefined) {
        treeHelper(process.cwd(), "");
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if (doesExist) {
            treeHelper(dirPath, "");
        } else {
            console.log("kindly enter the correct path")
            return;
        }

    }

}

function treeHelper(dirPath, indent) {
    let isFile = fs.lstatSync(dirPath).isFile();
    if (isFile == true) {
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName)
    } else {
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName)
        let childerens = fs.readdirSync(dirPath);
        for (let i = 0; i < childerens.length; i++) {
            let childPath = path.join(dirPath, childerens[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}

module.exports = {
    treeKey: treeFn
}