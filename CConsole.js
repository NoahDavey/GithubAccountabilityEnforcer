const chalk = require('chalk')

const success = (message) => console.log(chalk.green(message)) 
const info = (message) => console.log(chalk.cyan(message)) 
const warn = (message) => console.log(chalk.yellow(message))
const error = (message) => console.log(chalk.red(message))
const custom = (message, hexCode) => console.log(chalk.hex(hexCode)(message));

const successBg = (message) => console.log(chalk.bgGreen(message)) 
const infoBg = (message) => console.log(chalk.bgCyan(message)) 
const warnBg = (message) => console.log(chalk.bgYellow(message)) 
const errorBg = (message) => console.log(chalk.bgRed(message)) 

const CConsole = {
    success,
    info,
    warn,
    error,
    custom,
    successBg,
    infoBg,
    warnBg,
    errorBg,
}

module.exports = {
    CConsole
}