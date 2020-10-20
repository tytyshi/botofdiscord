const Discord = require('discord.js');
const bot = new Discord.Client();
const token = '';


// cheerio is used to extract html content, based on jquery
const cheerio = require('cheerio');
//used to make requests to urls and fetch response
const request = require('request');

const PREFIX = '!';

bot.on('ready', ()=>{
  console.log('online');

})

bot.on("ready", function() {
	console.log("logged in");
});

bot.on("message", function(message) {

	var parts = message.content.split(" "); 
	if (parts[0] === "!image") { // check if first part of search is image command

		image(message, parts); // Pass requester message to image function

	}

});

function image(message, parts) {


	var search = parts.slice(1).join(" ");

	var options = {
	    url: "http://results.dogpile.com/serp?qc=images&q=" + search,
	    method: "GET",
	    headers: {
	        "Accept": "text/html",
	        "User-Agent": "Chrome"
	    }
	};
	request(options, function(error, response, responseBody) {
		if (error) {
			// handle error
			return;
		}

		$ = cheerio.load(responseBody); // load responseBody into cheerio (jQuery)

		var links = $(".image a.link");

		var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));


		console.log(urls);
		if (!urls.length) {
			// checking if there's any urls, if not exit the bot
			return;
		}

    message.channel.send(urls[Math.floor(Math.random()*urls.length)]);

	});

}
bot.login(token);
