$(document).ready(function() {
  const requestURL = "./lib/qna.json"; //questions JSON
  var questionCounter = 0;
  var questionDatum;

  function getFromJson(requestURL, callback) {
    $.getJSON(requestURL, function(questionData) {
        callback(questionData);
    });
  }

  function populateQuestion(questionData, n) {
    let loadingQuestion = questionData.questions[n].question;
    $("#scoreboard").after(`<p class = "questionClass">${loadingQuestion}</p>`);
    populateOption(questionData, n);
  }
  
  function populateOption(questionData, n) {
    option1 = questionData.questions[n].option1;
    $(".options").append(`<li>${option1}</li>`);
  }
  getFromJson(requestURL, populateQuestion(questionData));
});

//TODO:
// model to load question
// model to load options    
// answer checker
// slide player
// next button system
