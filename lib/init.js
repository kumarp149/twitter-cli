const { keyword } = require('chalk');
const inquirer = require('inquirer');

var question1
= 
{
    name: "consumer key",
    type: "input",
    message: 'Enter the consumer key provided by twitter: ',
    validate: 
    function(value)
    {
        if (value.length)
        {
            return true;
        }
        else
        {
            return 'Please enter the consumer key';
        }
    }
}

var question2
=
{
    name: "consumer secret",
    type: "input",
    message: 'Enter the consumer secret provided by twitter: ',
    validate: 
    function(value)
    {
        if (value.length)
        {
            return true;
        }
        else
        {
            return 'Please enter the consumer secret';
        }
    }
}

var question3
=
{
    name: "access token",
    type: "input",
    message: 'Enter the access token provided by twitter: ',
    validate: 
    function(value)
    {
        if (value.length)
        {
            return true;
        }
        else
        {
            return 'Please enter the access token';
        }
    }
}

var question4
=
{
    name: "access token secret",
    type: "input",
    message: 'Enter the access token secret provided by twitter: ',
    validate: 
    function(value)
    {
        if (value.length)
        {
            return true;
        }
        else
        {
            return 'Please enter the access token secret';
        }
    }
}

module.exports = {
    askcredentials: () => {
        var questions = [question1,question2,question3,question4];
        return inquirer.prompt(questions);
    }
} 