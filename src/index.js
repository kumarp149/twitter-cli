#!/usr/bin/env node 
//const parseArgs = require('minimist');
const chalk = require('chalk');
const command_args = [];
command_args[0] = {command: "tweet",description: "command used for tweeting. Mention message with \"-m\" or \"--m\" and image path with \"-p\" or \"--p\""}
const command_flags = [];
command_flags[0] = {flags: ["--help","--usage","-help","-usage"],description: "Help for using \"twitter\""};
command_flags[1] = {flags: ["--m","-m"],description: "message to be sent as a tweet"};
command_flags[2] = {flags: ["--p","-p"],description: "location of the image to be sent along with the message"}; 
var arg_arr = process.argv;
function show_usage()
{
    console.log(chalk.green("[Syntax]: twitter [argument] [flag]","\n"));
    console.log(chalk.green("Available options for argument:"));
    for (let i = 0; i < command_args.length; ++i)
    {
        console.log("");
        let temp = i+1;
        let x = "  "+temp+")"+command_args[i].command+": "+command_args[i].description;
        console.log(chalk.green(x));
    }
    console.log("");
    console.log(chalk.green("Available options for flag:"));
    for (let i = 0; i < command_flags.length; ++i)
    {
        let temp = i+1;
        let x = "  "+temp+")"+command_flags[i].flags[0];
        console.log("");
        for (j = 1; j < command_flags[i].flags.length; ++j)
        {
            x += " or "+command_flags[i].flags[j];
        }
        x += ": "+command_flags[i].description;
        console.log(chalk.green(x));
    }
}
function show_tweet_error()
{
    console.log(chalk.red("[ERROR]: Mandatory flag \"-m\" expected with the argument \"tweet\". It specifies the message to be tweeted"));
}
if (process.argv.length == 2)
{
    console.log(chalk.red("[ERROR]: Arguments expected with the command \"twitter\""));
    show_usage();
}
if (process.argv.length == 3)
{
    if (process.argv[2] == "--help" || process.argv[2] == "-help" || process.argv[2] == "--usage" || process.argv[2] == "-usage")
    {
        show_usage();
    }
    else if (process.argv[2] == "tweet")
    {
        show_tweet_error();
    }
}
