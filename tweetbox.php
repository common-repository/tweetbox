<?php
	/*
	Plugin Name: tweetbox
	Plugin URI: https://wordpress.org/plugins/tweetbox/
	Description: A fast and robust Twitter plugin powered by JQuery that is fully customisable and lets you fetch your latest tweets and display them on your WordPress blog.
	Author: etftw
	Version: 1.2.8
	Author URI: https://wordpress.org/plugins/tweetbox/
	*/
	add_action("widgets_init", array('tweetbox', 'register'));
	register_activation_hook( __FILE__, array('tweetbox', 'activate'));
	register_deactivation_hook( __FILE__, array('tweetbox', 'deactivate'));
	wp_enqueue_script("jquery", false, false, "1.3.2");	
	
	class tweetbox
	{		
		function activate()
		{
			$data = array('tweetbox_username' => 'etftw' ,'tweetbox_no_tweets' => 5, 'tweetbox_title' => 'Latest Tweets');
			if (! get_option('tweetbox'))
			{
				add_option('tweetbox' , $data);
			} 
			else 
			{
				update_option('tweetbox' , $data);
			}
		}
		  
		function deactivate()
		{
			delete_option('tweetbox');
		}

		function control()
		{
			$data = get_option('tweetbox');
			echo '<p><label>Twitter username<br /></label><input name="tweetbox_username" type="text" value="'.$data['tweetbox_username'].'" /></p>';
			echo '<p><label>Title<br /></label><input name="tweetbox_title" type="text" value="'.$data['tweetbox_title'].'" /></p>';
			echo '<p><label>Number of tweets to display<br /></label><input name="tweetbox_no_tweets" type="text" value="'.$data['tweetbox_no_tweets'].'" /></p>';
			echo '<p><input type="checkbox" name="tweetbox_dls" value="checked"'.($data['tweetbox_dls'] == "checked" ? ' checked="checked"' : '').'><label>&nbsp;Day Light Saving</label>';
			if(isset($_POST['tweetbox_username']))
			{
				$data['tweetbox_username'] = attribute_escape($_POST['tweetbox_username']);
				$data['tweetbox_title'] = attribute_escape($_POST['tweetbox_title']);
				$data['tweetbox_no_tweets'] = attribute_escape($_POST['tweetbox_no_tweets']);
				$data['tweetbox_dls'] = attribute_escape($_POST['tweetbox_dls']);
				update_option('tweetbox', $data);
			}
		}
		
		function widget($args) 
		{
			$pluginDirectory = WP_CONTENT_URL . "/plugins/" . plugin_basename(dirname(__FILE__));
			
			echo $args['before_widget'];
			echo $args['before_title'];
			$data = get_option('tweetbox');
			echo $data['tweetbox_title'];
			echo $args['after_title'];
			echo '<script type="text/javascript" src="'.$pluginDirectory.'/tweetbox.js"></script>';
			echo "<script>getTweets('".$data['tweetbox_username']."', ".$data['tweetbox_no_tweets'].", '".$data['tweetbox_dls']."')</script>";
			echo '<div id="tweetboxtweets">Fetching latest tweets...</div>';
			echo $args['after_widget'];
		}
		
		function register()
		{
			register_sidebar_widget( 'tweetbox', array('tweetbox', 'widget'));  
			register_widget_control( 'tweetbox', array('tweetbox', 'control'));
		}
	}
?>
