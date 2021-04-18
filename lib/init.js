//const { keyword } = require('chalk');
const inquirer = require('inquirer');
//const confirm = require('@inquirer/confirm');
//const nconf = require('nconf');
//const fs = require("fs");
//const file = "../config/config.json";
var question1
= 
{
    name: "consumer_key",
    type: "password",
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
    name: "consumer_secret",
    type: "password",
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
    name: "access_token_key",
    type: "password",
    message: 'Enter the access token key provided by twitter: ',
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
    name: "access_token_secret",
    type: "password",
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
    q1: () => {
        var questions = [question1];
        return inquirer.prompt(question1);
    },
    q2: () => {
        var questions = [question2];
        return inquirer.prompt(question2);
    },
    q3: () => {
        var questions = [question3];
        return inquirer.prompt(question3);
    },
    q4: () => {
        var questions = [question4];
        return inquirer.prompt(question4);
    }
} 