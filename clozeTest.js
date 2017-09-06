var inquirer = require('inquirer');

//Type the cloze word which will be missing from the sentence.
inquirer.prompt([
	{
		name: 'cloze',
		message: 'What is your cloze word?'
	},
	{
//Write the complete sentence that will involve the cloze word
		name: 'answer',
		message: 'What is your answer?'
	}
]).then(function(answers) {
	var regEx = new RegExp(answers.cloze, 'g');

	var blank = answers.cloze.split('').map(function(letter) {
		return letter = '_';
	}).join('');
//Below code replaces the cloze word while providing the complete sentence with the necessary space
	var answer = answers.answer.replace(regEx, blank);
	console.log(answer);
});