$(document).ready(function() {
  $('#congP').hide();
  $('#playAgain').hide();
    // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyCkasK766oZWbGJfGp8JYoXNIMoP03Pyho",
    authDomain: "fb-quiz-app.firebaseapp.com",
    databaseURL: "https://fb-quiz-app.firebaseio.com",
    projectId: "fb-quiz-app",
    storageBucket: "fb-quiz-app.appspot.com",
    messagingSenderId: "1076655506884"
  };
  firebase.initializeApp(firebaseConfig);

  function writeUserData(userId, first_name, last_name) {
    firebase
      .database()
      .ref("winners/" + userId)
      .set(
        {
          first_name: first_name,
          last_name: last_name
        },
        function(error) {
          if (error) {
            // The write failed...
            console.error("write failed");
          } else {
            // Data saved successfully!
            console.log("write done");
          }
        }
      );
  }

  const requestURL = "./lib/qna.json"; //questions JSON
  var questionCounter = 0;
  var score = 0;
  var balls = 6;

  //start
  startQuestions();

  function startQuestions() {
    getFromJson(requestURL, questionCounter);
    $(".nextPos").click(() => {
      if (questionCounter < 5) {
        questionCounter++;
        getFromJson(requestURL, questionCounter);
        balls--;
      }
      else{
        quizComplete();
      }
    });
  }

  function getFromJson(requestURL, questionPos) {
    $(".nextPos").hide();
    $.getJSON(requestURL, function(questionData) {
      setQuestionOptions(questionData, questionPos);
    });
  }

  function setQuestionOptions(questionData, questionPos) {
    $(".options > li")
      .removeClass("correctOpt incorrectOpt")
      .css("pointer-events", "unset");

    setBalls(balls);

    $("#question").text(questionData.questions[questionPos].question);
    $("#opt1").text(questionData.questions[questionPos].option1);
    $("#opt2").text(questionData.questions[questionPos].option2);
    $("#opt3").text(questionData.questions[questionPos].option3);
    $("#opt4").text(questionData.questions[questionPos].option4);
    answer = questionData.questions[questionPos].answer;
    $(".options > li")
      .off("click")
      .on("click", function() {
        checkAnswer(answer, $(this)[0].id);
      });
  }

  function checkAnswer(answer, checkId) {
    
    answerId = "opt" + answer;
    $(".nextPos").show();

    $(".options > li").css("pointer-events", "none");
    if (checkId == answerId) {
      score++;
      $("#" + checkId).addClass("correctOpt");
      setScore(score);
    } else {
      $("#" + checkId).addClass("incorrectOpt");
    }
  }

  function setScore(score) {
    $("#score").text(`Score: ${score}`);
  }
  function setBalls(balls) {
    $("#balls").text(`Balls Remaining: ${balls}`);
  }
  function quizComplete(){
    $('#answer-box').fadeOut(800);
    $('.nextPos').fadeOut(800, function(){
      $('#congP').text(`Your score is: ${score}`);

      if (score==6) {
        writeUserData("fireid2", "swiakr", "SHARMNA"); //writing to firebase
      }

      $('#playAgain').text(`Try Again`);
      $('#playAgain').click(function(){
        location.reload();
        console.log("restarted");
        
      });
      console.log(score);
      
      $('#balls').hide();
      $('#score').hide();
    });
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
    appId: "315495869163777",
    xfbml: true,
    version: "v2.5"
  });
  FB.getLoginStatus(function(response) {
    if (response.status === "connected") {
      document.getElementById("status").innerHTML = "We are connected.";
      document.getElementById("login").style.visibility = "hidden";
    } else if (response.status === "not_authorized") {
      document.getElementById("status").innerHTML = "We are not logged in.";
    } else {
      document.getElementById("status").innerHTML =
        "You are not logged into Facebook.";
    }
  });
};
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");


// login with facebook with extra permissions
$("#button").on("click", function login() {
  FB.login(
    function(response) {
      if (response.status === "connected") {
        document.getElementById("status").innerHTML = "We are connected.";
        document.getElementById("login").style.visibility = "hidden";
      } else if (response.status === "not_authorized") {
        document.getElementById("status").innerHTML = "We are not logged in.";
      } else {
        document.getElementById("status").innerHTML =
          "You are not logged into Facebook.";
      }
    },
    { scope: "email, user_friends" }
  );
});

$("#button").on("click", function getInfo() {
  FB.api("/me", "GET", { fields: "first_name,last_name,name,id" }, function(
    response
  ) {
    var userId = (document.getElementById("status").innerHTML = response.id);
  });
});


// FB.api('/me/invitable_friends', function(response) {
//   var result_holder = document.getElementById('result_friends');
//   var friend_data = response.data.sort(sortMethod);

//   var results = '';
//   for (var i = 0; i < friend_data.length; i++) {
//       results += '<div><img src="https://graph.facebook.com/' + friend_data[i].id + '/picture">' + friend_data[i].name + '</div>';
//   }

//   // and display them at our holder element
//   result_holder.innerHTML = '<h2>Result list of your friends:</h2>' + results;
// });

$("#button").click(function() {
  $(".hidden").hide();
});
