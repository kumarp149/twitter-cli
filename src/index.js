#!/usr/bin/env node 
//const parseArgs = require('minimist');
const chalk = require('chalk');
const command_args = [];
command_args[0] = {command: "tweet",description: "command used for tweeting. Mention message with \"-m\" or \"--m\" and image path with \"-p\" or \"--p\""}
command_args[1] = {command: "retweet",description: "command used for retweeting. Mention the tweet id with \"-i\" or \"--i\""}
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
function show_tweet_error(str)
{
    if (str === "tweet")
    {
        console.log(chalk.red("[ERROR]: Mandatory flag \"-m\" expected with the argument \"tweet\". It specifies the message to be tweeted"));
    }
    else if (str === "retweet")
    {
        console.log(chalk.red("[ERROR]: Mandatory flag \"-i\" expected with the argument \"retweet\". It specifies id of the tweet to be retweeted"));
    }
}
if (process.argv.length === 2)
{
    console.log(chalk.red("[ERROR]: Arguments expected with the command \"twitter\""));
    show_usage();
}
else if (process.argv.length === 3)
{
    if (process.argv[2] === "--help" || process.argv[2] === "-help" || process.argv[2] === "--usage" || process.argv[2] === "-usage")
    {
        show_usage();
    }
    else if (process.argv[2] === "tweet" || process.argv[2] === "retweet")
    {
        show_tweet_error(process.argv[2]);
    }
    else
    {
        console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'));
        show_usage();
    }
}
else if (process.argv.length === 4)
{
    if (process.argv[2] !== "tweet" && process.argv[2] !== "retweet")
    {
        console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'));
        show_usage();
    }
    else if (process.argv[2] === "tweet")
    {
        if (process.argv[3] === "-m" || process.argv[3] === "--m")
        {
            console.log(chalk.red("[ERROR]: flag \"-m\" cannot be NULL. It specifies the message to be tweeted"));
        }
        else
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"tweet\""));
            console.log(chalk.red("flag \"-m\" is expected with the argument \"tweet\". It specifies the message to be tweeted"));
        }
    }
    else if (process.argv[2] === "retweet")
    {
        if (process.argv[3] === "-i" || process.argv[3] === "--i")
        {
            console.log(chalk.red("[ERROR]: flag \"-i\" cannot be NULL. It specifies the id of the tweet to be retweeted"));
        }
        else
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"retweet\""));
            console.log(chalk.red("flag \"-i\" is expected with the argument \"retweet\". It specifies the id of the tweet to be retweeted"));
        }
    }
}
else if (process.argv.length === 5)
{
    if (process.argv[2] !== "tweet" && process.argv[2] !== "retweet")
    {
        console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'));
        show_usage();
    }
}