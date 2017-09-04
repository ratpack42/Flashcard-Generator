var inquirer = require("inquirer");

var Basic = require("./basicCard.js");

var fs = require("fs");

var cards = [];

var total = 0;

var numCards;

var obtainCards = function(){
	console.log("Please enter your flashcard text.");
	if (total  < numCards){
		inquirer.prompt([
		{
			name: "flashcard",
			message: "Front: "
		},
		{
			name: "answer",
			message: "Back: "
		}
		]).then(function(answers) {
				var card = new Basic(answers.flashcard, answers.answer);
				cards.push(card);
				total++;
				obtainCards();		
		});
	}
	else {
		console.log(cards);
		for (var i = 0; i < cards.length ; i++){
			fs.appendFile("logFlash.txt",cards[i].front + "+" +cards[i].back + "\n");
		}	
	}
};

//Asks user for how many cards they want to make 
inquirer.prompt([
		{
			name: "amount",
			message: "How many cards do you want to make?"
		}
		]).then(function(answers) {
			numCards = answers.amount;
			obtainCards();
		});