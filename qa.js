var lastqnum = 0;
var allOn = false;
var animateDuration = 100;

/**
 * Adds a new question
 */
function addQ() {
	// create question and answer divs
	$('#qcon').append('<div id="q'+lastqnum+'" class="question"><span class="label">Q:</span> <input name="q'+lastqnum+'" type="text" /> <a href="#">x</a></div>');
	$('#qcon').append('<div id="a'+lastqnum+'" class="answer"><span class="label">A:</span> <span id="x'+lastqnum+'"><a href="#" class="show">&raquo;</a></span><textarea name="a'+lastqnum+'" class="data"></textarea> <span id="x'+lastqnum+'"><a href="#" class="hide">&laquo;</a></span></div>');
	
	// hide the answer box
	$('#a'+lastqnum+' textarea').hide();
	$('#a'+lastqnum+' .hide').hide();
	
	// code for deletion link
	// store current question number using a closure
	$('#q'+lastqnum+' a').click(
		(function(n) {
			return function(e) {
				e.preventDefault();
				// display confirmation box first
				if (confirm("Really delete?")) { removeQ(n); }
			};
		})(lastqnum)
	);
	
	// code for answer show link
	$('#x'+lastqnum+' .show').click(
		(function(n) {
			return function(e) {
				e.preventDefault();
				$('#a'+n+' .show').fadeOut(animateDuration, function() {
					$('#a'+n+' .data').fadeIn(animateDuration);
					$('#a'+n+' .hide').fadeIn(animateDuration);
					// set focus to newly visible text box
					$('#a'+n+' .data').focus();
				});
			};
		})(lastqnum)
	);
	
	// code for answer hide link
	$('#x'+lastqnum+' .hide').click(
		(function(n) {
			return function(e) {
				e.preventDefault();
				$('#a'+n+' .hide').fadeOut(animateDuration);
				$('#a'+n+' .data').fadeOut(animateDuration, function() {
					$('#a'+n+' .show').fadeIn(animateDuration);
				});
			};
		})(lastqnum)
	);
	
	// set focus to the new question's text box
	$('#q'+lastqnum+' input').focus();
	
	// increment question number
	lastqnum = lastqnum + 1;
}

/**
 * Removes a question
 * @param {Integer} num Number of question to remove
 */
function removeQ(num) {
	$('#q'+num).remove();
	$('#a'+num).remove();
}

/**
 * Toggles all answer boxes between visible and hidden state
 */
function toggleAnswers() {
	// need a better system for this; perhaps
	if (allOn) {
		$('.answer .hide').fadeOut(animateDuration);
		$('.answer .data').fadeOut(animateDuration, function() {
			$('.answer .show').fadeIn(animateDuration);
		});
	} else {
		$('.answer .show').fadeOut(animateDuration, function() {
			$('.answer .data').fadeIn(animateDuration);
			$('.answer .hide').fadeIn(animateDuration);
		});
	}
	allOn = !allOn;
}

//
// perform document setup
//
$(document).ready(function(){
	// event for the '+' link
	$('#add a').click(function(e) {
		e.preventDefault();
		addQ();
	});
	
	// event for the title link
	$('h1 a').click(function(e) {
		e.preventDefault();
		toggleAnswers();
	});
	
	// insert the first question
	addQ();
});