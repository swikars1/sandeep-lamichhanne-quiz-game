$(document).ready(function () {
  var userId, user_id, first_name, last_name;
  window.fbAsyncInit = function () {
    FB.init({
      appId: "1287781974708240",
      xfbml: true,
      version: "v2.5"
    });
    FB.getLoginStatus(function (response) {
      if (response.status === "connected") {
        // document.getElementById("status").innerHTML = "We are connected.";
        $("#login").hide();
      } else if (response.status === "not_authorized") {
        // document.getElementById("status").innerHTML = "We are not logged in.";
      } else {
        $("#login").show();
      }
    });
  };
  (function (d, s, id) {
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
  $("#playEnter").on("click", function login() {
    FB.login(
      function (response) {
        if (response.status === "connected") {
          // document.getElementById("status").innerHTML = "We are connected.";
        $("#login").hide();
        } else if (response.status === "not_authorized") {
          // document.getElementById("status").innerHTML = "We are not logged in.";
        } else {
          // document.getElementById("status").innerHTML =
            // "You are not logged into Facebook.";
        }
      }, {
        scope: "email"
      }
    );
  });
  
  completed = 0;
  written = 0;
  manout = 0;
  completed = sessionStorage.getItem("completeId");
  written = sessionStorage.getItem("writtenId");
  manout = sessionStorage.getItem("outId");
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

  if(manout==1){
    $('#playEnter')
    .removeClass('buttonPlay')
    .addClass('mainButton')
    .css({
      "width":"300px",
      "font-weight":"700",
      "font-family":"fusion",
      "font-size":"40px",
      "padding-top":"20px",
      "color":"#223566"
      })
    .contents()[0].nodeValue = "PLAY AGAIN";
    $('#playscreen').append(`<section class="mainButton entrycong">Wicket<br>Out!</section>`);

  }
  if(completed==1 && manout!=1){
    
    $('#playEnter')
      .removeClass('buttonPlay')
      .addClass('mainButton')
      .css({
        "width":"300px",
        "font-weight":"700",
        "font-family":"fusion",
        "font-size":"40px",
        "padding-top":"20px",
        "color":"#223566"
        })
      .contents()[0].nodeValue = "PLAY AGAIN";
      if(written==1){
        console.log("right");
        $('#playscreen').append(`<section class="mainButton entrycong">Congratulation ${sessionStorage.getItem("thefirst_name")}!<br>Your token id is ${sessionStorage.getItem("theid")}.</section>`);
      }
  }


  $('#playEnter').on('click', function (event) {
    $('#bat').addClass('bathit');
    $('#ball').addClass('ballhit');
    setTimeout(() => {
      // event.preventDefault();
      $('#playscreen').hide();
      decre(count);
    }, 2000);
  });

  function writeUserData(userId, first_name, last_name, email, picture) {
    console.log('wrting', userId);
    
    firebase
      .database()
      .ref("players/" + userId)
      .set({
        first_name: first_name,
        last_name: last_name,
        tokenId: userId,
        email: email,
        picture: picture,
      },
        function (error) {
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

  function writeWinnerData(userId, first_name, last_name, email, picture) {
    console.log('wrting', userId);
    
    firebase
      .database()
      .ref("winners/" + userId)
      .set({
        first_name: first_name,
        last_name: last_name,
        tokenId: userId,
        email: email,
        picture: picture,
      },
        function (error) {
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
  var timer = $('#timer')
  var count = 20
  function write(count) {
    timer.text("Time: " + count)

  }
  function decre(count) {
    interval = setInterval(() => {
      if (count >= 0) {
        write(count)
        count--
      } else {
        $(".options > li")
          .css({
            "pointer-events": "none",
          });
        $("#nextball").show();
        $('#fifty').hide();
        // resetcount();
        //TODO:
        //timeup() function
      }
    }, 1000);
  }

  //start
  startQuestions();

  function startQuestions() {
    getFromJson(requestURL, questionCounter);
    $("#playEnter").click(() => {
      getDataOnly(questionCounter);
    });
    $("#nextball").click(() => {

      count = 20;
      clearInterval(interval);
      decre(count);
      $('#fifty').show();
      $(".options > li")
        .css({
          "pointer-events": "unset"
        });
      $("#nextball").hide();
      if (questionCounter < newdata.length - 1) {
        questionCounter++;
        getDataOnly(questionCounter);
        // getFromJson(requestURL, questionCounter);
        balls--;
      } else {
        quizComplete();
      }
    });
  }

  function getFromJson(requestURL, questionPos) {
    $.getJSON(requestURL, function (questionData) {
      newdata = questionData.questions;
      shuffle(newdata); //random questions
      $("#nextball").hide();
      // setQuestionOptions(questionData, questionPos);

    });
  }
  function getDataOnly(questionPos) {
    $('#bat2').removeClass('rotate3');
    $('#ball2').removeClass('playball');

    $("#nextball").hide();
    setQuestionOptions(newdata, questionPos);
  }
  /**
 * Shuffles array in place.

 */
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

  function setQuestionOptions(questionData, questionPos) {
    FB.api("/me", "GET", {
      fields: "first_name,last_name,name,id,email,picture{url}"
    }, function (
      response
    ) {
      writeUserData(response.id, response.first_name, response.last_name, response.email, response.picture.data.url);
      });
      
    $('#answer-box').attr('data-content', `Round: ${questionCounter + 1}`);
    $(".options > li")
      .removeClass("correctOpt incorrectOpt")
      .css({
        "pointer-events": "unset",
        "opacity": "1"
      });
    $('#incor').removeClass('slideleft');
    setBalls(balls);
    $('#fifty').css({
      "pointer-events": "unset",
      "opacity": "1"
    });
    $("#question").text(questionData[questionPos].question);
    $("#opt1").text(questionData[questionPos].option1);
    $("#opt2").text(questionData[questionPos].option2);
    $("#opt3").text(questionData[questionPos].option3);
    $("#opt4").text(questionData[questionPos].option4);
    answer = questionData[questionPos].answer;
    $(".options > li")
      .off("click")
      .on("click", function () {
        // cdpause();
        $('#bat2').addClass('rotate3');
        $('#ball2').addClass('playball');
        answerint = setTimeout(()=>{
          $("#nextball").show();
          $('#fifty').hide();
          
          clearInterval(interval)
        },1000);
        checkAnswer(answer, $(this)[0].id);
      });

    $('#fifty').off("click")
      .on("click", function () {
        $(this).css({
          "pointer-events": "none",
          "opacity": "0"
        });
        firstran = Math.floor(Math.random() * 2) + 1;
        secondran = Math.floor(Math.random() * 2) + 3;

        if (firstran == answer && firstran == 1) firstran = 2;
        if (firstran == answer && firstran == 2) firstran = 1;
        if (secondran == answer && secondran == 3) secondran = 4;
        if (secondran == answer && secondran == 4) secondran = 3;

        removeTwo(firstran, secondran);
      });
  }

  function removeTwo(firstran, secondran) {
    $(`#opt${firstran},#opt${secondran}`)
      .css('pointer-events', 'none')
      .animate({
        'opacity': '0'
      }, 500, "linear");
    $('#fifty').remove();
  }

  function checkAnswer(answer, checkId) {

    answerId = "opt" + answer;

    $(".options > li").css("pointer-events", "none");
    if (checkId == answerId) {
      score++;

      $("#" + checkId).addClass("correctOpt");
      setScore(score);
      sessionStorage.setItem("outId", 0);
    } else {
      $("#" + checkId).addClass("incorrectOpt");
      $('#nextball').remove();
      sessionStorage.setItem("outId", 1);
      setTimeout(()=>location.reload(),885);
    }
  }

  function setScore(score) {
    $("#score").text(`Score: ${score}`);
  }

  function setBalls(balls) {
    $("#balls").text(`Balls Remaining: ${balls}`);
  }

  function quizComplete() {

    $('#answer-box').fadeOut(800);
    $('#nextball').fadeOut(800)          
  
      $('#timer').remove();
      $('#nextball').remove();

      if (score == newdata.length) {
        writtenFlag = 1;
        sessionStorage.setItem("writtenId", writtenFlag);
        FB.api("/me", "GET", {
          fields: "first_name,last_name,name,id,email,picture{url}"
        }, function (
          response
        ) {
          writeWinnerData(response.id, response.first_name, response.last_name, response.email, response.picture.data.url);
          console.log(response);
          sessionStorage.setItem("theid", response.id);
          sessionStorage.setItem("thefirst_name", response.first_name);
          sessionStorage.setItem("thelast_name", response.last_name);
          
          
          });
        // writeWinnerData("swikars1", "swikar", 'sharma');

      }else{
        writtenFlag = 0;
        sessionStorage.setItem("writtenId", writtenFlag);
      }
      completeFlag = 1;
      sessionStorage.setItem("completeId", completeFlag);
      $('#quiz-canvas').append(`<p id="wait">please wait</p>`);

      setTimeout(()=>location.reload(),2000);

      $('#balls').hide();
      $('#score').hide();
  }

});
