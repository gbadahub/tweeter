/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function () {
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(data) {
  for (let tweet of data) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};

const createTweetElement = function (tweet) {
  const time = timeago.format(tweet.created_at);
  console.log(time)
  // destructing object 
  const { user, content, created_at } = tweet
  let $tweet =
    $(` <article class="article">
<header class="tweetHeader">
  
  <div class="tweetTitle">
    <img src="${user.avatars}"> 
    <div class="userName">${user.name}</div>
    ${user.handle}
  </div>
     <div>${content.text}</div>  
</header>

  <footer class="tweetFooter">
    <div>
    ${time}

    </div>
    
    <div class="icons">
      <i class="fas fa-flag" style="font-size:15px"></i>
      <i class="fas fa-retweet" style="font-size:15px"></i>
      <i class="fas fa-heart" style="font-size:15px"></i>
    </div>
    
  </footer>
</article>`)
  // need to return variable 
  return $tweet
}
  renderTweets(data);
})


