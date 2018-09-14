/*jslint devel: true */
"strict mode";
"use strict";
var s = 1;
var win = 0;

//old regex = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[a-zA-Z2-3]$/;

//new regex from http://emailregex.com/
var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//field buttons
var f0 = document.getElementById("field0");
var f1 = document.getElementById("field1");
var f2 = document.getElementById("field2");
var f3 = document.getElementById("field3");
var f4 = document.getElementById("field4");
var f5 = document.getElementById("field5");
var f6 = document.getElementById("field6");
var f7 = document.getElementById("field7");
var f8 = document.getElementById("field8");

//mailfield
var mail1 = document.getElementById("email1");
var mail2 = document.getElementById("email2");
var mail3 = document.getElementById("email3");


//start button
var startbutton = document.getElementById("startbutton");

//reset button
var resetbutton = document.getElementById("resetbutton");

//game message
var gamemessage = document.getElementById("gamemessage");

//mail error
var errormail1 = document.getElementById('mailerror1');
var errormail2 = document.getElementById('mailerror2');
var errormail3 = document.getElementById('mailerror3');

//radio buttons
var pvprdbtn = document.getElementById('PvP');
var pvcrdbtn = document.getElementById('PvC');


function enableBoard() {
    //enables to click on board
    //it enables the buttons to change color
    f0.disabled = false;
    f1.disabled = false;
    f2.disabled = false;
    f3.disabled = false;
    f4.disabled = false;
    f5.disabled = false;
    f6.disabled = false;
    f7.disabled = false;
    f8.disabled = false;
}
function disableBoard() {
    //game wont start unless "start button" is clicked
    //it disables the buttons to change color
    f0.disabled = true;
    f1.disabled = true;
    f2.disabled = true;
    f3.disabled = true;
    f4.disabled = true;
    f5.disabled = true;
    f6.disabled = true;
    f7.disabled = true;
    f8.disabled = true;
}

function gametype() {
    pvprdbtn.checked = true;
    if (pvprdbtn.checked) {
        mail1.disabled = false;
        mail2.disabled = false;
        mail3.disabled = true;
    } else {
        mail1.disabled = true;
        mail2.disabled = true;
        mail3.disabled = false;
    }
}
function init() {
    disableBoard();
    resetbutton.disabled = true;
    gamemessage.style.color = "black";
    gamemessage.innerHTML = 'Please write your E-Mails and click the start button to begin.';
}

function emailValid() {
    //mail textbox value
    var mailvalue1 = mail1.value;
    var mailvalue2 = mail2.value;
    var mailvalue3 = mail3.value;
    
    if (inputPvP.checked == true) {
        
        errormail3.innerHTML = "";
        
        
        //if: regex.test(mailvalue1) is false = "no email"
        //else if: mailvalue1 is empty = "empty field"
        //both else means: regex.test(mailvalue1)/regex.test(mailvalue2) is true = "email valid"
        if (!regex.test(mailvalue1)) {
            //there is no email
            errormail1.innerHTML = 'E-Mail invalid: no such E-Mail.';
            gamemessage.style.color = "red";
            startbutton.disabled = false;
            
            //player cannot click reset nor start while playing
            disableBoard();
        } else if (mailvalue1 === null) {
            errormail1.innerHTML = 'E-Mail invalid: empty field.';
        } else {
            errormail1.style.color = "black";
            errormail1.innerHTML = 'E-Mail valid.';
        }
        
        //if: regex.test(mailvalue2) is false = "no email"
        //else if: mailvalue2 is empty = "empty field"
        if (!regex.test(mailvalue2)) {
            //there is no email
            errormail2.innerHTML = 'E-Mail invalid: no such E-Mail.';
            gamemessage.style.color = "red";
            startbutton.disabled = false;
            
            //player cannot click reset nor start while playing
            disableBoard();
        } else if (mailvalue2 === null) {
            errormail2.innerHTML = 'E-Mail invalid: empty.';
        } else {
            errormail2.style.color = "black";
            errormail2.innerHTML = 'E-Mail valid.';
        }
        
        //third if: mailvalue1 and mailvalue2 has the same value = "same email"
        if (mailvalue1 === mailvalue2) {
            errormail1.innerHTML = 'E-Mail invalid: same E-Mail.';
            errormail2.innerHTML = 'E-Mail invalid: same E-Mail.';
            gamemessage.style.color = "red";
            startbutton.disabled = false;
            
            //player cant click reset nor start while playing
            disableBoard();
        }
        
        //fourth if: both regex.tests are true = game start
        if (regex.test(mailvalue1) && regex.test(mailvalue2)) {
            gamemessage.style.color = "black";
            gamemessage.innerHTML = 'The game has started.';
            enableBoard();
            startbutton.disabled = true;
        }
        
        
    } else if (inputPvC.checked === true) {
        
        errormail1.innerHTML = "";
        errormail2.innerHTML = "";
        
        //if: regex.test(mailvalue3) is false = "no email"
        //else if: mailvalue3 is empty = "empty field"
        //else means: regex.test(mailvalue3) is true = "email valid"
        if (!regex.test(mailvalue3)) {
            //there is no email
            errormail3.innerHTML = 'E-Mail invalid: no such E-Mail.';
            gamemessage.style.color = "red";
            startbutton.disabled = false;
            
            //player cannot click reset nor start while playing
            disableBoard();
        } else if (mailvalue3 === null) {
            errormail3.innerHTML = 'E-Mail invalid: empty field.';
        } else {
            errormail3.style.color = "black";
            errormail3.innerHTML = 'E-Mail valid but game sadly not yet available.';
            gamemessage.style.color = "red";
            gamemessage.innerHTML = "Please choose a different game mode(game not yet available).";
            startbutton.disabled = false;
            //player cannot click reset nor start while playing
            disableBoard();
        }
    }
}
function start() {
    resetbutton.disabled = true;
    emailValid();
    document.getElementById('email1').readonly = true;
    
}
function reset() {
    gamemessage.style.color = "black";
	gamemessage.innerHTML = 'Game reset. Please click Start.';
    startbutton.disabled = false;
    resetbutton.disabled = true;
    //makes every field white(no color)
	f0.className = 'GameButton';
	f1.className = 'GameButton';
	f2.className = 'GameButton';
	f3.className = 'GameButton';
	f4.className = 'GameButton';
	f5.className = 'GameButton';
	f6.className = 'GameButton';
	f7.className = 'GameButton';
	f8.className = 'GameButton';
}


function checkRowsRed() {
    //first if parenthesis: first row all red = player 1 wins
    //second if parenthesis: second row all red = player 1 wins
    //third if parenthesis: third row all red = player 1 wins
    //else if board is full without a player winning: tie
    if ((f0.className === 'GameButtonRed' && f1.className === 'GameButtonRed' && f2.className === 'GameButtonRed') || (f3.className === 'GameButtonRed' && f4.className === 'GameButtonRed' && f5.className === 'GameButtonRed') || (f6.className === 'GameButtonRed' && f7.className === 'GameButtonRed' && f8.className === 'GameButtonRed')) {
        gamemessage.style.color = "red";
        gamemessage.innerHTML = 'Red player has won!';
        disableBoard();
        resetbutton.disabled = false;
        startbutton.disabled = true;
        win = 1;
    }
}
function checkColumnsRed() {
    //first if: first column all red = player 1 wins
    //second if: second column all red = player 1 wins
    //third if: third column all red = player 1 wins
    //else if board is full without a player winning: tie
    if ((f0.className === 'GameButtonRed' && f3.className === 'GameButtonRed' && f6.className === 'GameButtonRed') || (f1.className === 'GameButtonRed' && f4.className === 'GameButtonRed' && f7.className === 'GameButtonRed') || (f2.className === 'GameButtonRed' && f5.className === 'GameButtonRed' && f8.className === 'GameButtonRed')) {
        gamemessage.style.color = "red";
        gamemessage.innerHTML = 'Red player has won!';
        s = 1;
        disableBoard();
        resetbutton.disabled = false;
        startbutton.disabled = true;
        win = 1;
    }
}
function checkDiagonalsRed() {
    //first if: first diagonal all red = player 1 wins
    //second if: second diagonal all red = player 1 wins
    //else if board is full without a player winning: tie
    if ((f0.className === 'GameButtonRed' && f4.className === 'GameButtonRed' && f8.className === 'GameButtonRed') || (f2.className === 'GameButtonRed' && f4.className === 'GameButtonRed' && f6.className === 'GameButtonRed')) {
        gamemessage.style.color = "red";
        gamemessage.innerHTML = 'Red player has won!';
        s = 1;
        disableBoard();
        resetbutton.disabled = false;
        startbutton.disabled = true;
        win = 1;
    }
}
function checkAllRed() {
    checkRowsRed();
    checkColumnsRed();
    checkDiagonalsRed();
}



function checkRowsGreen() {
    //first if: first row all green = player 1 wins
    //second if: second row all green = player 1 wins
    //third if: third row all green = player 1 wins
    //else if board is full without a player winning: tie
    if ((f0.className === 'GameButtonGreen' && f1.className === 'GameButtonGreen' && f2.className === 'GameButtonGreen') || (f3.className === 'GameButtonGreen' && f4.className === 'GameButtonGreen' && f5.className === 'GameButtonGreen') || (f6.className === 'GameButtonGreen' && f7.className === 'GameButtonGreen' && f8.className === 'GameButtonGreen')) {
        gamemessage.style.color = "green";
        gamemessage.innerHTML = 'Green player has won!';
        disableBoard();
        resetbutton.disabled = false;
        startbutton.disabled = true;
        win = 1;
    }
}
function checkColumnsGreen() {
    //first if: first column all green = player 1 wins
    //second if: second column all green = player 1 wins
    //third if: third column all green = player 1 wins
    //else if board is full without a player winning: tie
    if ((f0.className === 'GameButtonGreen' && f3.className === 'GameButtonGreen' && f6.className === 'GameButtonGreen') || (f1.className === 'GameButtonGreen' && f4.className === 'GameButtonGreen' && f7.className === 'GameButtonGreen') || (f2.className === 'GameButtonGreen' && f5.className === 'GameButtonGreen' && f8.className === 'GameButtonGreen')) {
        gamemessage.style.color = "green";
        gamemessage.innerHTML = 'Green player has won!';
        disableBoard();
        resetbutton.disabled = false;
        startbutton.disabled = true;
        win = 1;
    }
}
function checkDiagonalsGreen() {
    //first if: first diagonal all green = player 1 wins
    //second if: second diagonal all green = player 1 wins
    //else if board is full without a player winning: tie
    if ((f0.className === 'GameButtonGreen' && f4.className === 'GameButtonGreen' && f8.className === 'GameButtonGreen') || (f2.className === 'GameButtonGreen' && f4.className === 'GameButtonGreen' && f6.className === 'GameButtonGreen')) {
        gamemessage.style.color = "green";
        gamemessage.innerHTML = 'Green player has won!';
        disableBoard();
        resetbutton.disabled = false;
        startbutton.disabled = true;
        win = 1;
    }
}
function checkAllGreen() {
    checkRowsGreen();
    checkColumnsGreen();
    checkDiagonalsGreen();
}

function checkTie() {
    if ((f0.className !== 'GameButton' && f1.className !== 'GameButton' && f2.className !== 'GameButton' && f3.className !== 'GameButton' && f4.className !== 'GameButton' && f5.className !== 'GameButton' && f6.className !== 'GameButton' && f7.className !== 'GameButton' && f8.className !== 'GameButton') && (win === 0)) {
        gamemessage.style.color = "black";
        gamemessage.innerHTML = 'No player won. Please click reset.';
        resetbutton.disabled = false;
        startbutton.disabled = true;
        tie = 1;
        console.log('Tie');
    }
}

function colorchange(button) {
    var fieldclick = document.getElementById(button);
    if (s === 1) {
        console.log('Button turns red');
        //changes the button color to red
        fieldclick.className = 'GameButtonRed';
        s = 0;
        if (fieldclick.className !== 'GameButton') {
            //once the field has a color it can no longer be changed to a different one
            fieldclick.disabled = true;
            console.log('Button no longer changeable');
            
            checkAllRed();
        }
    } else if (s === 0) {
        console.log('Button turns green');
        //changes the button color to green
        fieldclick.className = 'GameButtonGreen';
        s = 1;
        
        if (fieldclick !== 'GameButton') {
            //once the field has a color it can no longer be changed to a different one
            fieldclick.disabled = true;
            console.log("Button can't be changed if color(red/green)");
            
            checkAllGreen();
        }
    }
}
