var START_CORNER = 20;

/**
 * Computes the box width given the colorIndex and visible width.
 * 
 * @param colorIndex
 * @param width
 * @returns {Number}
 * 
 * @author Jerry Vigil
 */
function computeBoxWidth(colorIndex, width) {
	return 2*width + 2*(15-colorIndex)*width;
}

/**
 * 
 * @param colorIndex
 * @returns {String}
 * 
 * @author Jerry Vigil
 */
function getHexColor(colorIndex){
	var hexColor = colorIndex.toString(16);
	return '#'+ hexColor + hexColor + hexColor + hexColor + hexColor + hexColor;
}

/**
 * 
 * @param cornerIndex
 * @param width
 * @returns {position} position to place the box.
 * 
 * @author Jerry Vigil
 */
function getPosition(cornerIndex, width) {
	var cornerPos = START_CORNER+cornerIndex*width;
	var position = { 'left' : cornerPos + 'px', 'top' : cornerPos + 'px' };
	return position;
}

/**
 * Draws the squares on the page.
 * 
 * @param startingColor
 * @param width
 * 
 * @author Jerry Vigil
 */
function drawSquares(initialColor, width){
	$('#boxContainer').empty();
	
	var colorIndex = initialColor;
	var cornerIndex = 0;
	
	while ( colorIndex < 16 ) {
		var box = $('<div></div>');
		
		var boxWidth = computeBoxWidth(colorIndex, width);
		$(box).css('width',boxWidth+'px');
		$(box).css('height',boxWidth+'px');
		
		$(box).css('position','absolute');
		$(box).css(getPosition(cornerIndex, width));
			
		$(box).css('background-color', getHexColor(colorIndex));
		$(box).css('z-index', cornerIndex);
		
		$(box).appendTo('#boxContainer');
		
		colorIndex++;
		cornerIndex++;
	}	
}

/**
 * Validate that the width and color inputs are in the acceptable ranges.
 * 
 * @returns {Boolean}
 * 
 * @author Jerry Vigil
 */
function validateInputs() {
	if ( $('#widthInput').val() > 0 && $('#widthInput').val() <= 250 ) {
		if ( $('#colorInput').val() >= 0 && $('#colorInput').val() < 15 ) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

/**
 * Color object constructor.
 * 
 * @constructor
 */
Color = function(r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
};

/**
 *  Multiplies the color vector by a factor. 
 *  
 *  @param multiplier  The factor to multiply each of the r,g,b values by.
 */
Color.prototype.multiply = function(multiplier) {
	return new Color(multiplier*this.r, multiplier*this.g, multiplier*this.b);
};

/**
 *  Multiplies the color vector by a factor. 
 *  
 *  @return {String}  The HEX representation of the color.
 */
Color.prototype.getHexColor = function() {
	var rString = this.r.toString(16);
	var gString = this.g.toString(16);
	var bString = this.b.toString(16);
	
	return '#' + rString + rString + gString + gString + bString + bString;
};

/**
 * Draws the colored squares on the page.
 * 
 * @param r  - Red channel of the initialColor
 * @param g  - Green channel of the initialColor
 * @param b  - Blue channel of the initialColor
 * 
 * @param width
 * 
 * @author Jerry Vigil
 */
function drawColoredSquares(color, width){
	$('#boxContainer').empty();

	var cornerIndex = 0;
	var zIndexIndex = 100;
	var multiplier = 1;
	
	while ( color.r < 16 && color.g < 16 && color.b < 16 ) {
		var box = $('<div></div>');
		
		var boxWidth = 2*width + 2*cornerIndex*width;
		$(box).css('width',boxWidth+'px');
		$(box).css('height',boxWidth+'px');
		
		$(box).css('position','absolute');
		$(box).css({'top':'0px', 'left':'0px'});
		
		var hexColor = color.getHexColor();
		console.log( 'HEX COLOR = ' + hexColor );
		$(box).css('background-color', hexColor);
		$(box).css('z-index', zIndexIndex);
		
		$(box).appendTo('#boxContainer');
		
		cornerIndex++;
		multiplier++;
		zIndexIndex--;
		
		color = color.multiply(multiplier);
	}	
}

$(document).ready(function(){
	$('#widthInput').change(function(){
		if ( $(this).val() > 0 && $(this).val() <= 250 ) {
			if ( validateInputs() ) {
				drawSquares( $('#colorInput').val(), $(this).val() );
			} else {
				alert('Invalid input values.');
			}
		} else {
			alert('Invalid width. Please enter a width in pixels from 1 to 250');
		}
	});
	
	$('#colorInput').change(function(){
		if ( $(this).val() >= 0 && $(this).val() < 15 ) {
			if ( validateInputs() ) {
				drawSquares( $(this).val(), $('#widthInput').val() );
			} else {
				alert('Invalid input values.');
			}
		} else {
			alert('Invalid starting color. Please change to integer from 0 to 14.')
		}
	});
	
	//Set default values for color and width.
	$('#colorInput').val('10');
	$('#widthInput').val('25');
	
	//Trigger the change event on the colorInput
	$('#colorInput').change();
});

//------------- TESTS START HERE ----------------------------

/**
 * Tests the computeBoxWidth() function with six sets of input.
 * 
 * @author Jerry Vigil
 */
test('testComputeBoxWidth()', function(){
	//Six test cases.
	equal(40, computeBoxWidth(14, 10),'Failed to verify the box width for 14, 10');
	equal(3472, computeBoxWidth(8, 217),'Failed to verify the box width for 8, 217');
	equal(5248, computeBoxWidth(0, 164),'Failed to verify the box width for 0, 164');
	equal(6552, computeBoxWidth(2, 234),'Failed to verify the box width for 2, 234');
	equal(1358, computeBoxWidth(9, 97),'Failed to verify the box width for 9, 97');
	equal(500, computeBoxWidth(11, 50),'Failed to verify the box width for 11, 50');
});

/**
 * Tests the getHexColor() function.
 * 
 * @author Jerry Vigil
 */
test('testGetHexColor()', function(){
	//Create associative array of numbers 0 to 15 to HEX color values.
	var colormap = { '0':'#000000', '1':'#111111', '2':'#222222', '3':'#333333', '4':'#444444', '5':'#555555', '6':'#666666', '7':'#777777', 
				'8':'#888888', '9':'#999999', '10':'#aaaaaa', '11':'#bbbbbb', '12':'#cccccc',  '13':'#dddddd', '14':'#eeeeee', '15':'#ffffff' };
	
	for ( var i=0; i<16; i++ ) {
		equal(colormap[i], getHexColor(i), 'Failed to validate hex color string.');
	}
});

/**
 * Tests the getPosition() function with five test cases.
 * 
 * @author Jerry Vigil
 */
test('testGetPosition()', function(){
	var expectedPosition = {'left':'20px', 'top':'20px'};
	deepEqual(expectedPosition, getPosition(0, 10), 'Failed to verify box position for (0, 10).');
	
	expectedPosition = {'left':'40px', 'top':'40px'};
	deepEqual(expectedPosition, getPosition(1, 20), 'Failed to verify box position for (1, 20).');
	
	expectedPosition = {'left':'320px', 'top':'320px'};
	deepEqual(expectedPosition, getPosition(3, 100), 'Failed to verify box position for (3, 100).');
	
	expectedPosition = {'left':'105px', 'top':'105px'};
	deepEqual(expectedPosition, getPosition(5, 17), 'Failed to verify box position for (5, 17).');
	
	expectedPosition = {'left':'62px', 'top':'62px'};
	deepEqual(expectedPosition, getPosition(6, 7), 'Failed to verify box position for (6, 7).');
});

/**
 * Tests the validateInputs() function.
 * 
 * @author Jerry Vigil
 */
test('testValidateInputs()', function(){
	//Setup invalid inputs, and validate that method returns false.
	$('#widthInput').val('500');
	$('#colorInput').val('19');
	
	equal(false, validateInputs(), 'Failed to invalidate input when expected invalidation.');
	
	//Set the width to a valid number.
	$('#widthInput').val('20');
	
	//We still expect invalid input.
	equal(false, validateInputs(), 'Failed to invalidate input when expected invalidation.');
	
	//Set the color to a valid number
	$('#colorInput').val('10');
	
	ok(validateInputs(), 'Failed to validate input when expected validation.');
});

/**
 * Tests the drawSquares function.
 * 
 * @author Jerry Vigil
 */
test('testDrawSquares()', function(){
	//Setup a state to draw
	drawSquares(7, 20);
	
	//Validate the number of #boxContainer children.
	equal(9, $('#boxContainer').children().length, 'Failed to validate the number of box container children');
	
	//Validate the height and width of the outer most box.
	equal('360px', $( $('#boxContainer').children()[0] ).css('width'), 'Failed to validate width of the first box');
	equal('360px', $( $('#boxContainer').children()[0] ).css('height'), 'Failed to validate height of the first box');
	
	//Validate the height and width of the inner most box.
	equal('40px', $( $('#boxContainer').children()[8] ).css('width'), 'Failed to validate width of the last box');
	equal('40px', $( $('#boxContainer').children()[8] ).css('height'), 'Failed to validate height of the last box');
	
	var zIndex = 0;
	$.each($('#boxContainer').children(), function(){
		equal(zIndex, $(this).css('z-index'), 'Failed to validate the z-index');
		zIndex++;
	});
	
	//Setup another state to draw.
	drawSquares(3, 9);
	
	//Validate the number of #boxContainer children.
	equal(13, $('#boxContainer').children().length, 'Failed to validate the number of box container children');
	
	//Validate the height and width of the outer most box.
	equal('234px', $( $('#boxContainer').children()[0] ).css('width'), 'Failed to validate width of the first box');
	equal('234px', $( $('#boxContainer').children()[0] ).css('height'), 'Failed to validate height of the first box');
	
	//Validate the height and width of the inner most box.
	equal('18px', $( $('#boxContainer').children()[12] ).css('width'), 'Failed to validate width of the last box');
	equal('18px', $( $('#boxContainer').children()[12] ).css('height'), 'Failed to validate height of the last box');
	
	zIndex = 0;
	$.each($('#boxContainer').children(), function(){
		equal(zIndex, $(this).css('z-index'), 'Failed to validate the z-index');
		zIndex++;
	});
});

test('testDrawColoredSquares()', function() {
	//drawColoredSquares(new Color(0, 0, 1), 10);
	
	ok(true, 'dummy assertion');
});