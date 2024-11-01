=== tweetbox ===
Contributors: etftw
Tags: widget, twitter, jsonp, jquery, tweet
Requires at least: 2.9
Tested up to: 3.1
Stable tag: trunk


Fast and robust method of fetching your latest tweets

== Description ==
The tweetbox plugin let's you display your latest tweet(s) in the sidebar of your blog, in a manner which will not disrupt the rest of your blog should Twitter be slow in responding.


== Installation ==

1. Unzip the zip file and upload the entire folder to wp-content/plugins.
1. Activate the plugin through the 'Plugins' menu in WordPress

= Widget Enabled Themes = 
* Go To The Widget Screen Under Appearance. 
* Add The tweetbox Widget.
* Add Your Twitter username.
* Enter the number of tweets you want to display
* Save your changes


= Non Widget Enabled Themes =
* Add the jquery.1.3.2.min.js file to the head of your document
* Add The following HTML to your sidebar, replacing 'YOUR_USERNAME' with your actual Twitter username and 'PLUGIN_DIRECTORY' with the location of the tweetbox plugin
* <pre>
&lt;div id=&quot;tweetbox&quot;&gt;<br />
	&lt;script type=&quot;text/javascript&quot; src=&quot;PLUGIN_DIRECTORY/jquery-1.3.2.min.js&quot;&gt;&lt;/script&gt;<br />
	&lt;script type=&quot;text/javascript&quot; src=&quot;PLUGIN_DIRECTORY/tweetbox.js&quot;&gt;&lt;/script&gt;<br />
	&lt;script&gt;getTweets('YOUR_USERNAME', NUMBER_OF_TWEETS, 'checked' to enable day light saving or '' to disable it)&lt;/script&gt;<br />
	&lt;div id=&quot;tweetboxtweets&quot;&gt;Fetching latest tweets...&lt;/div&gt;<br />
&lt;/div&gt;
</pre>

== Changelog ==
= 1.2.8 =
* Added a day light saving time option to display the correct time for people affected by day light saving

= 1.2.7 =
* Fixed an issue with the date processing, the times are now in sync with Twitter and the "moments ago" notice will only display while the tweet is less than two minutes old

= 1.2.6 =
* Fixed a problem that could cause plugins to conflict

= 1.2.5 =
* Added detection of usernames and link generation.
* Fixed a bug with the URL detection regex

= 1.1.3 =
* Created WordPress plugin from the tweetbox module

== Upgrade Notice ==
= 1.2.8 =
Fixed an issue caused by day light saving time

= 1.2.7 =
Fixes an issue with the "Posted moments ago" notice being displayed longer than two minutes

= 1.2.6 = 
Prevents tweetbox conflicting with other jQuery plugins

= 1.2.5 =
Adds new functionality to link generation and fixes bugs

== Screenshots ==
1. View of the widget in use.

