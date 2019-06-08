//For connecting twitter client libraries
var Twitter = require('twitter');

//For connecting to aws 
var AWS = require('aws-sdk'); 

//Loading Credentials from config.json
AWS.config.loadFromPath('./config.json');

//Calling Kinesis
var kinesis = new AWS.Kinesis(); 

//Access Key for twitter API
var client = new Twitter({
  consumer_key: 'Put your Twitter consumer_key',
  consumer_secret: 'Put your Consumer secret key',
  access_token_key: 'Put your access token key',
  access_token_secret: 'Put your access token secret key'
});

//Reading tweets by filter operation tracking only tweets containing word 'avenger'.Put words in track for which you want to analyze twitter sentiments
var stream = client.stream('statuses/filter',{
  track: 'avengers',
  language :'en'
});

stream.on('data',function (event){
	if (event.text){
		
		//convert tweets in json string.It will create file with id,timestamp and tweet and records will ne delimited by '|'
		var record =JSON.stringify({
			id:event.id,
			timestamp:event['created_at'],
			tweet: event.text.replace(/["'}{|]/g,'')
		}) + '|' //record delimiter

		//Puts Twitter data in Kinesis streams.
		kinesis.putRecord({
			Data: record,
			StreamName:'twitterStream',
			PartitionKey: 'Key'
		},function(err,data){
			if(err){
				console.error(err);
			}
			console.log('sending:',event.text);
		});
	}
});

stream.on('error',function(error){
	throw error;
});

