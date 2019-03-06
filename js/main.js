$(document).ready(function(){
    const requestURL = './lib/qna.json'; //questions JSON   
    var questionCounter = 0;

    switch(questionCounter){
        case 0:
        getFromJson(requestURL, questionCounter);
        break;
        }

    function getFromJson(requestURL, quesNum){
        $.getJSON(requestURL, function(questionData){
            populateQuestion(questionData, quesNum);
        });
    }

    function populateQuestion(questionData, n){
        let loadingQuestion = questionData.questions[n].question; 
        $('#scoreboard').after(`<p class = "questionClass">${loadingQuestion}</p>`);
        populateOption(questionData, n);
    }

    function populateOption(questionData, n){
        option1 = questionData.questions[n].option1;
        option2 = questionData.questions[n].option2;
        option3 = questionData.questions[n].option3;
        option4 = questionData.questions[n].option4;
        $('.options').append(`<li>${option1}</li>`);
        $('.options').append(`<li>${option2}</li>`);
        $('.options').append(`<li>${option3}</li>`);
        $('.options').append(`<li>${option4}</li>`);
    }
});