var x = document.getElementsByClassName('card');
var myArray = [];

arrayToJavaScriptArray();
shuffleAndAppend();


// Insert shuffled cards back into 'tiles' Div.


// Starting point for variables
var counter = 1;
var guesss = [];
var data = '';
var data2 = '';
var firstItem = '';
var secondItem = '';


function shuffleAndAppend () {
	for (var i = 0; i<myArray.length; i++){
		document.getElementById('tiles').appendChild(myArray[i])
		myArray[i].addEventListener('click', userInput);
	}
}

// Get the ordered divs and insert it to an array for Javascript manipulation.
function arrayToJavaScriptArray () {
	for (var i = 0 ; i < x.length ; i ++) {
		myArray[i] = x[i]	
	}
	myArray.sort(function(a, b){return 0.5 - Math.random()});
}


	// User clicks at a tile.
function userInput(clicked) {
	if (counter == 1) {		// First click, show the image assigned and 'push' the card data number and the whole div item itself to an array.
	    
	    data = clicked.target.getAttribute('data-card');
	    firstItem = clicked.target;
	    clicked.target.classList.add('image');
	    firstItem.style.pointerEvents = 'none';

	    guesss.push(data);
		guesss.push(firstItem);

	    counter++ // going for the second click

	    // Second click, show the image behind and 'push' the card data number and the whole div item itself to an array.
		} else if (counter == 2) {
			
			data2 = clicked.target.getAttribute('data-card');
			secondItem = clicked.target;
			clicked.target.classList.add('image');
			
			guesss.push(data2);
			guesss.push(secondItem);

			pauseClicks(); 
			
			setTimeout(finalCheck, 800); // Delay before the result shown
			
		}
	}
// Final Check whether the cards are same or not
var finalCheck = function () { 
		if ( guesss[0] == guesss[2] ){
			console.log('nice');
				guesss[1].className = 'cardOk';
				guesss[3].className = 'cardOk';
				enableClicks();
			} else {
				console.log('try again');
				guesss[1].className = 'card';
				guesss[3].className = 'card';
				enableClicks();
				}
		// Reseting values for a new round
			guesss = [];
			counter = 1;
		var data = '';
		var data2 = '';
		var firstItem = '';
		var secondItem = '';

	}

// disable mouse clicks on all cards.
var pauseClicks = function () {
	for (var m = 0 ; m< x.length ; m++) {
		var cards = document.getElementsByClassName('card')[m];
		cards.style.pointerEvents = 'none';
	}
}

// enable mouse clicks on all cards.
var enableClicks = function () {
	for (var m = 0 ; m< x.length ; m++) {
		var cards = document.getElementsByClassName('card')[m];
		cards.style.pointerEvents = 'auto';
	}
}
