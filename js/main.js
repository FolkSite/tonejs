var piano = new Tone.Sampler({
	'A1' : './sounds/A1.mp3'
}, function () {
	var seq = new Tone.Sequence(function (time, note) {
		piano.triggerAttack(note);
	}, ['C2', 'E2', 'G2', 'A2'], '8n');
	Tone.Transport.start();
	seq.start();
}).toMaster();




