// LICENCE /////////////////////////////////////////////////////////////////////


/**
 * @license
 */


/// INDEX //////////////////////////////////////////////////////////////////////


/*
 * TODO
 */


/// CODE ///////////////////////////////////////////////////////////////////////


/**
 * Simule a click on the select primitive meridian button.
 *
 * @return {void}
 */
Application.prototype.selectMeridian = function () {
    $("#meridianPrimitive").prop ("checked", true).button ("refresh");
    this.changeMeridianMode ();
};


//==============================================================================
/**
 * Simule a click on the select primitive revolution button.
 *
 * @return {void}
 */
Application.prototype.selectRevol = function () {
    $("#revolPrimitive").prop ("checked", true).button ("refresh");
    this.changeRevolMode ();
};


//==============================================================================
/**
 * Simule a click on the formula meridian button.
 *
 * @return {void}
 */
Application.prototype.inputMeridianFormula = function () {
    $("#meridianFormula").prop ("checked", true).button ("refresh");
    this.changeMeridianMode ();
};


//==============================================================================
/**
 * Simule a click on the formula revolution button.
 *
 * @return {void}
 */
Application.prototype.inputRevolFormula = function () {
    $("#revolFormula").prop ("checked", true).button ("refresh");
    this.changeRevolMode ();
};


//==============================================================================
/**
 * Simule a click on the formula meridian button.
 *
 * @return {void}
 */
Application.prototype.drawFreeHandMeridian = function () {
    $("#meridianFreeHand").prop ("checked", true).button ("refresh");
    this.changeMeridianMode ();
};


//==============================================================================
/**
 * Toggle the display attribute of the repere.
 *
 * @return {void}
 */
Application.prototype.toggleBox = function () {
    var box = this.surfaceView.getContainer ().getObjectByName ("boundingBox");
    box.setDisplay (! box.displayMe ());
    this.show ();
};


//==============================================================================
/**
 * Toggle the display attribute of the bounding box.
 *
 * @return {void}
 */
Application.prototype.toggleRepere = function () {
    var repere = this.surfaceView.getContainer ().getObjectByName ("repere");
    repere.setDisplay (! repere.displayMe ());
    this.show ();
};
