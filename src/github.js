var etab = new ElasticTabstops({
	styleRules: [
		".blob-code { font-family: 'Input Serif Narrow', 'Georgia', serif; font-size: 1.167em; }",
	]
})

function process() {
	etab.processLines(document.querySelectorAll('.js-file-line'))
}

$(document).ready(process).on('pjax:success', process)
