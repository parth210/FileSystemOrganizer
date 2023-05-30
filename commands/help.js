function helpFn() {
    console.log(`
    List of all the commands:
              file tree "directoryPath"
              file organize "directoryPath"
              file main.js help 
    `);
}

module.exports = {
    helpKey: helpFn
}