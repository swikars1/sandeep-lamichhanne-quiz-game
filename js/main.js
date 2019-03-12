
$(document).ready(function() {

  const requestURL = "./lib/qna.json"; //questions JSON
  var questionCounter = 0;
  var score = 0;

  startQuestions();
  $('.opt1').click(()=>{

      console.log(this);

  });

  function startQuestions() {
    getFromJson(requestURL, questionCounter);
    $(".buttonNext").click(() => {
      questionCounter++;
      if(questionCounter<6) getFromJson(requestURL, questionCounter);
     });
  }

  function getFromJson(requestURL, questionPos) {
    $.getJSON(requestURL, function(questionData) {
      setQuestionOptions(questionData, questionPos);
    });
  }

  function setQuestionOptions(questionData, questionPos) {
    $("#question").text(questionData.questions[questionPos].question);
    $("#opt1").text(questionData.questions[questionPos].option1);
    $("#opt2").text(questionData.questions[questionPos].option2);
    $("#opt3").text(questionData.questions[questionPos].option3);
    $("#opt4").text(questionData.questions[questionPos].option4);
  }
});

//TODO:
// model to load question
// model to load options
// answer checker
// slide player
// next button system

// initialize and setup facebook js sdk
window.fbAsyncInit = function() {
    FB.init({
      appId      : '315495869163777',
      xfbml      : true,
      version    : 'v2.5'
    });
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        document.getElementById('status').innerHTML = 'We are connected.';
        document.getElementById('login').style.visibility = 'hidden';
      } else if (response.status === 'not_authorized') {
        document.getElementById('status').innerHTML = 'We are not logged in.'
      } else {
        document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
      }
    });
};
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// login with facebook with extra permissions
$('#button').on('click', function login() {
  FB.login(function(response) {
    if (response.status === 'connected') {
        document.getElementById('status').innerHTML = 'We are connected.';
        document.getElementById('login').style.visibility = 'hidden';
      } else if (response.status === 'not_authorized') {
        document.getElementById('status').innerHTML = 'We are not logged in.'
      } else {
        document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
      }
  }, {scope: 'email'});
});

$('#button').on('click',function getInfo() {
FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response) {
  var userId = document.getElementById('status').innerHTML = response.id;
});
});

$("#button").click(function(){
  $('.hidden').hide();
});