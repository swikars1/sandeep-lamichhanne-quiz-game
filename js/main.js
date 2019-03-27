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
  
  $("#playEnter").on("click", function getInfo() {
    FB.api("/me", "GET", {
      fields: "first_name,last_name,name,id"
    }, function (
      response
    ) {
        user_id = response.id;
        first_name = response.first_name;
        last_name = response.last_name;
      });
      
  });

  completed = 0;
  written = 0;
  completed = sessionStorage.getItem("completeId");
  written = sessionStorage.getItem("writtenId");
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

  if(completed==1){
    
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
        $('#playscreen').append(`<section class="mainButton entrycong">Congratulation ${first_name}!<br>Your token id is token-${userId}.</section>`);
      }
  }


  $('#playEnter').on('click', function (event) {
    $('#bat').addClass('bathit');
    $('#ball').addClass('ballhit');
    setTimeout(() => {
      // event.preventDefault();
      $('#playscreen').hide();
      decre(count);
      // var count = 2;
      // var interval = setInterval(function(){
      //   document.getElementById('playEnter').innerHTML=count;
      //   count--;
      //   if (count === 0){
      //     clearInterval(interval);
      //     document.getElementById('playEnter').innerHTML='Done';
      //     // or...
      //     alert("You're out of time!");
      //   }
      // }, 1000);
    }, 2000);
  });


  function writeUserData(userId, first_name, last_name) {
    firebase
      .database()
      .ref("winners/" + userId)
      .set({
        first_name: first_name,
        last_name: last_name,
        tokenId: "token-" + userId
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


  /*function countdown() {a
      // starts countdown
      // countdown = function(){};
      cddisplay();
      if (count == 0) {
          // time is up
      } else {
          count--;
          t = setTimeout(countdown(),  1000);
      }
  };*/


  /*function cdpause() {
      // pauses countdown
      clearTimeout(t);
  };*/

  /*function cdreset() {
      // resets countdown
      cdpause();
      count = CCOUNT;
      cddisplay();
  };*/


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
        quizComplete(user_id, first_name, last_name);
      }
    });
  }

  function getFromJson(requestURL, questionPos) {
    $.getJSON(requestURL, function (questionData) {
      newdata = questionData.questions;
      shuffle(newdata);
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

  function quizComplete(user_id, first_name, last_name) {

    $('#answer-box').fadeOut(800);
    $('#nextball').fadeOut(800)          
  
      $('#timer').remove();
      $('#nextball').remove();
      console.log(user_id);
      if (score == newdata.length) {
        writtenFlag = 1;
        sessionStorage.setItem("writtenId", writtenFlag);
        writeUserData(user_id, first_name, last_name);
        // writeUserData("swikars1", "swikar", 'sharma');

      }else{
        writtenFlag = 0;
        sessionStorage.setItem("writtenId", writtenFlag);
      }
      completeFlag = 1;
      sessionStorage.setItem("completeId", completeFlag);
      location.reload();

        
    //   playoncemore = `<div id="playscreen">
    //   <img class="topleftlogo" src="images/tata.png" alt="">
    //   <img class="toprightlogo" src="images/tata150.png" alt="">
    //   <img class="middlelogo" src="images/vs.png" alt="">
    //   <div id="foot">
    //     <img id="sipradi" src="images/sipradi.png" alt="">
    //   </div>

    //   <div id="playEnter" class="playPos buttonNext buttonPlay">
    //     <img id="playhelmet" src="images/helmet.png" alt="a cricket  helmet">
    //     <div id="batball">
    //       <img id='bat' src='images/bat.png'>
    //       <img id='ball' src='images/ball.png'>
    //     </div>
    //   </div>
    // </div>`

    //   $('#root').append(playoncemore);
      $('#playAgain').click(function () {
        location.reload();
        console.log("restarted");

      });
      console.log(score);

      $('#balls').hide();
      $('#score').hide();
  }

});

//TODO:
// model to load question
// model to load options
// answer checker
// slide player
// next button system


$("#button").click(function () {
  $(".hidden").hide();
});