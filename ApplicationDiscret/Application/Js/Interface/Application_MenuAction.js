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
};


//==============================================================================
/**
 * Simule a click on the select primitive revolution button.
 *
 * @return {void}
 */
Application.prototype.selectRevol = function () {
    $("#revolPrimitive").prop ("checked", true).button ("refresh");
};


//==============================================================================
/**
 * Simule a click on the formula meridian button.
 *
 * @return {void}
 */
Application.prototype.inputMeridianFormula = function () {
    $("#meridianFormula").prop ("checked", true).button ("refresh");
};


//==============================================================================
/**
 * Simule a click on the formula revolution button.
 *
 * @return {void}
 */
Application.prototype.inputRevolFormula = function () {
    $("#revolFormula").prop ("checked", true).button ("refresh");
};


//==============================================================================
/**
 * Simule a click on the formula meridian button.
 *
 * @return {void}
 */
Application.prototype.drawFreeHandMeridian = function () {
    $("#meridianFreeHand").prop ("checked", true).button ("refresh");
};
