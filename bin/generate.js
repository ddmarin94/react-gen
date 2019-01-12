#!/usr/bin/env node

const program = require('commander');
const fs = require('fs')
const {stateless} = require('../template/stateless');
const {statefull} = require('../template/statefull');
const capitalize = require('lodash.capitalize');

program
  .option('-l, --stateless <nameComponent>', 'create stateless component')
  .option('-f, --statefull <nameComponent>', 'create statefull component')
  .on('--help', () => {
    console.log('Examples:')
    console.log('$ react-gen -stateless myComponentName', )
    console.log('$ react-gen -statefull myComponentName')
  })
  .parse(process.argv)

const CURRENT_DIR = process.cwd()

const writeFile = (componentName, componentTemplate) => {
  fs.writeFile(`${CURRENT_DIR}/${componentName}/index.js`, `${componentTemplate(componentName)}`, (err) => {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
}

if(program.statefull) {
  const myComponentName = capitalize(program.statefull)
  if(!fs.existsSync(`${CURRENT_DIR}/${myComponentName}`)){
    fs.mkdirSync(`${CURRENT_DIR}/${myComponentName}`)
    writeFile(myComponentName, statefull)
  } else {
    console.log('Error: Directory already exists')
    return 
  }
}

if(program.stateless) {
  const myComponentName = capitalize(program.stateless)
  if(!fs.existsSync(`${CURRENT_DIR}/${myComponentName}`)){
    fs.mkdirSync(`${CURRENT_DIR}/${myComponentName}`)
    writeFile(myComponentName, stateless)
  } else {
    console.log('Error: Directory already exists')
    return 
  }
}


