const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
client.login('ODI1Nzk4NDg4MzMxNjQ5MDc0.YGDKxg.X-m-z7uuH17XcqQ_g5cPHBR5Yrw');

client.on('ready', SayReady);

function SayReady(){
  console.log(`we are running as ${client.user.tag}`)
}

function print(msg){
  console.log(msg);
}

channels = []
words = []
key = '$'

function range(startAt = 0, size) {
    return [...Array(size).keys()].map(i => i + startAt);
}

Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}


//clear chat
client.on('message', msg => {
  if (msg.author.username != client.user.tag.split('#')[0] && msg.content.split(' ')[0] == (key+'clearChat') && msg.member.hasPermission('MANAGE_CHANNELS')){
    async function clear() {
            msg.delete();
            await msg.channel.bulkDelete(100)
        }
        clear();
        
    //msg.channel.bulkDelete(fetched);
  }
});
//825866855159037993
//825866855159037993
client.on('message', msg => {
  if (msg.content.split(' ')[0] == (key+"test")){
    channel_id = msg.channel.id
    channel_name = msg.channel.name
    list = [channel_name, channel_id]
  }
});

client.on('message', msg => {
  if (msg.author.username != client.user.tag.split('#')
[0] && msg.content.split(' ')[0] == (key+'unblockChannel') && msg.member.hasPermission('MANAGE_CHANNELS')){
    var channel_id = msg.channel.id
    var channel_name = msg.channel.name
    found=false
    a=-1
    if (channels.length == 0){
      msg.reply(`oldChannelToInclude: ${channel_name} was never removed from my scope...`);
      return;
    }
    for (item of channels){
      a+=1
      if (item.equals([channel_name, channel_id]) == true){
        found=true
        list = []
        for (i of channels){
          if (i.equals(item)){
            continue
          }else{
            list.push(i)
          }
        }
        channels = list
        break
      }else{
        found=false
      }
    }
    if (!found==true){
      msg.reply(`oldChannelToInclude: ${channel_name} was never removed from my scope...`);
    }else{
      msg.reply(`newChannelToInclude: ${channel_name} has been added to my scope!`);
    }
  }else{
    return;
  }
});

client.on('message', msg => {
  if (msg.author.username != client.user.tag.split('#')
[0] && msg.content.split(' ')[0] == (key+'blockChannel') && msg.member.hasPermission('MANAGE_CHANNELS')){
    var channel_id = msg.channel.id
    var channel_name = msg.channel.name
    //msg.reply('Hello!')
      if (channels.indexOf([channel_name, channel_id]) == -1){
        channels.push([channel_name, channel_id])
        msg.reply(`newChannelToExclude: ${channel_name} has been removed from my scope!`);
      }else{
       msg.reply(`oldChannelToExclude: ${channel_name} has already been removed...`);
      }
  }else{
    return;
  }
});


//remove words from censor list
client.on('message', msg => {
  if (msg.author.username != client.user.tag.split('#')[0] && msg.content.split(' ')[0] == (key+'removeWord') && msg.member.hasPermission('MANAGE_MESSAGES')) {
     if (msg.content.split(' ').length > 2){
       msg.reply('Invalid Input: maximum of one input...');
     }else if (msg.content.split(' ').length == 1){
       msg.reply(`USAGE: [${key}removeWord][newWordToCensor]`);
     }else if (msg.content.split(' ').length == 2){
       if (words.indexOf(msg.content.split(' ')[1]) != -1){
         delete words[words.indexOf(msg.content.split(' ')[1])];
         msg.reply(`oldWordToCensor: ${msg.content.split(' ')[1]} has been removed.`);
       }else{
         msg.reply(`could not find ${msg.content.split(' ')[1]}...`)
       }
     }else{
       return;
     }
  }else{
    return;
  }
});

//add words to censor list
client.on('message', msg => {
  if (msg.author.username != client.user.tag.split('#')[0] && msg.content.split(' ')[0] == (key+'addWord') && msg.member.hasPermission("MANAGE_MESSAGES")){
    if (msg.content.split(' ').length > 2){
      msg.reply('Invalid Input: maximum of one input...');
    }else if (msg.content.split(' ').length == 1){
      msg.reply(`USAGE: [${key}addWord][newWordToCensor]`);
    }else if (msg.content.split(' ').length == 2 && words.indexOf(msg.content.split(' ')[1] != -1)){
      newWord = msg.content.split(" ")[msg.content.split(" ").length-1];
      words.push(newWord);
      msg.reply(`newWordToCensor: ${newWord} has been added.`);
      return;
    }
    
  }else{
    return;
  }
});
//825866855159037993
//looks for censor words and deletes them with a reprimanding message
client.on('message', msg => {
  if (msg.author.username != client.user.tag.split('#')[0] && !msg.member.hasPermission("MANAGE_MESSAGES")){
    found=false
    if (channels.length == 0){
      for (word of words){
       if (msg.content.includes(word)){
          msg.delete({timeout:2000})
          msg.reply('Please refrain from using rude language!')
        }
      }
      return;
    }
    for (item of channels){
      if (item.equals([msg.channel.name, msg.channel.id])){
       found=true
       break
      }else{
       found=false
      }
    }
    if (found != true){
      for (word of words){
       if (msg.content.includes(word)){
          msg.delete({timeout:2000})
          msg.reply('Please refrain from using rude language!')
        }
      }
    }else{
      return;
    } 
  }

});


//make it so that mod censorship is optional
//make it so that when command for seeing censored words comes across n-word/f-word, it changes it to whats necessary
//recomend to user to make a seperate channel for censoring words that only mods can access.
