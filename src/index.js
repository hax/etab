'use strict'

var TAB	= '\t'
var SPACE	= ' '
var TEXT_NODE	= 3

function ElasticTabstops(settings) {
	var s = settings || {}
	this.settings = {
		tabTagName	:	s.tabTagName	|| 'span',
		tabClassName	:	s.tabClassName	|| 'tab-char',
		//tabIndentWidth	:	s.tabIndentWidth	|| '1.5em',
		indentClassName	:	s.indentClassName	||	'ident',
		tabIndentExtraSpace	:	8, 
		tabSpaceMinWidth	:	s.tabSpaceMinWidth	|| '1em',
		styleId	:	s.styleId	|| 'etab-style', 
		styleRules	:	s.styleRules	|| [], 
		//openPunctuations	:	s.openPunctuations	|| '"\'([{“‘',	// Unicode categories Ps, Pf, Pi
		//hangingPunctutaion	:	s.hangingPunctutaion !== undefined ? !!s.hangingPunctutaion	: true,
		//openClassName	:	s.openClassName	|| 'open',
	}
}

ElasticTabstops.prototype._addStyle = function (doc) {
	if (doc.getElementById(this.settings.styleId)) return
	var s = doc.createElement('style')
	s.id = this.settings.styleId
	doc.body.appendChild(s)
	var sel = this.settings.tabTagName + '.' + this.settings.tabClassName
	s.sheet.insertRule(sel + '{ display: inline-block; margin-right: ' + this.settings.tabSpaceMinWidth + ' }', 0)
	this.settings.styleRules.forEach(function (rule, i) {
		s.sheet.insertRule(rule, i + 1)
	})
}

ElasticTabstops.prototype.testLines = function (lineNodes) {
	var etabPattern = /[^\t]+\t/
	var state = false
	for (var i = 0, n = lineNodes.length; i < n; i++) {
		var text = lineNodes[i].textContent
		if (text.charAt(0) === SPACE) return false
		if (etabPattern.test(text)) {
			if (state) return true
			else state = true
		} else {
			state = false
		}
	}
	return false
}

ElasticTabstops.prototype.processLines = function (lineNodes) {
	
	if (!this.testLines(lineNodes)) return

	this._addStyle(lineNodes[0].ownerDocument)

	var lines = []
	for (var i = 0, n = lineNodes.length; i < n; i++) {
		this._wrapAllTabs(lineNodes[i])
		lines[i] = lineNodes[i].querySelectorAll(this.settings.tabTagName + '.' + this.settings.tabClassName)
	}

	var index = lines.map(function (l) { return new Array(l.length) })

	var settings = this.settings
	
	alignNext(0, 0)

	function alignNext(row, col) {
		if (row >= lines.length) return
		if (col >= lines[row].length) {
			return alignNext(row + 1, 0)
		}
		var cells = alignCells(row, col)
		if (cells.aligned) return alignNext(row, col + 1)
		doAlign(cells)
		setTimeout(function () { alignNext(row, col + 1) })
	}

	function doAlign(cells) {
		var rights = cells.map(function (x) {
			var r = x.getBoundingClientRect().right
			if (x.classList.contains(settings.indentClassName)) r += settings.tabIndentExtraSpace
			return r
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

ElasticTabstops.prototype._wrapAllTabs = function wrapTabs(domNode, indent) {
	if (indent === undefined) indent = true
	if (domNode.nodeType === TEXT_NODE) {
		var i
		while ((i = domNode.wholeText.indexOf(TAB)) >= 0) {
			if (indent && i > 0) indent = false
			var t = domNode.splitText(i)
			domNode = t.splitText(1)
			this._wrapTab(t, indent)
		}
		if (indent && domNode.wholeText.length > 0) indent = false
	} else if (!this._isTab(domNode)) {
		var node = domNode.firstChild
		while (node) {
			var next = node.nextSibling
			indent = this._wrapAllTabs(node, indent)
			node = next
		}
	}
	return indent
}

ElasticTabstops.prototype._wrapTab = function wrapTab(tab, indent) {
	var e = tab.ownerDocument.createElement(this.settings.tabTagName)
	e.classList.add(this.settings.tabClassName)
	if (indent) e.classList.add(this.settings.indentClassName)
	tab.parentNode.replaceChild(e, tab)
	e.appendChild(tab)
	return e
}

ElasticTabstops.prototype._isTab = function isTab(e) {
	return	e.nodeName === this.settings.tabTagName &&
		e.classList.contains(this.settings.tabClassName)
}

ElasticTabstops.prototype._wrapTabColumns = function wrapTabColumns(domNode) {
	//todo
}
