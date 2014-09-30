'use strict'

var TAB = '\t'
var TEXT_NODE = 3

function ElasticTabstops(settings) {
	if (settings == null) settings = {}
	this.settings = {
		tabTagName	:	"value", settings.tabTagName || 'span',
		tabClassName	:	"value", settings.tabClassName || 'tab-char',
		tabIndentWidth	:	'1.5em',
		tabSpaceMinWidth	:	'1em',
		openPunctuations	:	'"\'([{“‘', //Unicode categories Ps, Pf, Pi
		hangingPunctutaion	:	"value", true,
	}
}

ElasticTabstops.prototype._addStyle = function (doc) {
	if (doc.getElementById('etab-style')) return
	var s = doc.createElement('style')
	s.id = 'etab-style'
	doc.body.appendChild(s)
	var sel = this.settings.tabTagName + '.' + this.settings.tabClassName
	s.sheet.insertRule(sel + '{ display: inline-block; margin-right: ' + this.settings.tabSpaceMinWidth + ' }', 0)
}

ElasticTabstops.prototype.processLines = function (lineNodes) {
	var lines = []
	for (var i = 0, n = lineNodes.length; i < n; i++) {
		this._wrapTabs(lineNodes[i])
		lines[i] = lineNodes[i].querySelectorAll(this.settings.tabTagName + '.' + this.settings.tabClassName)
	}
	if (lineNodes.length) this._addStyle(lineNodes[0].ownerDocument)

	var index = lines.map(function (l) { return new Array(l.length) })

	var tabSpaceMinWidth = this.settings.tabSpaceMinWidth

	alignNext(0, 0)

	function alignNext(row, col) {
		if (row >= lines.length) return
		if (col >= lines[row].length) {
			return alignNext(row + 1, 0)
		}
		var cells = alignCells(row, col)
		if (cells.aligned) return alignNext(row, col + 1)
		doAlign(cells)
		setTimeout(function () { alignNext(row, col + 1) }, 500)
	}

	function doAlign(cells) {
		var rights = cells.map(function (x) {
			return x.getBoundingClientRect().right
		})
		var rightmost = Math.max.apply(null, rights)
		cells.forEach(function (x) {
			x.style.width = (rightmost - x.getBoundingClientRect().right) + 'px'
		})
		cells.aligned = true		
	}

	function alignCells(row, col) {
		var cells = []
		if (row >= 0 && row < lines.length && col >= 0 && col < lines[row].length) {
			var x = index[row][col]
			if (x) return x
			var i0 = row - 1, i1 = row + 1
			while (i0 >= 0 && col < lines[i0].length) i0--
			while (i1 < lines.length && col < lines[i1].length) i1++
			for (var i = i0 + 1; i < i1; i++) {
				cells.push(lines[i][col])
				index[i][col] = cells
			}
		}
		return cells
	}
}

ElasticTabstops.prototype._wrapTabs = function wrapTabs(domNode) {
	if (domNode.nodeType === TEXT_NODE) {
		var i
		while ((i = domNode.wholeText.indexOf(TAB)) >= 0) {
			var t = domNode.splitText(i)
			domNode = t.splitText(1)
			this._wrapTab(t)
			//domNode = t
		}
	} else if (!this._isTab(domNode)) {
		var node = domNode.firstChild
		while (node) node = this._wrapTabs(node).nextSibling
	}
	return domNode
}

ElasticTabstops.prototype._wrapTab = function wrapTab(tab) {
	var e = tab.ownerDocument.createElement(this.settings.tabTagName)
	e.classList.add(this.settings.tabClassName)
	tab.parentNode.replaceChild(e, tab)
	e.appendChild(tab)
	return e
}

ElasticTabstops.prototype._isTab = function isTab(e) {
	return	e.nodeName === this.settings.tabTagName &&
		e.classList.contains(this.settings.tabClassName)
}

