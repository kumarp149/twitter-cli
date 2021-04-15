#!/usr/bin/env node 
const parseArgs = require('minimist');
const chalk = require('chalk');
var argv = parseArgs(process.argv.slice(2), opts={})
//console.log(argv);
var arg_length = argv._;
x = "help";
if (arg_length == 0)
{
    var flag_for_error_prop = 0;
    var flag_for_error_value = 0;
    for (var prop in argv)
    {
        if (prop !== "_" && prop !== "help" && argv.hasOwnProperty(prop))
        {
            //console.error("Unrecognised value "+prop);
            let x = "[Argument error]: Unexpected argument "+'\"'+prop+'\"'+" while help";
            console.log(chalk.red(x));
            if (flag_for_error_prop === 0)
            {
                flag_for_error_prop = 1;
            }
        }
    }
    if (flag_for_error_prop === 0)
    {
        if (argv.help === true)
        {
            console.log("help");
        }
        else
        {
            flag_for_error_value = 1;
            let x = "[Argument error]: Unexpected argument "+'\"'+argv.help+'\"'+" while help";
            console.log(chalk.red(x));
        }
    }
    if (flag_for_error_prop === 1 || flag_for_error_value === 1)
    {
        let info = "Usage: try \"twitter --help\" for help"
        console.log(chalk.green(info));
    }
}
