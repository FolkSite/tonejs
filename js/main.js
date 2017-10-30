var note = new Tone.Sampler({
	'A1' : './sounds/A1.mp3'
}).toMaster();

var seq = new Tone.Sequence({
	function (note) {
		note.triggerAttack();
	}
}, ["C4", "E4", "G4", "A4"]);