const { keyword } = require('chalk');
const inquirer = require('inquirer');
const confirm = require('@inquirer/confirm');
const nconf = require('nconf');
const fs = require("fs");
const file = "../config/config.json";
var question1
= 
{
    name: "consumer key",
    type: "password",
    message: 'Enter the consumer key provided by twitter: ',
    validate: 
    function(value)
    {
        if (value.length)
        {
            nconf.set('env:consumer_key',value)
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
    type: "password",
    message: 'Enter the consumer secret provided by twitter: ',
    validate: 
    function(value)
    {
        if (value.length)
        {
            nconf.set('env:consumer_secret',value)
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
    name: "access token key",
    type: "password",
    message: 'Enter the access token key provided by twitter: ',
    validate: 
    function(value)
    {
        if (value.length)
        {
            nconf.set('env:access_token_key',value)
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
    type: "password",
    message: 'Enter the access token secret provided by twitter: ',
    validate: 
    function(value)
    {
        if (value.length)
        {
            nconf.set('env:access_token_secret',value)
            return true;
        }
        else
        {
            return 'Please enter the access token secret';
        }
    }
}
var rewrite_question
=
{
    name : "confirm rewrite",
    default: "Yes",
    type: "confirm",
    message: "Existing data will be overwritten. Are you sure you want to continue?",
    function(value){
        if (value.length !== 0){
            return true;
        }
        else{
            return 'Please confirm the overwrite. Yes(Y)/No(N)';   
        }
    }
}

module.exports = {
    askcredentials: () => {
        var questions = [question1,question2,question3,question4];
        return inquirer.prompt(questions);
    },
    overwrite: () => {
        var question = [rewrite_question];
        return inquirer.prompt(question);
    }
} 