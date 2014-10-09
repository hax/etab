'use strict'

/* @class */
function Point	(/* @param string */	name,
	/* @param int */	x,
	/* @param int */	y)	{

		this._name	= name
		this.x	= x
		this.y	= y
		}
/* @method string */
Point.prototype.getName = function ()	{
	return this._name
	}