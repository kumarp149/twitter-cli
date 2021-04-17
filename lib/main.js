const chalk = require('chalk');
const twitter = require('twitter');
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
    179: ["Private status","You are not authorized to retweet the tweet"],
    185: ["Daily tweet limit","You have exhausted your daily tweet limit"],
    186: ["Long tweet","The text in the tweet is too long"],
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
module.exports = {
    tweet: (message) => {
        let client = new twitter({
            consumer_key: '',
            consumer_secret: '',
            access_token_key: '',
            access_token_secret: ''
        });
        client.post('statuses/update', {status: message},function(error,tweet,response){
            if (!(error)){
                return {status: 1};
            }
            else if (error){
                let str = error.code+"";
                if (error_codes.hasOwnProperty(str) === true){
                    return {status: 0,code: str,message: (error_codes.str)[0],description: (error_codes.str)[1]};
                }
                else{
                    return {status: 0,message: "Unknown error occured"};
                }
            }
        })
    },
    retweet: (id) => {
        let client = new twitter({
            consumer_key: '',
            consumer_secret: '',
            access_token_key: '',
            access_token_secret: ''
        });
        client.post('statuses/retweet/' + id, function(error,tweet,response){
            if (!(error)){
                return {status: 1};
            }
            else if (error){
                let str = error.code+"";
                if (error_codes.hasOwnProperty(str) === true){
                    return {status: 0,code: str,message: (error_codes.str)[0],description: (error_codes.str)[1]};
                }
                else{
                    return {status: 0,message: "Unknown error occured"};
                }
            }
        })
    }
}

