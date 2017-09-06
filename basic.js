var inquirer = require("inquirer");

var Basic = require("./basicCard.js");

var fs = require("fs");

var cards = [];

var total = 0;

var numberCards;
//prompts user to create flashcard
var obtainCards = function(){
	console.log("Please enter your flashcard text.");
	if (total  < numberCards){
		inquirer.prompt([
		{
//Enter the question or memonic text when prompted front
			name: "flashcard",
			message: "Front: "
		},
		{
//Enter the answer on the back
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
//Appends text and answer to the log
		console.log(cards);
		for (var i = 0; i < cards.length ; i++){
			fs.appendFile("logFlash.txt",cards[i].front + "," +cards[i].back + "\n", function(err) {
				if (err) throw err;
			});
		}	
	}
};

//Asks user for how many cards they want to make 
inquirer.prompt([
		{
			name: "amount",
			message: "How many flashcards do you need?"
		}
		]).then(function(answers) {
			numberCards = answers.amount;
			obtainCards();
		});