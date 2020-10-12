const Discord = require('discord.js');
const bot = new Discord.Client();
const token = '';

const cheerio = require('cheerio');
const request = require('request');

const PREFIX = '!';

bot.on('ready', ()=>{
  console.log('online');

})

// bot.on('message', msg=>{
//   if (msg.content === "hello"){
//     msg.reply("hiiiii");
//   }
// })

bot.on('message', message => {
  let args= message.content.substring(PREFIX.length).split(" ");

  switch (args[0]){
    case 'image':
    image(message);

    break;
  }
});

function image(message){
//randomize search result
  var options={
    url:"http://results.dogpile.com/serp?qc=images&q=" + "your search gif",
    method: "GET",
    headers:{
      "Accept":"text/html",
      "User-Agent":"Chrome"
    }
  };


  request(options,function(error,response,responseBody){
    if (error){
      return;
    }
    //getting response body from function.image
    $ = cheerio.load(responseBody);

    //part of cheerio
    var links= $(".image a.link");
    // gets every link of image we request into an array
    var urls = new Array(links.length).fill(0).map((v,i) => links.eq(i).attr("href"));

    console.log(urls);
    //checking if there's any urls, if no exit bot
    if(!urls.length){
      return;
    }
    //randomize search result
    message.channel.send(urls[Math.floor(Math.random()*urls.length)]);
  });
}

bot.login(token);
