'use strict';
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).


/* COPY AND PASTE YOUR FACTS BELOW THIS LINE */
//Gun Violence
var languageStrings = {
    "en-US": {
        "translation": {
            "FACTS": [
                "Every day, 48 children and teens are shot in murders, assaults, suicides & suicide attempts, unintentional shootings, and police intervention.",
                "Every day, 7 children and teens die from gun violence. 4 are murdered, and 2 kill themselves.",
                "Every day, 40 children and teens are shot and survive. 32 shot in an assault, 1 survives a suicide attempt, 8 are shot unintentionally",
                "Every day, 306 people in America are shot in murders, assaults, suicides, suicide attempts, unintentional shootings, and police intervention.",
                "Every day, 90 people die from gun violence.",
                "On average, one citizen dies from police gun violence every day.",
                "Every day, 216 people are shot and survive.",
                "In one year an average of 17,000 American childern and teens are shot in murders, assaults, suicides & suicide attempts, unintentional shootings, or by police intervention.",
                "Every year an average of 2,624 kids die from gun violence in America.",
                "Every year an average of 1,591 children and teens are murdered by guns in America.",
                "Every year an average of 853 children and teens kill themselves by guns in America.",
                "Every year an average of 123 children and teens are killed unintentionally by guns in America.",
                "Every year an average of 25 children and teens are killed by gun during police intervention in America.",
                "Every year an average of 14,736 kids survive gun injuries in America.",
                "Every year an average of 11,597 kids are injured in an attack involving guns in America.",
                "Every year an average of 292 kids survive a suicide attempt by gun in America.",
                "Every year an average of 2,806 kids are shot unintentionally and survive in America.",
                "Every year an average of 41 kids survive gunshots during police intervention in America.",
                "In America, 1 out of 3 homes with kids have guns and nearly 1.7 million children live in a home with an unlocked, loaded gun.",
                "In one year, 32,964 Americans die from gun violence.",
                "Every year an average of 11,184 people are murdered by guns in America.",
                "Every year an average of 20,511 people kill themselves by guns in America.",
                "Every year an average of 567 people are killed unintentionally by guns in America.",
                "Every year an average of 440 are killed by police intervention with guns in America.",
                "Every year an average of 58,210 people are injured in an attack with guns in America.",
                "Every year an average of 3,853 people survive a suicide attempt using guns in America.",
                "Every year an average of 15,798 people are shot unintentionally and survive in America.",
                "Every year an average of 955 people survive gunshots during police intervention in America.",
                "Millions of guns are sold every year in, quote, no questions asked, unquote, transactions. Experts estimate that 40 percent of guns now sold in America are done so without a Brady background check.",
                "In 2011, the FBI found that firearms were used in 68% of murders, 41% of robbery offenses, and 21% of aggravated assaults nationwide.",
                "Most homicides in the United States are committed with firearms.",
                "A higher percentage of arrestees than regular citizens own firearms.",
                "People between the ages of 15 and 24 are most likely to be targeted by gun violence as opposed to other forms of violence.",
                "Intimate partner violence can be fatal when a gun is involved — from 1990 to 2005, two-thirds of spouse and ex-spouse homicide victims were killed by guns."
            ],
            "SKILL_NAME" : "Gun violence FACTS",
            "GET_FACT_MESSAGE" : ["Here's your fact: ", "Sure! Your fact is: ", "Did you know: ", "Sure. ", "Here's a fact: "],
            "HELP_MESSAGE" : "You can say tell me a fact, or, you can say exit... What can I help you with?",
            "HELP_REPROMPT" : "What can I help you with?",
            "STOP_MESSAGE" : "Goodbye!",
            "SOURCE" : "This information was obtained from the Brady Campaign and National Institute of Justice."
        }
    }
};
/* COPY AND PASTE YOUR FACTS ABOVE THIS LINE */


/*
This function is what Amazon Lambda uses to pass the call into the code for acting upon. Some of the parameters described below:
event – AWS Lambda uses this parameter to pass in event data to the handler.
context – AWS Lambda uses this parameter to provide your handler the runtime information of the Lambda function that is executing.
callback – You can use the optional callback to return information to the caller, otherwise return value is null.
handler – This is the name of the function AWS Lambda invokes. You export this so it is visible to AWS Lambda. The file name is index.js. So, index.handler is the handler. 
*/
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    // For this demo, we are only using English. 
    // languageStrings - refers to the variable above that holds the facts. 
    alexa.resources = languageStrings;

    // You can have multiple handlers passed to registerHandlers, but for this example,
    // we only have one handler for this Alexa skill. 
    alexa.registerHandlers(handlers);

    // The execute command will 
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        var factArr = this.t('FACTS');
        var factIndex = Math.floor(Math.random() * factArr.length);
        var randomFact = factArr[factIndex];

        // Get a random intro to the message
        var factMsgArr = this.t('GET_FACT_MESSAGE');
        factIndex = Math.floor(Math.random() * factMsgArr.length);
        var randomMsgFact = factMsgArr[factIndex];

        // Create speech output
        var speechOutput = randomMsgFact + randomFact;
        var cardOutput = randomFact + " " + this.t('SOURCE');
        this.emit(':tellWithCard', speechOutput, this.t("SKILL_NAME"), cardOutput);
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("HELP_MESSAGE");
        var reprompt = this.t("HELP_MESSAGE");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t("STOP_MESSAGE"));
    }
};