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

	var blobs = document.querySelectorAll('.blob-wrapper > table')
	for (var i = 0; i < blobs.length; i++) {
		var localEtab = etab
		var blob = blobs[i]
		if (blob.dataset.tabSize && blob.dataset.tabSize !== 8) {
			localEtab = new ElasticTabstops({
				tabIndentExtraSpace: blob.dataset.tabSize
			})
		}
		localEtab.processLines(blobs[i].querySelectorAll('.blob-code'))
	}
}

ghImport('jquery').then(function($) {
	$(document).ready(process).on('pjax:success', process)
})
