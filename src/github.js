var etab = new ElasticTabstops({
	styleRules: [
		".blob-code { font-family: 'Input Serif Narrow', 'Georgia', serif; font-size: 1.167em; }",
		".highlight .pl-kos { color: #bbb; font-weight: lighter; }",
		".highlight span.tab-char + .open.pl-kos { position: absolute; transform: translateX(-100%); }",
	]
})

function process() {
	var openPuncs = /^["'([{“‘]+$/
	var puncs = document.querySelectorAll('.highlight .pl-kos')
	for (var i = 0; i < puncs.length; i++) {
		if (openPuncs.test(puncs[i].textContent)) puncs[i].classList.add('open')
	}

	var blobs = document.querySelectorAll('.blob-wrapper > table')
	for (var i = 0; i < blobs.length; i++) {
		var lines = blobs[i].querySelectorAll('.blob-code')
		etab.processLines(lines)
	}
}

window.addEventListener('pageshow', process)
