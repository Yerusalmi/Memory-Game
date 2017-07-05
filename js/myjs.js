var buttons = document.getElementsByClassName('buttons');
var allCardDivs = document.getElementById('tiles'); 
var overlay = document.getElementById('overlay');
var winning = document.getElementById('youWin');

var myArray = [];
var clickCounter = 1;
var guesss = [];
var data = '';
var data2 = '';
var firstItem = '';
var secondItem = '';
var failCounter = 0;

// Card holder Object
function Cards (data, div) {
	this.data = data;
	this.div = div;
}

// Difficulty selector && New Game button
function difficulty(num){
	constructCards(num);
	arrayToJavaScriptArray();
	appenedShuffledCards();
}

// Creating divs in an ascending order
function constructCards(num){
	allCardDivs.innerHTML = '';
	winning.style.display = 'none';
	myArray = [];
	failCounter = 0;
	document.getElementById('failcounter').innerHTML = failCounter;
		console.log(allCardDivs);
			for (var m = 1; m<= num; m++){
				var cardDivs = document.createElement('div');
					cardDivs.className = 'card';
					cardDivs.setAttribute('data-card',m);
					cardDivs.innerHTML = m;
					console.log(m);
				var cardDivs2 = document.createElement('div');
					cardDivs2.className = 'card';
					cardDivs2.setAttribute('data-card',m);
					cardDivs2.innerHTML = m;
					console.log(m);
					myArray.push(cardDivs);
					myArray.push(cardDivs2);
			}
			console.log(myArray);
}


// Shuffle the ordered divs
function arrayToJavaScriptArray () {
	myArray.sort(function(a, b){return 0.5 - Math.random()}); 
}


// Insert shuffled cards into the parent div.
function appenedShuffledCards () {
	for (var i = 0; i<myArray.length; i++){
		document.getElementById('tiles').appendChild(myArray[i])
		myArray[i].addEventListener('click', userInput);
	}
}




// User clicks.
function userInput() {

	// First click
	if (clickCounter == 1) {		
	    
	    data = event.target.getAttribute('data-card');
	    firstItem = event.target;
	    firstItem.style.pointerEvents = 'none';
		firstItem.classList.add('transition');
		firstItem.classList.add('image');
	var Card1 = new Cards (data,firstItem); 
	    guesss.push(Card1);
	    	clickCounter++ // going for the second click
	
	// Second click
	} else if (clickCounter == 2) {
			
		data2 = event.target.getAttribute('data-card');
		secondItem = event.target;
		secondItem.classList.add('transition');
		secondItem.classList.add('image');
		secondItem.style.pointerEvents = 'none';
	var Card2 = new Cards(data2,secondItem);
		guesss.push(Card2);
		console.log(guesss);
		overlay.style.display = 'block';


			
		setTimeout(finalCheck, 1500); // Delay before the matching procedure
			
		}
	}

// Final Check whether the cards are same or not
function finalCheck() { 
		if ( guesss[0].data == guesss[1].data ){
			console.log('nice'); // same data no so same card
				guesss[0].div.className = 'cardOk';
				guesss[0].div.classList.add('transition'); // to keep it rotated 180 deg.
				guesss[1].div.className = 'cardOk';
				guesss[1].div.classList.add('transition'); // to keep it rotated 180 deg.
			} else {
				console.log('try again');
				failCounter++;
				guesss[0].div.className = 'card';
				guesss[1].div.className = 'card';
				guesss[0].div.style.pointerEvents = 'auto';
				guesss[1].div.style.pointerEvents = 'auto';
				}
			
			overlay.style.display = 'none';

		if (document.getElementsByClassName('card').length == 0 ){
			winning.style.display = 'block';
		}

	// Reseting values for the next new card selection
		guesss = [];
		clickCounter = 1;
	var data = '';
	var data2 = '';
	var firstItem = '';
	var secondItem = '';
	console.log(failCounter);
	localStorage.setItem('tryouts', failCounter);
	document.getElementById('failcounter').innerHTML = failCounter;
	}
