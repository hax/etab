var etab = new ElasticTabstops({
	styleRules: [
		".blob-code { font-family: 'Input Serif Narrow', 'Georgia', serif; font-size: 1.167em; }",
		".highlight .p { color: #bbb; font-weight: lighter; }",
		".highlight span.tab-char + .open.p { position: absolute; transform: translateX(-100%); }",
	]
})

function process() {
	var openPuncs = /^["'([{“‘]+$/
	var puncs = document.querySelectorAll('.highlight .p')
	for (var i = 0; i < puncs.length; i++) {
		if (openPuncs.test(puncs[i].textContent)) puncs[i].classList.add('open')
	}
	
	etab.processLines(document.querySelectorAll('.js-file-line'))
}

$(document).ready(process).on('pjax:success', process)
