var MemoryGame = {};

	//Global vars.
	var cardBackValue = 'blackandwhite';
	var buttons = document.getElementsByClassName('buttons');
	var allCardDivs = document.getElementById('tiles'); 
	var overlay = document.getElementById('overlay');
	var winning = document.getElementById('youWin');
	var backSelector = document.getElementById("cardbackSelector");
	var themeSelector = document.getElementById("themeSelector");
	var themeValue = 'art';

MemoryGame.myArray = [];
MemoryGame.clickCounter = 1;
MemoryGame.guesss = [];
MemoryGame.data = '';
MemoryGame.data2 = '';
MemoryGame.firstItem = '';
MemoryGame.secondItem = '';
var failCounter = 0;

// Card holder Object
MemoryGame.Cards = function (data, div) {
	this.data = data;
	this.div = div;
}

// Difficulty selector && New Game button
MemoryGame.difficulty = function (num){
	MemoryGame.constructCards(num);
	MemoryGame.arrayToJavaScriptArray();
	MemoryGame.appenedShuffledCards();
}

// Creating divs in an ascending order
MemoryGame.constructCards = function (num){
	allCardDivs.innerHTML = '';
	winning.style.display = 'none';
	document.body.style.overflow = "scroll";
	MemoryGame.myArray = [];
	failCounter = 0;
	document.getElementById('failcounter').innerHTML = failCounter;
		console.log(allCardDivs);
			for (var m = 1; m<= num; m++){
				MemoryGame.cardDivs = document.createElement('div');
					MemoryGame.cardDivs.classList.add(cardBackValue , 'card');
					MemoryGame.cardDivs.setAttribute('data-card',m);
					MemoryGame.cardDivs.innerHTML = m;  // Help for the game
					console.log(m);
				MemoryGame.cardDivs2 = document.createElement('div');
					MemoryGame.cardDivs2.classList.add(cardBackValue , 'card');
					MemoryGame.cardDivs2.setAttribute('data-card',m);
					MemoryGame.cardDivs2.innerHTML = m;  // Help for the game
					console.log(m);
					MemoryGame.myArray.push(MemoryGame.cardDivs);
					MemoryGame.myArray.push(MemoryGame.cardDivs2);
			}
			console.log(MemoryGame.myArray);
}


// Shuffle the ordered divs
MemoryGame.arrayToJavaScriptArray = function() {
	MemoryGame.myArray.sort(function(a, b){return 0.5 - Math.random()}); 
}


// Insert shuffled cards into the parent div.
MemoryGame.appenedShuffledCards = function  () {
	for (var i = 0; i<MemoryGame.myArray.length; i++){
		document.getElementById('tiles').appendChild(MemoryGame.myArray[i])
		MemoryGame.myArray[i].addEventListener('click', MemoryGame.userInput);
	}
}


// Changing card backs
MemoryGame.changeBacks = function () {
		MemoryGame.allCards = document.getElementsByClassName('card');
		cardBackValue = backSelector.options[backSelector.selectedIndex].value;
		console.log(cardBackValue);
		for (var i = 0; i < MemoryGame.allCards.length ; i++ ){
			MemoryGame.allCards[i].className = ('card');
			MemoryGame.allCards[i].classList.add(cardBackValue);
		}
	
}


// User clicks.
MemoryGame.pause = false
MemoryGame.userInput = function () {

	// First click
	if (!MemoryGame.pause){
	if (MemoryGame.clickCounter == 1) {		
	    
	    MemoryGame.data = event.target.getAttribute('data-card');
	    MemoryGame.firstItem = event.target;
	    MemoryGame.firstItem.classList.add('transition' , 'flipped');
	    MemoryGame.themeValue = themeSelector.options[themeSelector.selectedIndex].value;
		MemoryGame.firstItem.style.backgroundImage = "url('./img/" + themeValue +"/"+ MemoryGame.data +".jpg')";

		MemoryGame.Card1 = new MemoryGame.Cards (MemoryGame.data,MemoryGame.firstItem); 
	    MemoryGame.guesss.push(MemoryGame.Card1);
	    MemoryGame.clickCounter++ // going for the second click


	
	// Second click
	} else if (MemoryGame.clickCounter == 2) {
		MemoryGame.pause = true;
		MemoryGame.data2 = event.target.getAttribute('data-card');
		MemoryGame.secondItem = event.target;
		MemoryGame.secondItem.classList.add('transition', 'flipped');
	    MemoryGame.themeValue = themeSelector.options[themeSelector.selectedIndex].value;
		MemoryGame.secondItem.style.backgroundImage = "url('./img/" + themeValue +"/"+ MemoryGame.data2 +".jpg')";

		MemoryGame.Card2 = new MemoryGame.Cards(MemoryGame.data2,MemoryGame.secondItem);
		MemoryGame.guesss.push(MemoryGame.Card2);
		setTimeout(MemoryGame.finalCheck, 1500); // Delay before the matching procedure
		}
	}
}
// Final Check whether the cards are same or not
MemoryGame.finalCheck = function () { 
		if ( MemoryGame.guesss[0].data == MemoryGame.guesss[1].data ){
			console.log('nice'); // same data no so same card
				MemoryGame.guesss[0].div.className = 'cardOk';
				MemoryGame.guesss[1].div.className = 'cardOk';
			} else {
				console.log('try again');
				failCounter++;
				MemoryGame.guesss[0].div.style.backgroundImage = "";
				MemoryGame.guesss[1].div.style.backgroundImage = "";
				MemoryGame.guesss[0].div.classList.remove("transition" , "flipped");
				MemoryGame.guesss[1].div.classList.remove("transition" , "flipped");
				}
		MemoryGame.pause = false

		if (document.getElementsByClassName('card').length == 0 ){
			window.scrollTo(0, 0);
			winning.style.display = 'block';
			document.body.style.overflow = "hidden";
		}

	// Reseting values for the next new card selection
		MemoryGame.guesss = [];
		MemoryGame.clickCounter = 1;
		MemoryGame.data = '';
		MemoryGame.data2 = '';
		MemoryGame.firstItem = '';
		MemoryGame.secondItem = '';
			localStorage.setItem('tryouts', failCounter);
			console.log("fail", failCounter)
	document.getElementById('failcounter').innerHTML = failCounter + '';
	}

document.getElementById('again').addEventListener('click',function(){
	document.body.style.overflow = "scroll";
	winning.style.display = 'none';
	MemoryGame.constructCards();})

