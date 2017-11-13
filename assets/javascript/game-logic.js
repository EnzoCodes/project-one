// variable declaration

// word bank -- randomly select search term from here
var searchTerms = ['puppy','cats','pink flowers','trees and sun'];
// add an indicator to determine if a term was already searched/displayed to the users -- refernce trivia game structure
	// prevents re-display of images
	// true/false asked property
	// create a counter -- if it matches the amount of images we want to show, stop the game


$(document).ready(function () {

	// points accumulated by user
	var p1points = 0;
	var p2points = 0;
	var teamPoints = 0;

	// stores user guesses to be referenced to later and compared
	var p1guesses = [];
	var p2guesses = [];

	var p1p2Matches = [];

// change click event to function on setTimeout -- each round lasts 30 seconds
$('#generate-photo-info').click(function () {
	//create random number generator
		// to select random word from our word bank
		// to select random hit from our ajax call
	function generateRandomNum (min, max) {
		return Math.floor(Math.random() * max) + min;
	}

	// select random search term from word bank
	var selectedTerm = searchTerms[generateRandomNum(0, searchTerms.length)];

	// Pixabay API access
	var key = '6982377-68fe5b4423fc7e3f952f46c15';
	var queryUrl = 'https://pixabay.com/api/?key=' + key + '&q=' + selectedTerm + '&image_type=photo&pretty=true';

	$.ajax({
		url: queryUrl,
		method: 'GET'
	}).done(function (response) {
		// results is a list of the hits we received after running a search on selected search term
		var results = response.hits
		// chosen is the randomly selected element for this ajax call
		var chosen = results[generateRandomNum(0, results.length)];
		// preview image -- need to enlarge image before displaying to users
		var image = $('<img>').attr('src', chosen.previewURL);
		// string of key words -- if users guess any of these words, score bonus points
		var tags = chosen.tags.split(', ');
		// photographer of chosen image
		var photographer = chosen.user;
		// link to photographer's profile page
		var profileLink = $('<a>').attr('target', '_blank')
								  .attr('href', 'https://pixabay.com/en/users/' + photographer)
								  .text('See more work from this photographer');
		// link to presented photo
		var imageLink = $('<a>').attr('target', '_blank')
								.attr('href', chosen.pageURL)
								.text('More about this image');

		// appending selected image and photographer link to body -- testing
		$('body').append(image).append(profileLink).append(imageLink);

		console.log(response);
		console.log(chosen);
		console.log(tags);
		console.log(typeof tags);
		console.log(photographer);
		console.log(profileLink);

		// if guesses includes one of the actual tags associated with the image (from API), grant 2 points.
		// iterate through tags and check to see if they exist in the guesses array
			// refactor this code later for multiplayer feature
		function addBonusPoints () {

			for (var i=0; i < tags.length; i++) {
				// if player one guessed a correct tag, award 2 points
				if (p1guesses.includes(tags[i])) {
					p1points += 2;
				}
				// if player one guessed a correct tag, award 2 points
				if (p2guesses.includes(tags[i])) {
					p2points += 2;
				}
			}

			console.log(p1points);
			console.log(p2points);
		}

		// calculate team points
		function calculateTeamPoints () {
			// if player 1 and player 2 share a similar word in their guesses, grant one point to each
				// calculate difference between the array lengths
				// whichever one has less elements, add placeholders to have same lengths
				// iterate over one array, check to see if a word exists in another
					// if there's a match, push to new array
					// count length of new array and add points to each player
			if (p1guesses.length > p2guesses.length) {
				// placeholder is uppercase to dinstinguish between user guesses
				p2guesses.push('EXTRA');
				console.log(p1guesses);
				console.log(p2guesses);
			}
			else if (p1guesses.length < p2guesses.length) {
				p1guesses.push('EXTRA');
				console.log(p1guesses);
				console.log(p2guesses);
			}

			for (var i=0; i < p2guesses.length; i++) {
				if (p1guesses.includes(p2guesses[i])) {
					p1p2Matches.push(p2guesses[i]);
					console.log(p1guesses[i]);
				}
			}
			teamPoints = p1p2Matches.length;

			p1points += teamPoints;
			p2points += teamPoints;
			console.log(p1p2Matches);
			
		}

		// capture user input and store in array
		$('#p1-submit-btn').click(function (event) {
			// prevent page reload
			event.preventDefault();

			// capture user input
			// convert to lowercase
			var p1guess = $('#p1-guess').val().toLowerCase();
			console.log(p1guess);

			// adds user guess to guesses array if it doesn't already exist
			if (!p1guesses.includes(p1guess)) {
				p1guesses.push(p1guess);
				console.log(p1guesses);
				$('#p1-alert').text('');
			}
			else {
				// alert user that they guessed that word already
				$('#p1-alert').text('You already guessed ' + p1guess);
			}

			// clear input field
			$('#p1-guess').val('');
		})

		$('#p2-submit-btn').click(function (event) {
			// prevent page reload
			event.preventDefault();

			// capture user input
			var p2guess = $('#p2-guess').val().toLowerCase();
			console.log(p2guess);

			// adds user guess to guesses array if it doesn't already exist
			if (!p2guesses.includes(p2guess)) {
				p2guesses.push(p2guess);
				console.log(p2guesses);
				$('#p2-alert').text('');
			}
			else {
				// alert user that they guessed that word already
				$('#p2-alert').text('You already guessed ' + p2guess);
			}

			// clear input field
			$('#p2-guess').val('');
		})

		// displays total points accumulated by user
		$('#show-stats').click(function () {
			calculateTeamPoints();
			addBonusPoints();
		})

	});

	
})

















})