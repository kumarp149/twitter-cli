#!/usr/bin/env node 
//const parseArgs = require('minimist');
const chalk = require('chalk');

const session = require("../config/config.json");

const readline = require("readline");

const prompt_lib = require('prompt-sync')();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const command_args = [];

const fs = require("fs");

command_args[0] = {command: "init",description: "command to set twitter developer credentials"};

command_args[1] = {command: "tweet",description: "command used for tweeting. Mention message with \"-m\" or \"--m\" and path to the pic with \"-p\" or \"--p\""}

command_args[2] = {command: "retweet",description: "command used for retweeting. Mention the tweet id with \"-i\" or \"--i\""}


const command_flags = [];

command_flags[0] = {flags: ["--help","--usage","-help","-usage"],description: "Help for using \"twitter\""};

command_flags[1] = {flags: ["--m","-m"],description: "message to be sent as a tweet"};

command_flags[2] = {flags: ["--p","-p"],description: "location of the pic to be sent along with the message"};

command_flags[3] =  {flags: ["--i","-i"],description: "id of the tweet to be retweeted"};

var arg_arr = process.argv;

function show_usage()
{
    /*
    It shows the usage of this command line tool
    */

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
    else if (process.argv[2] === "init")
    {
        console.log(chalk.green("Type \"exit\" to exit this process anytime"));
        var bool_overwrite = prompt_lib("Existing keys will be overwritten. Are you sure? (Yes/No) ");
        if (bool_overwrite === null)
        {
            process.exit(1);
        }
        bool_overwrite = bool_overwrite.trim().toLowerCase();
        while (bool_overwrite !== "" && bool_overwrite !== "Y" && bool_overwrite !== "y" && bool_overwrite !== "yes" && bool_overwrite !== "N" && bool_overwrite !== "n" && bool_overwrite !== "no" && bool_overwrite !== "exit")
        {
            var bool_overwrite = prompt_lib("Existing keys will be overwritten. Are you sure?(Y/N) ");
            if (bool_overwrite === null)
            {
                process.exit(1);
            }
            bool_overwrite = bool_overwrite.trim().toLowerCase();
        }
        if (bool_overwrite === "exit")
        {
            process.exit(1);
        }
        if (bool_overwrite === "Y" || bool_overwrite === "y" || bool_overwrite.toLowerCase() === "yes" || bool_overwrite === "")
        {
            var c_key = prompt_lib.hide("Enter your consumer key [hidden]: ");
            if (c_key === null || c_key === "exit"){
                process.exit(1);
            }
            while (c_key !== null && c_key !== "exit" && c_key.length === 0){
                c_key = prompt_lib.hide(chalk.red("Please enter your consumer key [hidden]: "));
            }
            if (c_key === null || c_key === "exit"){
                process.exit(1);
            }


            var c_secret = prompt_lib.hide("Enter your consumer secret [hidden]: ");
            if (c_secret === null || c_secret === "exit"){
                process.exit(1);
            }
            while (c_secret !== null && c_secret !== "exit" && c_secret.length === 0){
                c_secret = prompt_lib.hide(chalk.red("Please enter your consumer secret [hidden]: "));
            }
            if (c_secret === null || c_secret === "exit"){
                process.exit(1);
            }


            var at_key = prompt_lib.hide("Enter your access token key [hidden]: ");
            if (at_key === null || at_key === "exit"){
                process.exit(1);
            }
            while (at_key !== null && at_key !== "exit" && at_key.length === 0){
                at_key = prompt_lib.hide(chalk.red("Please enter your access token key [hidden]: "));
            }
            if (at_key === null || at_key === "exit"){
                process.exit(1);
            }

            var at_secret = prompt_lib.hide("Enter your access token secret [hidden]: ");
            if (at_secret === null || at_secret === "exit"){
                process.exit(1);
            }
            while (at_secret !== null && at_secret !== "exit" && at_secret.length === 0){
                at_secret = prompt_lib.hide(chalk.red("Please enter your access token secret [hidden]: "));
            }
            if (at_secret === null || at_secret === "exit"){
                process.exit(1);
            }
            let json_write = {"consumer_key": c_key,"consumer_secret": c_secret,"access_token_key": at_key,"access_token_secret": at_secret};
            fs.writeFile(__dirname + '/../config/config.json',JSON.stringify(json_write),function(err){
                if (err){
                    console.log(chalk.red("Error setting up credentials. Add credentials to config/config.json manually"));
                    process.exit(1);
                }
                else{
                    console.log(chalk.green("Credentials succesfully set"));
                    process.exit(1);
                }
            })
        }
        else if (bool_overwrite === "N" || bool_overwrite === "n" || bool_overwrite.toLowerCase() === "no")
        {
            process.exit(1);
        }
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

    if (process.argv[2] !== "tweet" && process.argv[2] !== "retweet" && process.argv[2] !== "--help" && process.argv[2] !== "-help" && process.argv[2] !== "--usage" && process.argv[2] !== "-usage" && process.argv[2] !== "init")
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


    else
    {
        console.log(chalk.red("[WARNING]: No arguments required after "+'\"'+process.argv[2]+'\"'));
        show_usage();
    }


}
else if (process.argv.length === 5)
{

    if (process.argv[2] !== "tweet" && process.argv[2] !== "retweet" && process.argv[2] !== "--help" && process.argv[2] !== "-help" && process.argv[2] !== "--usage" && process.argv[2] !== "-usage" && process.argv[2] !== "init")
    {
        console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'));
        show_usage();
    }

    else if (process.argv[2] === "tweet")
    {
        if (process.argv[3] !== "--m" && process.argv[3] !== "-m")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'+" with the argument \"retweet\""));
            console.log(chalk.red("flag \"-i\" is expected with the argument \"retweet\". It specifies the id of the tweet to be retweeted"));
        }
        else if (process.argv[3] === "--m" || process.argv[3] === "-m")
        {

        }
    }

    else if (process.argv[2] === "retweet")
    {

        if (process.argv[3] !== "--i" && process.argv[3] !== "-i")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"retweet\""));
            console.log(chalk.red("flag \"-i\" is expected with the argument \"retweet\". It specifies the id of the tweet to be retweeted"));
        }

        else if (process.argv[3] === "--i" || process.argv[3] === "-i")
        {

        }
    }

    else
    {
        console.log(chalk.red("[WARNING]: No arguments required after "+'\"'+process.argv[2]+'\"'));
        show_usage();
    }
}

else if (process.argv.length == 6)
{

    if (process.argv[2] !== "tweet" && process.argv[2] !== "retweet" && process.argv[2] !== "--help" && process.argv[2] !== "-help" && process.argv[2] !== "--usage" && process.argv[2] !== "-usage")
    {
        console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'));
        show_usage();
    }

    else if (process.argv[2] === "tweet")
    {

        if (process.argv[3] === "--m" || process.argv[3] === "-m")
        {

            if (process.argv[5] === "--p" || process.argv[5] === "-p")
            {
                console.log(chalk.red("[ERROR]: flag \"-p\" specifies the path of the pic. Either provide the path or remove the flag"));
            }
            else if (process.argv[5] !== "--p" && process.argv[5] !== "-p")
            {
                console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[5]+'\"'+" with the argument \"tweet\""));
                show_usage();
            }
        }

        else if (process.argv[3] !== "--m" && process.argv[3] !== "-m")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'+" with the argument \"tweet\""));
            console.log(chalk.red("flag \"-m\" is expected with the argument \"tweet\". It specifies the message to be tweeted"));
        }
    }

    else if (process.argv[2] === "retweet")
    {
        if (process.argv[3] === "--i" || process.argv[3] === "-i")
        {
            console.log(chalk.red("[WARNING]: No arguments required after the flag "+'\"'+process.argv[3]+'\"'));
            show_usage();
        }
        else if (process.argv[3] !== "--i" && process.argv[3] !== "-i")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"retweet\""));
            console.log(chalk.red("flag \"-i\" is expected with the argument \"retweet\". It specifies the id of the tweet to be retweeted"));
        }
    }
    else
    {
        console.log(chalk.red("[WARNING]: No arguments required after "+'\"'+process.argv[2]+'\"'));
        show_usage();
    }
}

else if (process.argv.length === 7)
{
    if (process.argv[2] !== "tweet" && process.argv[2] !== "retweet" && process.argv[2] !== "--help" && process.argv[2] !== "-help" && process.argv[2] !== "--usage" && process.argv[2] !== "-usage" && process.argv[2] !== "init")
    {
        console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'));
        show_usage();
    }

    else if (process.argv[2] === "tweet")
    {
        if (process.argv[3] === "--m" || process.argv[3] === "-m")
        {
            if (process.argv[5] === "--p" || process.argv[5] === "-p")
            {

            }
            else if (process.argv[5] !== "--p" && process.argv[5] !== "-p")
            {
                console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[5]+'\"'+" with the argument \"retweet\""));
                show_usage();
            }
        }

        else if (process.argv[3] !== "--m" && process.argv[3] !== "-m")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'+" with the argument \"retweet\""));
            console.log(chalk.red("flag \"-i\" is expected with the argument \"retweet\". It specifies the id of the tweet to be retweeted"));
        }
    }
    
    else if (process.argv[2] === "retweet")
    {
        if (process.argv[3] !== "--i" && process.argv[3] !== "-i")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"retweet\""));
            console.log(chalk.red("flag \"-i\" is expected with the argument \"retweet\". It specifies the id of the tweet to be retweeted"));
        }

        else if (process.argv[3] === "--i" || process.argv[3] === "-i")
        {
            console.log(chalk.red("[WARNING]: No arguments required after the flag"+'\"'+process.argv[3]+'\"'));
            show_usage();
        }

    }

    else
    {
        console.log(chalk.red("[WARNING]: No arguments required after "+'\"'+process.argv[2]+'\"'));
        show_usage();
    }

}

else if (process.argv.length >= 8)
{
    if (process.argv[2] !== "tweet" && process.argv[2] !== "retweet" && process.argv[2] !== "--help" && process.argv[2] !== "-help" && process.argv[2] !== "--usage" && process.argv[2] !== "-usage" && process.argv[2] !== "init")
    {
        console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'));
        show_usage();
    }
    else if (process.argv[2] === "tweet")
    {
        if (process.argv[3] === "--m" || process.argv[3] === "-m")
        {
            if (process.argv[5] === "--p" || process.argv[5] === "-p")
            {
                console.log(chalk.red("[WARNING]: No arguments required after the flag "+'\"'+process.argv[5]+'\"'));
                show_usage();
            }
            else if (process.argv[5] !== "--p" && process.argv[5] !== "-p")
            {
                console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[5]+'\"'+" with the argument \"tweet\""));
                show_usage();
            }
        }
        else if (process.argv[3] !== "--m" && process.argv[3] !== "-m")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"tweet\""));
            show_usage();
        }
    }

    else if (process.argv[2] === "retweet")
    {
        if (process.argv[3] === "--i" || process.argv[3] === "-i")
        {
            console.log(chalk.red("[WARNING]: No arguments required after the flag "+'\"'+process.argv[3]+'\"'));
            show_usage();
        }
        else if (process.argv[3] !== "--i" && process.argv[3] !== "-i")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"retweet\""));
            show_usage();
        }
    }
    else
    {
        console.log(chalk.red("[WARNING]: No arguments required after "+'\"'+process.argv[2]+'\"'));
        show_usage();
    }
}