/*
	Plugin Name: tweetbox
	Plugin URI: https://wordpress.org/plugins/tweetbox/
	Description: A fast and robust Twitter plugin powered by JQuery
	Author: etftw
	Version: 1.2.8
	Author URI: https://wordpress.org/plugins/tweetbox/
*/	
var J = jQuery.noConflict();
function processDate(itm, dls)
{
	var n = new Date(), t, ago = " ";
	t = Math.round((n.getTime() / 1000 - parseInt(itm)) / 60);
	if(dls == 'checked')
	{
		t = t - 120;
	}
	ago += getTimeSince(t, itm);
	return ago;            
}

function getTimeSince( t, original_timestamp ) 
{
	t += 3;
	var ago = " ", date;
	if(t <= 1) {
		ago += " moments ago";
	} else if(t < 60) {
		ago += t + " mins ago";
	} else if(t >= 60 && t <= 120) {
		ago += Math.floor(t / 60) + " hour ago"
	} else if(t < 1440) {
		ago += Math.floor(t / 60)  + " hours ago";
	} else if(t < 2880) {
		ago +=  "1 day ago";
	} else if(t > 2880  && t < 4320) {
		ago +=  "2 days ago";
	} else {
		date = new Date(parseInt(original_timestamp) * 1000) 
		ago = "on " + date.toUTCString();
	}
	return ago;
}     

function convertApacheToUNIX(apache, dls)
{
	var day = apache.substring(8, 10);
	var time = apache.substring( 10, 19 );
	var year = apache.substring(26, 30);
	var month = apache.substring(4, 7);
	var processableDate = day + " " + month + " " + year + " " + time;
	var ts = parseInt(Date.parse(processableDate));
	ts = (((ts / 10) / 10) / 10);
	if(dls == 'checked')
	{
		ts = ts - 3600;
	}
	return ts;
}

function convertURLs(tweet)
{
	var regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	return tweet.replace(regex, '<a href="$1" target="_blank">$1</a>');
}

function generateUserLinks(tweet)
{
	var regex = /([@])([\w]+)/ig;
	return tweet.replace(regex, '<a href="http://twitter.com/$2" target="_blank">$1$2</a>');
}

function getTweets(username, tweets, dls)
{
	J.getJSON(
		'http://twitter.com/status/user_timeline/' + username + '.json?count=' + tweets + '&callback=?',
		function(data){
			J('#tweetboxtweets').empty();
			J.each(data, function(i, tweets){
				if( tweets.created_at != undefined )
				{
					J('#tweetboxtweets').append('<div class="tweet">');
					J('#tweetboxtweets').append('<p>');
					var tweet = generateUserLinks(convertURLs(tweets.text));
					J('#tweetboxtweets').append(tweet);
					J('#tweetboxtweets').append('<br />');
					J('#tweetboxtweets').append('Posted <a href="http://twitter.com/' + username + '/status/' + tweets.id + '" target="_blank">' + 
processDate(convertApacheToUNIX(tweets.created_at, dls), dls) + "</a> from " + tweets.source);
					J('#tweetboxtweets').append('</p>');
					J('#tweetboxtweets').append('</div>');
				}
			});
		}
	);	
}
