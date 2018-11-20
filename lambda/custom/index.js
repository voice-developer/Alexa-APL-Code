/* eslint-disable  func-names */
/* eslint-disable  no-console */
/* Author: Stuart Pocklington - aka Smart Home Bloke 16.11.18 */

const Alexa = require('ask-sdk-core');
const skillName = 'Santa\'s Little Helper';
const launchMsg = 'Find out if you are on Santa\'s naughty or nice list';
const sleighBells = '<audio src="https://dl.dropboxusercontent.com/s/nyfut6sxsl71e3s/sleighBells4s.mp3?dl=0" />';
const FALLBACK_MESSAGE = `<say-as interpret-as="interjection">d'oh</say-as><break time="1s"/>I don\'t know how to help you with that. Tell me your name to see if you are on the naughty or nice list, or say help `;
const FALLBACK_REPROMPT = '<voice name="Justin">What can I help you with?</voice>';

/* The below arrays used to return a random message - add new rows to add more */
const listIntro = [
  '<voice name="Justin">Awesome! You are on the Nice list. Santa will be seeing you soon I guess. Remember to stay good and come back tomorrow to see if you\'re still on the nice list. Merry Christmas!</voice>  ',
  '<voice name="Justin">Great news! you\'re on the Nice list. Santa has asked me to Remind you that you have to be well behaved everyday so you don\'t end up on the naughty list.</voice>  ',
  '<voice name="Justin">It\'s bad news I am afraid! <break time="1s" /> Just kidding! Santa has told me that you\'re on the Nice list. Just remember to be good everyday so you don\'t end up on the naughty list</voice>  ',
  '<voice name="Justin">Guess what <break time="1s"/>, I have asked Santa, and he has told me that <break time="1s" /> you\'re on the Nice list and he is very proud of you.</voice>  ',
  '<voice name="Justin">Santa has told me that you have been very good all year, so you\'re on the list of nice children. Awesome! Merry christmas to you!</voice>',
  '<voice name="Brian">Hi, Santa here. I wanted to tell you in person that you are on the nice list. Make sure you\'re good everyday, and I will see you soon!</voice>',
  '<voice name="Brian">Hi there, Santa here. Welldone for being really well behaved. You are on the nice list. Ho Ho Ho!</voice>',
  '<voice name="Brian">Santa here. It\'s great to meet you. you\'re on the nice list! Not long now until I will be bringing presents. Remember to be good everyday!</voice>',
  '<voice name="Justin">Awesome! You are on the Nice list. Santa will be seeing you soon I guess. Remember to stay good and come back tomorrow to see if you\'re still on the nice list. Happy Holiday\'s!</voice>  '
];
const welcomeMsg = [
  '<voice name="Justin">Santa\'s little helper at your service. Thanks for stopping by. Tell me your name to begin.</voice> ',
  '<voice name="Justin">Happy Holidays. Santa\'s little helper here. Tell me your name to begin.</voice> ',
  '<voice name="Justin">I do hope you have been good, tell me your name and I can check if you are on Santa\'s naughty or nice list.</voice>',
  '<voice name="Justin">Hi, I\'m Santa\'s little helper, I can ask Santa if you are on his naughty or nice list. Tell me your name and I will check for you!</voice> ',
  '<voice name="Justin">Hi there, I am Santa\'s little helper. I help Santa to keep track of who is naughty, and who is nice! What\'s your name?</voice>'
];
const noMsg = [
  '<voice name="Justin">Don\'t be shy, I bet you\'re on the nice list. Say yes to find out!</voice>',
  '<voice name="Justin">You have been well behaved have\'nt you. I hope so! Say yes to see if you are on the naughty or nice list!</voice>',
  '<voice name="Justin">Are you worried about being on the naughty list? I reckon you might be pleasantly suprised. Say yes to find out which list you\'re on!</voice>'

];
const gotName = [
  ' that\'s a great name! I wonder which list you will be on? are you ready to find out?',
  ' ,what a delightful name! I wonder which list you will be on? are you ready to find out?',
  ' I wonder which list you will be on? are you ready to find out?'
];
const stopMsg = [
  '<voice name="Justin">Come back again soon to check which list you are on. Just say Alexa open Santa\'s little helper</voice>',
  '<voice name="Justin">It\'s been great seeing you. Come back again soon to check which list you are on. Just say Alexa open Santa\'s little helper</voice>',
  '<voice name="Justin">Happy holidays. Come back again soon to check which list you are on. Just say Alexa open Santa\'s little helper</voice>'

]


/* intent handlers  - you must ass the name of each handler at the bottom of the script or you will get an error*/
/* All intents need adding to the models/en-US.json also */
const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    //type name of array into the brackets
    let speechOutput = getRandomPhrase(welcomeMsg);
    const speechText = sleighBells + speechOutput;
if(handlerInput.supportsDisplay){
  return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, launchMsg)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: require('./launch.json'),
        dataSources: {}
      })
      .getResponse();
  }else{
    return handlerInput.responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .withSimpleCard(skillName, launchMsg)
    .getResponse();
  }

}
    
};

const FallbackHandler = {

  // 2018-May-01: AMAZON.FallackIntent is only currently available in en-US locale.

  //              This handler will not be triggered except in that locale, so it can be

  //              safely deployed for any locale.

  canHandle(handlerInput) {

    const request = handlerInput.requestEnvelope.request;

    return request.type === 'IntentRequest'

      && request.intent.name === 'AMAZON.FallbackIntent';

  },

  handle(handlerInput) {

    return handlerInput.responseBuilder

      .speak(FALLBACK_MESSAGE)

      .reprompt(FALLBACK_REPROMPT)

      .getResponse();

  },

};

const getFirstNameIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'getFirstNameIntent';
      
  },
  handle(handlerInput) {
    
    const itemSlot = handlerInput.requestEnvelope.request.intent.slots.firstName.value;
      const voiceNameOpenTag = '<voice name="Justin">';
      const voiceNameCloseTag = '</voice>';
      const nameText = getRandomPhrase(gotName);
      const speechText = voiceNameOpenTag + itemSlot + voiceNameCloseTag + voiceNameOpenTag + nameText + voiceNameCloseTag;
      const cardText = itemSlot + " " + nameText;
    
    
  
    if(handlerInput.supportsDisplay){
      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, cardText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: require('./name.json'),
        dataSources: {}
      })
      .getResponse();
  }else{
    return handlerInput.responseBuilder
    .speak(speechText)
    .reprompt(speechText)
    .withSimpleCard(skillName, cardText)
    .getResponse();

  }

    },
};
const merryChristmasIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'merryChristmasIntent';
      
  },
  handle(handlerInput) {
    
     const voiceNameOpenTag = '<voice name="Justin">';
      const voiceNameCloseTag = '</voice>';
      const merryMsg = 'Happy holidays and merry christmas to you too! Say stop to close this skill or say yes to see if you are on the naughty or nice list!';
      const speechText = voiceNameOpenTag + merryMsg + voiceNameCloseTag;
      const cardText = merryMsg;
      
      if(handlerInput.supportsDisplay){
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(skillName, cardText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          document: require('./merryXmas.json'),
          dataSources: {}
        })
        .getResponse();

      }else{
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(skillName, cardText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          document: require('./merryXmas.json'),
          dataSources: {}
        })
        .getResponse();

      }
      
  },
};
const yesIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
      
  },
  handle(handlerInput) {
    
    const endMsg = '<break time="1s" /><voice name="Justin"> If you want to double check say yes, or say you can stop to close this skill!</voice>';
    let speechOutput = getRandomPhrase(listIntro);
    const speechText = sleighBells + speechOutput + endMsg;
    const cardText = 'If you want to double check say yes, or say you can stop to close this skill!';
    
    if(handlerInput.supportsDisplay){
      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, cardText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: require('./list.json'),
        dataSources: {}
      })
      .getResponse();
    }else{
      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, cardText)
      .getResponse();

    }
    
  },
};
const blahBlahIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'blahBlahIntent';
      
  },
  handle(handlerInput) {
    
    
      const voiceNameOpenTag = '<voice name="Justin">';
      const voiceNameCloseTag = '</voice>';
      const speechText = voiceNameOpenTag + ' Bar humbug! Blah Blah Blah. I think someone needs to find some christmas cheer. Say yes if you want to see if you are on the naughty or nice list' + voiceNameCloseTag;
      const cardText = 'Bar humbug! Blah Blah Blah. I think someone needs to find some christmas cheer';
      
      if(handlerInput.supportsDisplay){
        return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .withSimpleCard(skillName, cardText)
        .addDirective({
          type: 'Alexa.Presentation.APL.RenderDocument',
          document: require('./blahblah.json'),
          dataSources: {}
        })
        .getResponse();

      }else{
        return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, cardText)
      .getResponse();
      }
      
  },
};
const noIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
      
  },
  handle(handlerInput) {
    
    
    let speechOutput = getRandomPhrase(noMsg);
    const speechText = speechOutput;
    const cardText = 'Don\'t be shy, say yes to find out if you are on the naughty or nice list';
    
    if(handlerInput.supportsDisplay){
      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, cardText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: require('./noMsg.json'),
        dataSources: {}
      })
      .getResponse();

    }else{
      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, cardText)
      .getResponse();
    }
    
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const voiceNameOpenTag = '<voice name="Justin">';
    const voiceNameCloseTag = '</voice>';
    const speechText = voiceNameOpenTag + 'Just follow the prompts and I will help you to find out if you are on Santa\'s naughty or nice list. Tell me your name to get started!' + voiceNameCloseTag;
    const cardText = 'Just follow the prompts and I will help you to find out if you are on Santa\'s naughty or nice list. Tell me your name to get started!';
    
    if(handlerInput.supportsDisplay){
      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, cardText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: require('./helpScreen.json'),
        dataSources: {}
      })
      .getResponse();

    }else{
      return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard(skillName, cardText)
      .getResponse();

    }
    
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
        || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    let speechOutput = getRandomPhrase(stopMsg);
    const speechText = speechOutput;
    const cardText = 'Come back soon to see what list you are on. Just say Alexa, open santa\'s little helper';
    if(handlerInput.supportsDisplay){
      return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(skillName, cardText)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        document: require('./stop.json'),
        dataSources: {}
      })
      .getResponse();

    }else{
      return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard(skillName, cardText)
      .getResponse();
    }
    
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

function getRandomPhrase(array) {
  // the argument is an array [] of words or phrases
  const i = Math.floor(Math.random() * array.length);
  return (array[i]);
};



const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    getFirstNameIntentHandler,
    FallbackHandler,
    yesIntentHandler,
    noIntentHandler,
    merryChristmasIntentHandler,
    blahBlahIntentHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
