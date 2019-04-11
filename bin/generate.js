#!/usr/bin/env node

const program = require('commander');
const fs = require('fs')
const {functional} = require('../template/functional');
const {functionalHook} = require('../template/functionalHook');
const {classComponent} = require('../template/classComponent');
const {styleSheetTemplate} = require('../template/styleSheetTemplate')
const capitalize = require('lodash.capitalize');
const CURRENT_DIR = process.cwd()
const inquirer = require('inquirer')
const chalk = require('chalk');

program
  .option('-l --functionalComponent <nameComponent> <styleSheetType>', 'create functional component')
  .option('-f --classComponent <nameComponent> <styleSheetType>', 'create class component')
  .option('-h --functionalHookComponent <nameComponent> <styleSheetType>', 'create functional Hook component')
  .option('-p --prompt, available options')
  .on('--help', () => {
    console.log('Examples:')
    console.log('$ react-gen --functionalComponent myComponentName')
    console.log('$ react-gen --classComponent myComponentName')
    console.log('$ react-gen --functionalHookComponent myComponentName')
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

const writeFile = (componentName, template, styleSheet) => {
  const printTemplate = template(componentName)
  fs.writeFile(`${CURRENT_DIR}/${componentName}/index.js`, printTemplate, (err) => {
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
      name: 'myComponentName',
      message: 'Introduce a component name, don\'t introduce spaces:'
    },
    {
      type: 'list',
      name: 'type',
      message: 'What kind of component do you need?',
      choices: ['classComponent', 'functionalComponent', 'functionalHookComponent']
    },
    {
      type: 'list',
      name: 'styleSheet',
      message: 'Do you need an stylesheet?',
      choices: ['css', 'scss', 'none']
    }
  ]).then(({myComponentName, type, styleSheet}) => {
    if(!myComponentName) {
      console.log(chalk.red('Component name required!'))
      console.log(chalk.red('Component has not been generated!'))
      return
    }

    const componentName = capitalize(myComponentName)
    const availableTemplates = {
      functionalComponent: functional,
      functionalHookComponent: functionalHook,
      classComponent: classComponent
    }
    const template = availableTemplates[type]
    const styleSheetType = styleSheet === 'none' ? false : styleSheet

    createDir(componentName) && writeFile(componentName, template, styleSheetType)
  })
}

if(program.classComponent) {
  const myComponentName = capitalize(program.classComponent)
    createDir(myComponentName) && writeFile(myComponentName, classComponent, program.args[0])
    return 
}

if(program.functionalComponent) {
  const myComponentName = capitalize(program.functionalComponent)
    createDir(myComponentName) && writeFile(myComponentName, functional, program.args[0])
    return 
}

if(program.functionalHookComponent) {
  const myComponentName = capitalize(program.functionalHookComponent)
  createDir(myComponentName) && writeFile(myComponentName, functionalHook, program.args[0])
  return 
}


