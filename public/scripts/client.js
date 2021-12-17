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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function (data) {
    for (let tweet of data) {
      $('#tweets-container').prepend(createTweetElement(tweet));
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
  <div class="avatar">
    <img src="${user.avatars}"> 
    <div >${user.name}</div>
  </div>
    ${user.handle}
  </div>
     <div>${$("<p>").text(content.text).html()}</div>
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

  const loadTweets = function () {
    $('#tweets-container').empty();
    $.ajax({
      url: "/tweets/",
      method: 'GET',
      dataType: 'json', // added data type
      success: function (tweets) {
        console.log(tweets);
        renderTweets(tweets)
      },
      error: (err) => {
        console.log(err)
      }
    });
  }

  //prevents the default form submission behaviour of sending the post request and reloading the page
  $(".formText").submit(function (event) {
    event.preventDefault();

    $('.error-message').slideUp(400).text('')

    let input = $("#tweet-text").val()
    console.log("input:", input)

    if (!input.length) {
      $('.counter').text(140)
      return $('.error-message').text('Please enter a valid tweet').slideDown()
    } else if (input.length > 140) {

      return $('.error-message').text('Your Tweet exceeds the maximum 140 characters').slideDown()
    }

    $.ajax({
      url: "/tweets/",
      method: 'POST',
      type: "application/json",
      //creates a text string in standard URL-encoded notation
      data: $(this).serialize(),
      success: function (data) {
        $("textarea").val("");
        $.get("http://localhost:8080/tweets/", data => {
          const newTweet = [data.slice(-1).pop()];
          renderTweets(newTweet);
        });
        console.log("Success")
      },
      error: (err) => {
        console.log(err)
      }

    })
  })
  loadTweets()
})





