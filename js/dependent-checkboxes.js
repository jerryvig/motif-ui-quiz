/**
 * @fileoverview Motif dependent checkboxes exercise for the UI Engineering quiz.
 * @author Jerry Vigil jerry.vigil@mktneutral.com
 * 
 */

//Namespace declarations.
var motif = motif || {};
motif.dependentcheckboxes = motif.dependentcheckboxes || {};

/**
 * An array that contains the rows in the table.
 */
motif.dependentcheckboxes.rows = new Array();

/**
 * Gets references to the rows in the table on the DOM.
 * 0th row is the header row. 1st row is the first row with data.
 * 
 * @author Jerry Vigil
 */
motif.dependentcheckboxes.getRows = function() {
	for ( var i=1; i<6; i++ ) {
		var rowI = document.getElementById('row'+i);
		motif.dependentcheckboxes.rows.push(rowI);
	}
};

/**
 * Gets all of the checkboxes from the table rows of the application.
 * Sets each checkbox's 'onclick' handler.
 * 
 * @author Jerry Vigil
 */
motif.dependentcheckboxes.setCheckboxesOnClick = function() {
	motif.dependentcheckboxes.rows.forEach(function(row){
		var inputArray = Array.prototype.slice.call(row.getElementsByTagName('input'));
		var columnCount = 0;
		
		inputArray.forEach(function(input){
			if ( input.type == 'checkbox' ) {
				//set each input's 'onclick' method.
				input.onclick = motif.dependentcheckboxes.checkboxClicked;
			}
		});
	});
};

/**
 * The onclick event handler for the checkbox input elements in the table.
 * 
 * @param event  The click event of the input element.
 * 
 * @author Jerry Vigil
 */
motif.dependentcheckboxes.checkboxClicked = function(event) {
	var input = event.target;
	var inputRow = input.parentNode.parentNode;
	var iArray = Array.prototype.slice.call(inputRow.getElementsByTagName('input'));
	
	//Find the index of the <input> element that was clicked.
	var inputIndex = 0;
	var i = 0;
	iArray.forEach(function(siblingInput){
		//Do "deep" equals to find the clicked element.
		if ( input === siblingInput ) {
			inputIndex = i;
		}
		i++;
	});
	
	if ( input.checked ) {
		//Check all inputs after the clicked input in the row.
		for ( i=inputIndex+1; i<iArray.length; i++ ) {
			if ( iArray[i].type = 'checkbox' ) {
				iArray[i].checked = true;
			}
		}
	} else {
		//Uncheck all inputs before the clicked input in the row.
		for ( i=0; i<inputIndex; i++ ) {
			if ( iArray[i].type = 'checkbox' ) {
				iArray[i].checked = false;
			}
		}
	}
};

/**
 * Prints the privacy level of each feature to the console when the submit button is clicked.
 * This is the 'onclick' handler of the submit button.
 * 
 * @author Jerry Vigil
 */
motif.dependentcheckboxes.printReportToConsole = function() {
	var featureIndex = 1;
	motif.dependentcheckboxes.rows.forEach(function(row){
		var inputArray = Array.prototype.slice.call(row.getElementsByTagName('input'));
		
		for ( var i=0; i<inputArray.length; i++ ) {
			if ( inputArray[i].type == 'checkbox' ) {
				if ( inputArray[i].checked ) {
					console.log('Feature '+featureIndex+' level is '+i);
					break;
				}
			}
		}
		
		featureIndex++;
	});
};	

//Set the onclick handler of the submit button.
document.getElementById('submitButton').onclick = motif.dependentcheckboxes.printReportToConsole;

motif.dependentcheckboxes.getRows();
motif.dependentcheckboxes.setCheckboxesOnClick();