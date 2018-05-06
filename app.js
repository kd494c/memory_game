
//* Create a list that holds all of your cards
  var card_list = [
    "fa fa-diamond",
    "fa fa-paper-plane-o",
    "fa fa-anchor",
    "fa fa-bolt",
    "fa fa-cube",
    "fa fa-anchor",
    "fa fa-leaf",
    "fa fa-bicycle",
    "fa fa-diamond",
    "fa fa-bomb",
    "fa fa-leaf",
    "fa fa-bomb",
    "fa fa-bolt",
    "fa fa-bicycle",
    "fa fa-paper-plane-o",
    "fa fa-cube"
  ];
var moves = 0;
var counter = document.querySelector(".moves");
var stars = document.querySelectorAll(".fa-star");
var match = 0;
var firstClick = true;
var cards=document.getElementsByClassName('card');
var modal=document.getElementsByClassName('modal')[0];
var deck=document.getElementsByClassName('deck')[0];
var matchedCard = document.getElementsByClassName("match");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
/*function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}*/
//Shuffle function from http://stackoverflow.com/a/2450976 (modified)
function shuffle() {
    var length = deck.children.length
    for (var i = 0; i < length; i++) {
        var index = Math.floor(Math.random() * length)
        deck.appendChild(deck.children[index])
    }
}

shuffle();


 // function OpenCard(card_ref){
 //     //you are defining the opencards function two times
 //  }
for (var i=0; i<cards.length; i++){
  cards[i].onclick=function(){
    OpenCard(this);
  }
}

var timer = 0;
var openedCards = [];
function OpenCard(card_ref){
    card_ref.classList.add("open","show");
    openedCards.push(card_ref);
    if (firstClick){ 
        timer = setInterval(countTimer, 1000);
        firstClick = false;
    }
    if (openedCards.length === 2){ 
            moveCounter();                          
        if (openedCards[0].type === openedCards[1].type){
            matched();
        } else{
            unmatch();
        }
    }
}
//disable the opened matched cards
function disableCLick() {
  for(var i = 0; i < matchedCard.length; i++){
        matchedCard[i].classList.add("disabled");
    }
}
// Adding classes to the matched cards
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards = [];//empty openCard that is right.
    checkWin();   
    
}
function unmatch(){
    // openedCards[0].classList.add("");// Not sure which class to add here
    // openedCards[1].classList.add("");// Not sure which class to add here
    // openedCards = [];
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "match", "disabled");
        openedCards[1].classList.remove("show", "open", "match", "disabled");
        openedCards = [];
    },900);
}

function moveCounter(){    
    moves++;    
    counter.innerHTML = moves;
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
}   
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

function checkWin(){
    match++;
    console.log(match);
    if(match === 8){
        Winner();
    }
}

// The timer function
var totalSeconds = 0;
function countTimer() {
   ++totalSeconds;
   var hour = Math.floor(totalSeconds /3600);
   var minute = Math.floor((totalSeconds - hour*3600)/60);
   var seconds = totalSeconds - (hour*3600 + minute*60);

   document.getElementById("timer").innerHTML = hour + ":" + minute + ":" + seconds;
}

//Showing the model
function Winner(){
    var time = document.querySelector(".time");
    clearInterval(timer);
    finalTime = time.innerHTML;

    modal.classList.add("show");


var starRating = document.querySelector(".stars").innerHTML;

//showing move, rating, time on modal 
    document.getElementById("finalMove").innerHTML = moves; 
    document.getElementById("starRating").innerHTML = starRating; 
    document.getElementById("totaltime").innerHTML = finalTime;
   
}
//Closing the model
function closemodal(){
    modal.classList.remove("show");
}

// reset the game
function reset(){
    // reset the timer
    totalSeconds = 0;
    document.getElementById("timer").innerHTML = 0 + ":" + 0 + ":" + 0;
    clearInterval(timer);
    firstClick = true;
    for (var i=0; i<cards.length; i++){
        cards[i].classList.remove("open", "show", "match", "disabled");
        
    }

    // reset moves
    moves = 0;
    counter.innerHTML = moves;

    // reset star ratings
    for( i= 0; i < 3; i++){
        stars[i].style.visibility = "visible";
    }
    // reset the match variable
    match = 0;
    //shuffle the deck
    shuffle();
}
function playAgain(){
    modal.classList.remove("show");
    reset();
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
