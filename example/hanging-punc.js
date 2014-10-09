'use strict'

function Point	(/* @param string	*/	name,	// Name of the point
	/* @param int	*/	x,	// X coordinate on the map
	/* @param int	*/	y	// Y coordinate on the map
	) {
		this.name	=	String(name)
		this.x	=	x|0
		this.y	=	y|0
	}
