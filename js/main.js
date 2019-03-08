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
