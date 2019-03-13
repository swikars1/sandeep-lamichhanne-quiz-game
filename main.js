$(document).ready(function() {
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
    $(".options > li").removeClass("correctOpt");
    $(".options > li").removeClass("incorrectOpt");
    $(".options > li").css("pointer-events", "unset");
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

    if (checkId == answerId) {
      score++;
      $("#" + checkId).addClass("correctOpt");
      $(".options > li").css("pointer-events", "none");
      setScore(score);
    } else {
      $("#" + checkId).addClass("incorrectOpt");
      $(".options > li").css("pointer-events", "none");
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
      $('#quiz-canvas').append(`<p id='congP'> Your score is: ${score}`);
      $('#balls').hide();
      $('#score').hide();
    });
  }

  $('.any').hide();
  
  $('#button1').click(function(){
   
    $('#quiz-canvas').show();
  });
//TODO:
// model to load question
// model to load options
// answer checker
// slide player
// next button system


});
