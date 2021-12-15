/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const createTweetElement = (tweet) => {
    let $tweet = `
  <article class="tweet-container">
      <header id="tweet-header">
      <div class="profile">
        <div class="name-avatar">
          <img src="${tweet.user.avatars}">
          <h3>${tweet.user.name}</h3>
        </div>
        <div class="user-handle">
          <h3>${tweet.user.handle}</h3>
        </div>
      </div>
        <h3>${tweet.content.text}</h3>
      </header>
      <footer id="tweet-footer">
        <h5>${timeago.format(tweet.created_at)}</h5>
        <p><i class="fas fa-flag"></i>&emsp;<i class="fas fa-retweet"></i>&emsp;<i class="fas fa-heart"></i></p>
      </footer>
    </article>
  `
    return $tweet;
  }

  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $(".tweets-container").prepend($tweet);
    }
  }


  $('.form').submit(function (event) {
    event.preventDefault();
    // console.log('check: ', event);
    let serializedForm = $(this).serialize();
    // console.log(serializedForm)
    const userTweet = $('.form').children('#tweet-text').val();
    if (userTweet.length > 140) {
      return alert('Dont type more than 140 characrters!');
    }
    if (userTweet === '' || userTweet === null) {
      return alert('Tweet cannot be empty!');
    }
    $.ajax('/tweets', { method: 'POST', data: serializedForm })
      .then(function () {
        // console.log('done');
        loadtweets();
      });
    //console.log(serializedForm)

  });

  const loadtweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (response) {
        renderTweets(response);
      })
  }


});