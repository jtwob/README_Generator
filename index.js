const inquirer = require("inquirer");
const fs = require("fs");

// array of questions for user
const questions = [
    "Title of the project: ",
    "Description of project: ",
    "How is this project installed: ",
    "How is this project used: ",
    "Choose a license: ",
    "List all contributors: ",
    "Specify testing protocol/instructions for the project: ",
    "Enter your github username: ",
    "Enter your email: ",
    "A brief description of the best way to reach you with additional questions: "
];

// array of licenses
const licenses = [
    "Apache 2.0 License",
    "Boost Software License 1.0",
    "BSD 3-Clause License",
    "BSD 2-Clause License",
    "CC0",
    "Attribution 4.0 International",
    "Attribution-ShareAlike 4.0 International",
    "Attribution-NonCommercial 4.0 International",
    "Attribution-NoDerivates 4.0 International",
    "Attribution-NonCommmercial-ShareAlike 4.0 International",
    "Attribution-NonCommercial-NoDerivatives 4.0 International",
    "Eclipse Public License 1.0",
    "GNU GPL v3",
    "GNU GPL v2",
    "GNU AGPL v3",
    "GNU LGPL v3",
    "GNU FDL v1.3",
    "IBM Public License Version 1.0",
    "ISC License (ISC)",
    "The MIT License",
    "Mozilla Public License 2.0",
    "Attribution License (BY)",
    "Open Database License (ODbL)",
    "Public Domain Dedication and License (PDDL)",
    "The Perl License",
    "The Artistic License 2.0",
    "SIL Open Font License 1.1",
    "The Unlicense",
    "The zlib/libpng License"
]

// array of license badge links
const badges = [
    "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
    "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
    "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)",
    "[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)",
    "[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)",
    "[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)",
    "[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)",
    "[![License: CC BY-ND 4.0](https://img.shields.io/badge/License-CC%20BY--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nd/4.0/)",
    "[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)",
    "[![License: CC BY-NC-ND 4.0](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-nd/4.0/)",
    "[![License](https://img.shields.io/badge/License-EPL%201.0-red.svg)](https://opensource.org/licenses/EPL-1.0)",
    "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
    "[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)",
    "[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)",
    "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)",
    "[![License: FDL 1.3](https://img.shields.io/badge/License-FDL%20v1.3-blue.svg)](https://www.gnu.org/licenses/fdl-1.3)",
    "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)",
    "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",
    "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
    "[![License: Open Data Commons Attribution](https://img.shields.io/badge/License-ODC_BY-brightgreen.svg)](https://opendatacommons.org/licenses/by/)",
    "[![License: ODbL](https://img.shields.io/badge/License-ODbL-brightgreen.svg)](https://opendatacommons.org/licenses/odbl/)",
    "[![License: ODbL](https://img.shields.io/badge/License-PDDL-brightgreen.svg)](https://opendatacommons.org/licenses/pddl/)",
    "[![License: Artistic-2.0](https://img.shields.io/badge/License-Perl-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)",
    "[![License: Artistic-2.0](https://img.shields.io/badge/License-Artistic%202.0-0298c3.svg)](https://opensource.org/licenses/Artistic-2.0)",
    "[![License: Open Font-1.1](https://img.shields.io/badge/License-OFL%201.1-lightgreen.svg)](https://opensource.org/licenses/OFL-1.1)",
    "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
    "[![License: Zlib](https://img.shields.io/badge/License-Zlib-lightgrey.svg)](https://opensource.org/licenses/Zlib)"
]

// function to write README file
function writeToFile(fileName, data) {
    let text = `
# ${data.title} ${badges[licenses.indexOf(data.license)]}

## Description
${data.description}

## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [License](#license)
5. [Contributing](#contributing)
6. [Tests](#tests)
7. [Questions](#questions)

## Installation
${data.install}

## Usage
${data.usage}

## License
${data.license}

## Contributing
${data.contributors}

## Tests
${data.testing}

## Questions
${data.contact}
- [Github Profile: ](https://github.com/${data.github})
- Email: ${data.email}`;

    fs.writeFile(fileName, text, (err) => {
        if (err) throw err;
    })
}

// function to initialize program
function init() {
    inquirer
        .prompt([
            {
                name: "title",
                message: questions[0],
            },
            {
                name: "description",
                message: questions[1],
            },
            {
                name: "install",
                message: questions[2],
            },
            {
                name: "usage",
                message: questions[3],
            },
            {
                type: 'list',
                name: "license",
                message: questions[4],
                choices: licenses,
            },
            {
                name: "contributors",
                message: questions[5],
            },
            {
                name: "testing",
                message: questions[6],
            },
            {
                name: "github",
                message: questions[7],
            },
            {
                name: "email",
                message: questions[8],
            },
            {
                name: "contact",
                message: questions[9],
            },
        ])
        .then(answers => {
            writeToFile("./README.md", answers);
        })
}

// function call to initialize program
init();
