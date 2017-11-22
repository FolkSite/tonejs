var piano = new Tone.Sampler({
	'c1' : './sounds/piano/c1.mp3'
}, function () {
	piano.triggerAttackRelease('C4', '4n');
	var arpeggio = new Tone.Sequence(function (time, note) {
		piano.triggerAttackRelease(note, '4n');
	}, ['F1', 'A1', 'C2', 'D2', 'F1', 'D2', 'C2', 'A1'], '4n');
	var bass  = new Tone.Sequence(function (time, note) {
		piano.triggerAttackRelease(note, '2n');
	}, ['F0', '0', '0', 'E0', 'D0', '0', 'F1', 'E1'], '4n');
	Tone.Transport.start();
	arpeggio.start();
	bass.start();
}).toMaster();

var drums = new Tone.Sampler({
	'd1': './sounds/drums/closedhat.mp3',
	'd2': './sounds/drums/cowbell1.mp3',
	'd3': './sounds/drums/cowbell2.mp3',
	'd4': './sounds/drums/crash1.mp3',
	'd5': './sounds/drums/floor.mp3',
	'd6': './sounds/drums/kick.mp3',
	'd7': './sounds/drums/openhat.mp3',
	'd8': './sounds/drums/ridebell.mp3',
	'd9': './sounds/drums/ridecymbal2.mp3',
	'd10': './sounds/drums/rim.mp3',
	'd11': './sounds/drums/shaker1.mp3',
	'd12': './sounds/drums/snare2.mp3',
	'd13': './sounds/drums/tamb.mp3',
	'd14': './sounds/drums/tom.mp3'
}, function () {
	var main = new Tone.Sequence(function (time, note) {
		drums.triggerAttackRelease(note, '5n');
	}, ['d6', 'd1', 'd12', 'd1', 'd6', 'd1', 'd12', ['d1', 'd1']], '4n');
	var second = new Tone.Sequence(function (time, note) {
		drums.triggerAttack(note);
	}, [], '8n');
	Tone.Transport.start();
	main.start();
	second.start();
}).toMaster();

var guitar = new Tone.Sampler({
	'c4': './sounds/guitar/Guitar_C4.mp3'
}, function() {
	var solo = new Tone.Sequence(function (time, note) {
		guitar.triggerAttackRelease(note, '3n');
	}, [['C5', 'E5'], ['D5', ['A4', 'G4']], 'F4', ['C4', 'E4']], '2n');
	// Tone.Transport.start();
	// solo.start();
}).toMaster();


var soloNotes = ['C5', 'E5', 'D5', 'A4', 'G4', 'F4', 'C4', 'E4'];
var factor = 30;

$(document).on('scroll', debounce(soloPlayer, 40));

function soloPlayer(e) {
	var position = $(this).scrollTop();
	var stepSize = $(window).height();
	var steps = soloNotes.length;

	for (var i = 0; i <= steps; i++) {
		if (position > stepSize * (i - 1) && position < stepSize * i) {
			guitar.triggerAttackRelease(soloNotes[i], '3n');
		}
	}
	
	// if (position >= 0 && position < step) {
	// 	console.log(soloNotes[0]);
	// 	guitar.triggerAttackRelease(soloNotes[0], '3n');
	// }
	// if (position >= step && position < step * 2) {
	// 	console.log(soloNotes[1]);
	// 	guitar.triggerAttackRelease(soloNotes[1], '3n');
	// }
	// if (position >= step * 2 && position > step * 3) {
	// 	console.log(soloNotes[2]);
	// 	guitar.triggerAttackRelease(soloNotes[2], '3n');
	// }
}


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this;
        var args = arguments;
      
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}