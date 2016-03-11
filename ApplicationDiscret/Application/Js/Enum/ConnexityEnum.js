// LICENCE /////////////////////////////////////////////////////////////////////


// TODO


// CODE ////////////////////////////////////////////////////////////////////////



/**
 * @enum
 * C26 is connexity by vertex (or 0-connexity), C18 is
 * connexity by edge (or 1-connexity) and C6 is connexity by face (or
 * 2-connexity). Each value is a binary mask.
 */
var ConnexityEnum = {
	/// values
	NULL : 0,
	C26  : 1,
	C18  : 2,
	C6   : 4,
	ALL  : 7
};



if (Object.freeze){
	ConnexityEnum = Object.freeze (ConnexityEnum);
}

