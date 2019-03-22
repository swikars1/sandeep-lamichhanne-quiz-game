
  var CCOUNT = 15;
    
  var t, count=15;
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

  $('#playEnter').on('click', function(event){
    $('#bat').addClass('bathit');
    $('#ball').addClass('ballhit');
    setTimeout(()=>{
      event.preventDefault();
      $('#playscreen').remove();
    },2000);
  });


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


function cddisplay() {
    // displays time in span
    document.getElementById('time').innerHTML = count;
};

function countdown() {
    // starts countdown
    // countdown = function(){};
    cddisplay();
    if (count == 0) {
        // time is up
    } else {
        count--;
        t = setTimeout(countdown(),  1000);
    }
};

function cdpause() {
    // pauses countdown
    clearTimeout(t);
};

function cdreset() {
    // resets countdown
    cdpause();
    count = CCOUNT;
    cddisplay();
};


  //start
  startQuestions();

  function startQuestions() {
    getFromJson(requestURL, questionCounter);
    $(".sandipScreen").click(() => {
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
    $(".sandipScreen").hide();
    $.getJSON(requestURL, function(questionData) {
      setQuestionOptions(questionData, questionPos);
      
    });
  }

  function setQuestionOptions(questionData, questionPos) {
    $('#answer-box').attr('data-content',`Round: ${questionCounter+1}`);
    $(".options > li")
      .removeClass("correctOpt incorrectOpt")
      .css({"pointer-events":"unset","opacity":"1"});

    setBalls(balls);
    $('#fifty').css({"pointer-events":"unset","opacity":"1"});
    $("#question").text(questionData.questions[questionPos].question);
    $("#opt1").text(questionData.questions[questionPos].option1);
    $("#opt2").text(questionData.questions[questionPos].option2);
    $("#opt3").text(questionData.questions[questionPos].option3);
    $("#opt4").text(questionData.questions[questionPos].option4);
    answer = questionData.questions[questionPos].answer;
    $(".options > li")
      .off("click")
      .on("click", function() {
        cdpause();
        checkAnswer(answer, $(this)[0].id);
      });

    $('#fifty').off("click")
    .on("click", function() {
      $(this).css({"pointer-events":"none","opacity":"0"});
      firstran =  Math.floor(Math.random() * 2) + 1;
      secondran =  Math.floor(Math.random() * 2) + 3;

      if(firstran==answer && firstran==1) firstran = 2;
      if(firstran==answer && firstran==2) firstran = 1;
      if(secondran==answer && secondran==3) secondran = 4;
      if(secondran==answer && secondran==4) secondran = 3;

      console.log(firstran, secondran);
       removeTwo(firstran, secondran);
    });
  }

  function removeTwo(firstran, secondran){
    $(`#opt${firstran},#opt${secondran}`)
      .css('pointer-events','none')
      .animate({'opacity':'0'},500, "linear");
  }

  function checkAnswer(answer, checkId) {
    
    answerId = "opt" + answer;

    $(".sandipScreen").show();

    $(".options > li").css("pointer-events", "none");
    cdpause();
    if (checkId == answerId) {
      score++;
      $("#" + checkId).addClass("correctOpt");
      switch(questionCounter){
        case 0:
          $(".sandipScreen")
            .css('opacity','0')
            .removeClass('sandipbg2 sandipbg3')
            .addClass('sandipbg1')
            .animate({'opacity':'1'},1000,"linear");
        break;
        case 1:
          $(".sandipScreen")
            .css('opacity','0')
            .removeClass('sandipbg1 sandipbg3')
            .addClass('sandipbg2')
            .animate({'opacity':'1'},1000,"linear");
        break;
        case 2:
        $(".sandipScreen")
            .css('opacity','0')
            .removeClass('sandipbg2 sandipbg1')
            .addClass('sandipbg3')
            .animate({'opacity':'1'},1000,"linear");
        break;
        case 3:
          $(".sandipScreen")
            .css('opacity','0')
            .removeClass('sandipbg2 sandipbg3')
            .addClass('sandipbg1')
            .animate({'opacity':'1'},1000,"linear");
        break;
        case 4:
          $(".sandipScreen")
            .css('opacity','0')
            .removeClass('sandipbg1 sandipbg3')
            .addClass('sandipbg2')
            .animate({'opacity':'1'},1000,"linear");
        break;
        case 5:
          $(".sandipScreen")
            .css('opacity','0')
            .removeClass('sandipbg2 sandipbg3')
            .addClass('sandipbg1')
            .animate({'opacity':'1'},1000,"linear");
          break;
      }
      setScore(score);
    } else {
      $("#" + checkId).addClass("incorrectOpt");
      $(".sandipScreen")
            .removeClass('sandipbg1 sandipbg2 sandipbg3')
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
    $('.sandipScreen').fadeOut(800, function(){
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
