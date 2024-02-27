import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import inquirer from 'inquirer';

import Manager from './lib/Manager.js';
import Engineer from './lib/Engineer.js';
import Intern from './lib/Intern.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

import render from './page-template.js';
const team = [];

function createManager() {
  inquirer
  .prompt([
    {
        type: 'input',
        name: 'managerName',
        message: "Enter Manager's name:",
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter Manager's ID:",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter Manager's Email Address:"
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "Enter Office number:",
    },
  ])
  .then((answers) => {
    const { managerName, id, email, officeNumber } = answers;
    const manager = team.push(new Manager(managerName, id, email, officeNumber));
    menu();
  })
}

function menu() {
  inquirer
  .prompt([
    {
      type: 'list',
      name: "menu",
      message: "Select Option",
      choices: [{
        name:"Add an engineer",
        value: "engineer",
      }, 
                {
        name: "Add an intern",
        value: "intern",
      }, 
                {
        name: "Finish building the team",
        value: "finish",
      }],
    }
  ])
  .then((answers) => {
    if(answers.menu === "engineer") {
      createEngineer();
    } else if(answers.menu === "intern"){
      createIntern();
    } else if(answers.menu === "finish"){
      const html = render(team);
      fs.writeFileSync(outputPath, html, { flag: 'w+' }, function (err) {
        if (err) throw err;
      });
    }
  })
}

function createEngineer() {
  inquirer
  .prompt([
    {
        type: 'input',
        name: 'engineerName',
        message: "Enter Engineer's name:",
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter Engineers's ID:",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter Engineer's Email Address:"
    },
    {
        type: 'input',
        name: 'github',
        message: "Enter GitHub Account:",
    },
  ])
  .then((answers) => {
    const { engineerName, id, email, github } = answers;
    const engineer = team.push(new Engineer(engineerName, id, email, github));
    console.log("Engineer", engineer);
    menu();
  })
}

function createIntern() {
  inquirer
  .prompt([
    {
        type: 'input',
        name: 'internName',
        message: "Enter Intern's name:",
    },
    {
        type: 'input',
        name: 'id',
        message: "Enter Intern's ID:",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter Intern's Email Address:"
    },
    {
        type: 'input',
        name: 'school',
        message: "Enter School:",
    },
  ])
  .then((answers) => {
    const { internName, id, email, school } = answers;
    const intern = team.push(new Intern(internName, id, email, school));
    menu();
  })
}
createManager();
