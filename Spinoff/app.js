$('button').click(function(){
$('.target-letterP').empty();
$('.feedbackP').empty();

// Global variables
let presses = 1;

let sentences = ["We've always defined ourselves by the ability",
"to overcome the impossible. And we count these moments.",
"These moments when we dare to aim higher, to break barriers,",
"to reach for the stars, to make the unknown known.",
"We count these moments as our proudest achievements.",
"But we lost all that. Or perhaps we've just forgotten",
"that we are still pioneers. And we've barely begun.",
"And that our greatest accomplishments cannot be behind us,",
"because our destiny lies above us. -Interstellar"]

let whichSent = 0;
let sentEnd = sentences[whichSent].length;
let targetLet;
let score;
const numberOfWords = 80;
let seconds = 0;
let minutes;
let numberOfMistakes = 0;
let isPlaying = true;
let input;

// Adds sentences to div#sentence
$('.sentenceP').text(sentences[0]);
displayTarget();


// Playing the game
// $(document).ready(function(){
//     alert('Welcome to Type-Faster, Master!\nType through the sentences with speed and accuracy.\n\nTime will start as soon as you click "Ok."')
// })
setInterval(startClock, 1000);
    // Event listeners for shift key up or down, shows upper keyboard
    $(document).keydown(function(e){
        if(event.keyCode==16){
            $('#keyboard-upper-container').show();
            $('#keyboard-lower-container').hide();
            event.preventDefault();
        }
    });
    $(document).keyup(function(e){
        if(event.keyCode==16){
            $('#keyboard-upper-container').hide();
            $('#keyboard-lower-container').show();
            event.preventDefault();
        }
    });

    //Event listeners for keys pressed, highlights each key when pressed
    // Start keypress listener
    $(document).keypress(function(e){
        // Saves pressed key into target variable
        target = e.which;
        input = target;
        // Adds .pressed class to key to highlight
        $('#'+event.keyCode).addClass('pressed');
        // Displays input
        displayInput();
        // Sends target into displayFeedback
        displayFeedback(target);
        // Decides if at end of sentence, if true, load next sentence, if last sentence, initiate gameOver
        if(presses>sentEnd-1){
            whichSent++;
            if(whichSent>sentences.length-1){
                gameOver();
                return;
            }else{
                $('.sentenceP').text(sentences[whichSent]);
                $('.feedbackP').empty('span');
                $('.target-letterP').empty('span');
            }
            sentEnd = sentences[whichSent].length;
            presses=0;
        }
        // Increments presses by 1 for key pressed
        presses++;
        // Displays next target letter
        displayTarget();
    });
    // End keypress listener
    
    // Start keyup listener
    $(document).keyup(function(){
    $('.key').removeClass('pressed');
    }); 
    
    
    // End keyup listener
// Playing the game/

// Keeps track of time
function startClock(){
    seconds++;
}
// Checks for correct key
function correctKey(target){
    if(asciiTarget===target){
        return true;
    }else{
        return false;
    }
}

// Displays feedback
function displayFeedback(){
    if(correctKey(target)){
        $('.feedbackP').css('color', 'green').text('Correct!');
    }else{
        $('.feedbackP').css('color', 'red').text('nope');
        numberOfMistakes++;
    }
};

// Displays target value in div#target-letter
function displayTarget(){
    findTarget();
    if(isPlaying===true){
        $('.targetKey').text("'" + targetLet + "'");
    }
}

// Finds target letter from array sentences
function findTarget(){
    targetLet = sentences[whichSent].substring(presses-1, presses);
    asciiTarget = targetLet.charCodeAt();
}

// 
function displayInput(){
    if(asciiTarget===target){
        $('.target-letterP').append('<span>'+targetLet+'</span>');
    }else{
        $('.target-letterP').append('<span>-</span>');
    }
}
// Game over
function gameOver(){
    isPlaying = false;
    clearInterval(startClock);
    minutes = seconds*0.0166667;
    score = Math.round((numberOfWords/minutes) - (1.25 * numberOfMistakes));
    $('#yellow-block').css('background-color', 'white');
    $('.sentenceP').text('');
    $('.feedbackP').text('');
    $('.target-letter').text('Game Over  ' + 'Score: ' + score);
    $('.feedback').append($('<button class="btn btn-lg btn-primary d-block mx-auto my-1">Try Again</button>'));
    $(document).off('keypress');
    // Reloads to initiate new game
    $('button').click(function(){
        location.reload(true);
    });
}




})