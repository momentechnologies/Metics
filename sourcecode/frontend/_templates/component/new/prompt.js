// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
    {
        type: 'input',
        name: 'path',
        message: 'Where?',
    },
    {
        type: 'input',
        name: 'name',
        message: 'Name of the component',
    },
];
