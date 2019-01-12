#!/usr/bin/env node

const program = require('commander');
const fs = require('fs')
const {stateless} = require('../template/stateless');
const {statefull} = require('../template/statefull');
const {styleSheetTemplate} = require('../template/styleSheetTemplate')
const capitalize = require('lodash.capitalize');
const CURRENT_DIR = process.cwd()
const inquirer = require('inquirer')
const chalk = require('chalk');

program
  .option('-l --stateless <nameComponent> <styleSheetType>', 'create stateless component')
  .option('-f --statefull <nameComponent> <styleSheetType>', 'create statefull component')
  .option('-p --prompt, available options')
  .on('--help', () => {
    console.log('Examples:')
    console.log('$ react-gen -stateless myComponentName', )
    console.log('$ react-gen -statefull myComponentName')
  })
  .parse(process.argv)

const createDir = (componentName) => {
  if(!fs.existsSync(`${CURRENT_DIR}/${componentName}`)) {
    fs.mkdirSync(`${CURRENT_DIR}/${componentName}`)
    return true
  } else {
    console.log(chalk.red('Error: Directory already exists'))
    return false
  }
}

const writeFile = (componentName, componentTemplate, styleSheet) => {
  console.log(componentTemplate)
  fs.writeFile(`${CURRENT_DIR}/${componentName}/index.js`, `${componentTemplate(componentName)}`, (err) => {
    if(err) {
        return console.log(chalk.red(err));
    }
    console.log(chalk.green(`The file was saved in ${CURRENT_DIR}/${componentName}/index.js !`));
  });
  styleSheet && fs.writeFile(`${CURRENT_DIR}/${componentName}/index.${styleSheet}`, `${styleSheetTemplate(componentName)}`, (err) => {
    if(err) {
        return console.log(chalk.red(err));
    }
    console.log(chalk.green(`The file was saved in ${CURRENT_DIR}/${componentName}/index.${styleSheet} !`));
  }); 
}

if(program.prompt) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'componentName',
      message: 'Introduce a component name, don\'t introduce spaces:'
    },
    {
      type: 'list',
      name: 'type',
      message: 'What kind of component do you need?',
      choices: ['statefull', 'stateless']
    },
    {
      type: 'list',
      name: 'styleSheet',
      message: 'Do you need an stylesheet?',
      choices: ['css', 'scss', 'none']
    }
  ]).then(({componentName, type, styleSheet}) => {
    if(!componentName) {
      console.log(chalk.red('Component name required!'))
      console.log(chalk.red('Component has not been generated!'))
      return
    }
    createDir(componentName)
    const template = type === 'statefull' ? statefull :stateless
    const styleSheetType = styleSheet === 'none' ? false : styleSheet
    writeFile(componentName, template, styleSheetType)
  })
}

if(program.statefull) {
  const myComponentName = capitalize(program.statefull)
    createDir(myComponentName) && writeFile(myComponentName, statefull, program.args[0])
    return 
}

if(program.stateless) {
  const myComponentName = capitalize(program.stateless)
    createDir(myComponentName) && writeFile(myComponentName, stateless, program.args[0])
    return 
}


