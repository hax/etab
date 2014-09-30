var etab = new ElasticTabstops({
	styleRules: [
		".blob-code { font-family: 'Input Serif Narrow', 'Georgia', serif; font-size: 1.167em; }",
	]
})
etab.processLines(document.querySelectorAll('.js-file-line'))
