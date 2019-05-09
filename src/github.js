var etab = new ElasticTabstops()

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
