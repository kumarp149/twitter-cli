#!/usr/bin/env node 
//const parseArgs = require('minimist');
const chalk = require('chalk');

const twitter = require('twitter');
const prompt_lib = require('prompt-sync')();

const command_args = [];

const fs = require("fs");

const error_codes
=
{
    32: ["Authentication error","Incorrect credentials provided. Reset them with \"twitter init\""],
    34: ["The page doesnot exist","The id of the tweet doesnot exist"],
    63: ["User account suspended","The user account has been suspended"],
    64: ["You account suspended","Your account has been suspended"],
    68: ["Actions disabled","Some actions for this tweet have been disabled"],
    87: ["Client not permitted","You are not permitted to perform this action"],
    88: ["Rate Limit exceed","You have exceeded the rate limit"],
    89: ["Access token error","The access token is invalid or expired. Reset it with \"twitter init\""],
    99: ["Invalid credentials","The OAuth credentials are invalid. Reset them with \"twitter init\""],
    130: ["Over capacity","Twitter is temperorily over capacity"],
    131: ["Internal Error","Unknown internal error"],
    135: ["Authentication error","Timestamp out of bounds, check your system clock"],
    139: ["Like error","You have liked the tweet already"],
    144: ["Invalid status Id","There is no tweet with the id mentioned"],
    170: ["Empty message","Message cannot be empty"],
    179: ["Private status","You are not authorized to retweet the tweet"],
    185: ["Daily tweet limit","You have exhausted your daily tweet limit"],
    186: ["Long tweet","The text in the tweet is too long. Try reducing the size of the message and try again"],
    187: ["Duplicate tweet","Tweet is duplicate. Try modifying the text or image"],
    203: ["Device error","There is an error with the device"],
    215: ["Bad authentication","Invalid authentication. Reset the credentials with \"twitter init\""],
    220: ["No access","You credentials have no access to this resource"],
    261: ["No write access","You app donot have write access"],
    327: ["Already retweeted","You have already retweeted the tweet"],
    416: ["Invalid app","You app is suspended/invalid"],
    421: ["Tweet expired","Tweet no longer exists"],
    422: ["Tweet expired","Tweet no longer exists because it violated twitter rules"],
    425: ["Actions disabled","Some actions for this tweet are disabled by twitter"],
}

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
    process.exit(1);
}


else if (process.argv.length === 3)
{
    if (process.argv[2] === "--help" || process.argv[2] === "-help" || process.argv[2] === "--usage" || process.argv[2] === "-usage")
    {
        show_usage();
        process.exit(1);
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
        process.exit(1);
    }
    else
    {
        console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'));
        show_usage();
        process.exit(1);
    }
}


else if (process.argv.length === 4)
{

    if (process.argv[2] !== "tweet" && process.argv[2] !== "retweet" && process.argv[2] !== "--help" && process.argv[2] !== "-help" && process.argv[2] !== "--usage" && process.argv[2] !== "-usage" && process.argv[2] !== "init")
    {
        console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'));
        show_usage();
        process.exit(1);
    }


    else if (process.argv[2] === "tweet")
    {
        if (process.argv[3] === "-m" || process.argv[3] === "--m")
        {
            console.log(chalk.red("[ERROR]: flag \"-m\" cannot be NULL. It specifies the message to be tweeted"));
            process.exit(1);
        }
        else
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"tweet\""));
            console.log(chalk.red("flag \"-m\" is expected with the argument \"tweet\". It specifies the message to be tweeted"));
            process.exit(1);
        }
    }


    else if (process.argv[2] === "retweet")
    {
        if (process.argv[3] === "-i" || process.argv[3] === "--i")
        {
            console.log(chalk.red("[ERROR]: flag \"-i\" cannot be NULL. It specifies the id of the tweet to be retweeted"));
            process.exit(1);
        }
        else
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"retweet\""));
            console.log(chalk.red("flag \"-i\" is expected with the argument \"retweet\". It specifies the id of the tweet to be retweeted"));
            process.exit(1);
        }
    }


    else
    {
        console.log(chalk.red("[WARNING]: No arguments required after "+'\"'+process.argv[2]+'\"'));
        show_usage();
        process.exit(1);
    }


}
else if (process.argv.length === 5)
{

    if (process.argv[2] !== "tweet" && process.argv[2] !== "retweet" && process.argv[2] !== "--help" && process.argv[2] !== "-help" && process.argv[2] !== "--usage" && process.argv[2] !== "-usage" && process.argv[2] !== "init")
    {
        console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'));
        show_usage();
        process.exit(1);
    }

    else if (process.argv[2] === "tweet")
    {
        if (process.argv[3] !== "--m" && process.argv[3] !== "-m")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'+" with the argument \"retweet\""));
            console.log(chalk.red("flag \"-m\" is expected with the argument \"tweet\". It specifies the message to be tweeted"));
            process.exit(1);
        }
        else if (process.argv[3] === "--m" || process.argv[3] === "-m")
        {
            let obj = JSON.parse(fs.readFileSync(__dirname + "/../config/config.json"));
            if ((obj.hasOwnProperty("consumer_key")  && obj.consumer_key === "") || (obj.hasOwnProperty("consumer_secret") && obj.consumer_secret === "") || (obj.hasOwnProperty("access_token_key") && obj.access_token_key === "") || (obj.hasOwnProperty("access_token_secret") && obj.access_token_secret === "")){
                console.log(chalk.red("twitter developer credentials not set. Run \"twitter init\" to set them"));
                process.exit(1);
            }
            else if (!(obj.hasOwnProperty("consumer_key")) || !(obj.hasOwnProperty("consumer_secret")) || !(obj.hasOwnProperty("access_token_key")) || !(obj.hasOwnProperty("access_token_secret"))){
                console.log(chalk.red("twitter developer credentials not set. Run \"twitter init\" to set them"));
                process.exit(1);
            }
            else{
                require('dns').lookup('api.twitter.com',function (err) {
                    if (err){
                        console.log(chalk.red("[ERROR]: Either you are not connected to internet or \"api.twitter.com\" is down. Try troubleshooting your network connection and try again."));
                        process.exit(1);
                    }
                })
                let client = new twitter(obj);
                client.post('statuses/update', {status: process.argv[4]},function(error,tweet,response){
                    if (!(error)){
                        console.log(chalk.green("Tweet succesfully sent"));
                        process.exit(1);
                    }
                    else if (error){
                        let str = error[0].code;
                        if (error_codes[str] !== undefined){
                            console.log(chalk.red("[ERROR]: "+error_codes[str][0]));
                            console.log(chalk.red("Error Description: "+error_codes[str][1]));
                            process.exit(1);
                        }
                        else{
                            console.log(chalk.red("[ERROR]: An unknown error occured"));
                            process.exit(1);
                        }
                    }
                })
            }
        }
    }

    else if (process.argv[2] === "retweet")
    {

        if (process.argv[3] !== "--i" && process.argv[3] !== "-i")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"retweet\""));
            console.log(chalk.red("flag \"-i\" is expected with the argument \"retweet\". It specifies the id of the tweet to be retweeted"));
            process.exit(1);
        }

        else if (process.argv[3] === "--i" || process.argv[3] === "-i")
        {
            let obj = JSON.parse(fs.readFileSync(__dirname + "/../config/config.json"));
            if ((obj.hasOwnProperty("consumer_key")  && obj.consumer_key === "") || (obj.hasOwnProperty("consumer_secret") && obj.consumer_secret === "") || (obj.hasOwnProperty("access_token_key") && obj.access_token_key === "") || (obj.hasOwnProperty("access_token_secret") && obj.access_token_secret === "")){
                console.log(chalk.red("twitter developer credentials not set. Run \"twitter init\" to set them"));
                process.exit(1);
            }
            else if (!(obj.hasOwnProperty("consumer_key")) || !(obj.hasOwnProperty("consumer_secret")) || !(obj.hasOwnProperty("access_token_key")) || !(obj.hasOwnProperty("access_token_secret"))){
                console.log(chalk.red("twitter developer credentials not set. Run \"twitter init\" to set them"));
                process.exit(1);
            }
            else{
                require('dns').lookup('api.twitter.com',function (err) {
                    if (err){
                        console.log(chalk.red("[ERROR]: Either you are not connected to internet or \"api.twitter.com\" is down. Try troubleshooting your network connection and try again."));
                        process.exit(1);
                    }
                })
                let client = new twitter(obj);
                client.post('statuses/retweet/'+process.argv[4],function(error,tweet,response){
                    if (!(error)){
                        console.log(chalk.green("Succesfully retweeted the tweet"));
                        process.exit(1);
                    }
                    else{
                        let str = error[0].code;
                        if (error_codes[str] !== null){
                            console.log(chalk.red("[ERROR]: "+error_codes[str][0]));
                            console.log(chalk.red("Error Description: "+error_codes[str][1]));
                            process.exit(1);
                        }
                        else{
                            console.log(chalk.red("[ERROR]: An unknown error occured"));
                            process.exit(1);
                        }
                    }
                })
            }
        }
    }

    else
    {
        console.log(chalk.red("[WARNING]: No arguments required after "+'\"'+process.argv[2]+'\"'));
        show_usage();
        process.exit(1);
    }
}

else if (process.argv.length == 6)
{

    if (process.argv[2] !== "tweet" && process.argv[2] !== "retweet" && process.argv[2] !== "--help" && process.argv[2] !== "-help" && process.argv[2] !== "--usage" && process.argv[2] !== "-usage")
    {
        console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'));
        show_usage();
        process.exit(1);
    }

    else if (process.argv[2] === "tweet")
    {

        if (process.argv[3] === "--m" || process.argv[3] === "-m")
        {

            if (process.argv[5] === "--p" || process.argv[5] === "-p")
            {
                console.log(chalk.red("[ERROR]: flag \"-p\" specifies the path of the pic. Either provide the path or remove the flag"));
                process.exit(1);
            }
            else if (process.argv[5] !== "--p" && process.argv[5] !== "-p")
            {
                console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[5]+'\"'+" with the argument \"tweet\""));
                show_usage();
                process.exit(1);
            }
        }

        else if (process.argv[3] !== "--m" && process.argv[3] !== "-m")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'+" with the argument \"tweet\""));
            console.log(chalk.red("flag \"-m\" is expected with the argument \"tweet\". It specifies the message to be tweeted"));
            process.exit(1);
        }
    }

    else if (process.argv[2] === "retweet")
    {
        if (process.argv[3] === "--i" || process.argv[3] === "-i")
        {
            console.log(chalk.red("[WARNING]: No arguments required after the flag "+'\"'+process.argv[3]+'\"'));
            show_usage();
            process.exit(1);
        }
        else if (process.argv[3] !== "--i" && process.argv[3] !== "-i")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"retweet\""));
            console.log(chalk.red("flag \"-i\" is expected with the argument \"retweet\". It specifies the id of the tweet to be retweeted"));
            process.exit(1);
        }
    }
    else
    {
        console.log(chalk.red("[WARNING]: No arguments required after "+'\"'+process.argv[2]+'\"'));
        show_usage();
        process.exit(1);
    }
}

else if (process.argv.length === 7)
{
    if (process.argv[2] !== "tweet" && process.argv[2] !== "retweet" && process.argv[2] !== "--help" && process.argv[2] !== "-help" && process.argv[2] !== "--usage" && process.argv[2] !== "-usage" && process.argv[2] !== "init")
    {
        console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'));
        show_usage();
        process.exit(1);
    }

    else if (process.argv[2] === "tweet")
    {
        if (process.argv[3] === "--m" || process.argv[3] === "-m")
        {
            if (process.argv[5] === "--p" || process.argv[5] === "-p")
            {
                if (process.argv[6] === ""){
                    console.log(chalk.red("[ERROR]: Path of the image cannot be empty"));
                    process.exit(1);
                }
                else{
                    if (!(fs.existsSync(process.argv[6]))){
                        console.log(chalk.red("[ERROR]: Error reading the image. Please provide the path to a JPEG/PNG/GIF image"));
                        process.exit(1);
                    }
                    let ext = require("path").extname(process.argv[6]);
                    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".gif"){
                        console.log(chalk.red("[ERROR]: Invalid image type. Twitter only supports JPEG, PNG and GIF types"));
                        process.exit(1);
                    }
                    else{
                        let data = fs.readFileSync(process.argv[6]);
                        let obj = JSON.parse(fs.readFileSync(__dirname + "/../config/config.json"));
                        if ((obj.hasOwnProperty("consumer_key")  && obj.consumer_key === "") || (obj.hasOwnProperty("consumer_secret") && obj.consumer_secret === "") || (obj.hasOwnProperty("access_token_key") && obj.access_token_key === "") || (obj.hasOwnProperty("access_token_secret") && obj.access_token_secret === "")){
                            console.log(chalk.red("twitter developer credentials not set. Run \"twitter init\" to set them"));
                            process.exit(1);
                        }
                        else if (!(obj.hasOwnProperty("consumer_key")) || !(obj.hasOwnProperty("consumer_secret")) || !(obj.hasOwnProperty("access_token_key")) || !(obj.hasOwnProperty("access_token_secret"))){
                            console.log(chalk.red("twitter developer credentials not set. Run \"twitter init\" to set them"));
                            process.exit(1);
                        }
                        else{
                            require('dns').lookup("api.twitter.com",function(err){
                                if (err){
                                    console.log(chalk.red("[ERROR]: Either you are not connected to internet or \"api.twitter.com\" is down. Try troubleshooting your network connection and try again."));
                                    process.exit(1);
                                }
                            });
                            let client = new twitter(obj);
                            client.post('media/upload',{media: data},function(error,media,response){
                                if (!(error)){
                                    //console.log(media);
                                    let status = {
                                        status: process.argv[4],
                                        media_ids: media.media_id_string
                                    }
                                    client.post('statuses/update',status,function(error,tweet,response){
                                        if (!(error)){
                                            console.log(chalk.green("tweet succesfully sent"));
                                            process.exit(1);
                                        }
                                        else if (error){
                                            console.log(chalk.red("[ERROR]: "+error));
                                            process.exit(1);
                                        }
                                    })
                                }
                                else if (error){
                                    console.log(chalk.red("[ERROR]: "+error));
                                }
                            })
                        }
                    }
                }
            }
            else if (process.argv[5] !== "--p" && process.argv[5] !== "-p")
            {
                console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[5]+'\"'+" with the argument \"retweet\""));
                show_usage();
                process.exit(1);
            }
        }

        else if (process.argv[3] !== "--m" && process.argv[3] !== "-m")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'+" with the argument \"retweet\""));
            console.log(chalk.red("flag \"-i\" is expected with the argument \"retweet\". It specifies the id of the tweet to be retweeted"));
            process.exit(1);
        }
    }
    
    else if (process.argv[2] === "retweet")
    {
        if (process.argv[3] !== "--i" && process.argv[3] !== "-i")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"retweet\""));
            console.log(chalk.red("flag \"-i\" is expected with the argument \"retweet\". It specifies the id of the tweet to be retweeted"));
            process.exit(1);
        }

        else if (process.argv[3] === "--i" || process.argv[3] === "-i")
        {
            console.log(chalk.red("[WARNING]: No arguments required after the flag"+'\"'+process.argv[3]+'\"'));
            show_usage();
            process.exit(1);
        }

    }

    else
    {
        console.log(chalk.red("[WARNING]: No arguments required after "+'\"'+process.argv[2]+'\"'));
        show_usage();
        process.exit(1);
    }

}

else if (process.argv.length >= 8)
{
    if (process.argv[2] !== "tweet" && process.argv[2] !== "retweet" && process.argv[2] !== "--help" && process.argv[2] !== "-help" && process.argv[2] !== "--usage" && process.argv[2] !== "-usage" && process.argv[2] !== "init")
    {
        console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[2]+'\"'));
        show_usage();
        process.exit(1);
    }
    else if (process.argv[2] === "tweet")
    {
        if (process.argv[3] === "--m" || process.argv[3] === "-m")
        {
            if (process.argv[5] === "--p" || process.argv[5] === "-p")
            {
                console.log(chalk.red("[WARNING]: No arguments required after the flag "+'\"'+process.argv[5]+'\"'));
                show_usage();
                process.exit(1);
            }
            else if (process.argv[5] !== "--p" && process.argv[5] !== "-p")
            {
                console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[5]+'\"'+" with the argument \"tweet\""));
                show_usage();
                process.exit(1);
            }
        }
        else if (process.argv[3] !== "--m" && process.argv[3] !== "-m")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"tweet\""));
            show_usage();
            process.exit(1);
        }
    }

    else if (process.argv[2] === "retweet")
    {
        if (process.argv[3] === "--i" || process.argv[3] === "-i")
        {
            console.log(chalk.red("[WARNING]: No arguments required after the flag "+'\"'+process.argv[3]+'\"'));
            show_usage();
            process.exit(1);
        }
        else if (process.argv[3] !== "--i" && process.argv[3] !== "-i")
        {
            console.log(chalk.red("[ERROR]: Unexpected argument "+'\"'+process.argv[3]+'\"'+" with the argument \"retweet\""));
            show_usage();
            process.exit(1);
        }
    }
    else
    {
        console.log(chalk.red("[WARNING]: No arguments required after "+'\"'+process.argv[2]+'\"'));
        show_usage();
        process.exit(1);
    }
}