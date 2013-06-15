/**
 *  Qunit based tests. http://qunitjs.com/
 * 	Tests the motif.dependentcheckboxes.getRows function.
 * 
 *  1) Verifies that the expected number of rows are returned.
 *  2) Verifies each row that is expected to be returned.
 *  
 *  @author Jerry Vigil
 */
test('Test motif.dependentcheckboxes.getRows',function(){
	//Reset the reference to the rows to a new array.
	motif.dependentcheckboxes.rows = new Array();
	motif.dependentcheckboxes.getRows();
	
	//Verify that 5 rows are returned.
	equal(5, motif.dependentcheckboxes.rows.length, 'Unexepected number of rows found in motif.dependentcheckboxes.rows');
	
	//Verify row1 is returned as the first row.
	equal('row1', motif.dependentcheckboxes.rows[0].id, 'Failed to verify row1');
	
	//Verify row2 is returned as the second row.
	equal('row2', motif.dependentcheckboxes.rows[1].id, 'Failed to verify row2');
	
	//Verify row3 is returned as the third row.
	equal('row3', motif.dependentcheckboxes.rows[2].id, 'Failed to verify row3');
	
	//Verify row4 is returned as the fourth row.
	equal('row4', motif.dependentcheckboxes.rows[3].id, 'Failed to verify row4');
	
	//Verify row5 is returned as the fifth row.
	equal('row5', motif.dependentcheckboxes.rows[4].id, 'Failed to verify row5');
});

/**
 * 	Tests the motif.dependentcheckboxes.setCheckboxesOnClick function.
 * 
 *  1) Verifies that the onclick handler is set to motif.dependentcheckboxes.checkboxClicked
 *   for all of the input elements in the test document.
 *  
 *  @author Jerry Vigil
 */
test('Test motif.dependentcheckboxes.setCheckboxesOnClick',function(){
	motif.dependentcheckboxes.setCheckboxesOnClick();
	
	motif.dependentcheckboxes.rows.forEach(function(row){
		var inputArray = Array.prototype.slice.call(row.getElementsByTagName('input'));
		
		//Verify that the onclick handler is set properly for all of the input elements.
		inputArray.forEach(function(input){
			equal(motif.dependentcheckboxes.checkboxClicked, input.onclick, 'Failed to verify the onclick handler of the input element');
		});
	});
});

/**
 * Tests that the data printed to the console is what we expect.
 * 
 * Steps:
 * 1) Setup a scenario in which the privacy levels for each feature are set to a certain value.
 * 2) Click the submit button on the page.
 * 3) Verify that the text printed to the console is what is expected given the setup of the privacy levels.
 * 
 * @author Jerry Vigil
 */
test('Test motif.dependentcheckboxes.printReportToConsole',function(){
	//Setup a scenario in which the privacy levels for each feature are set to a certain value.	
	$('#row1').find('input')[0].click();
	$('#row2').find('input')[1].click();
	$('#row3').find('input')[2].click();
	$('#row4').find('input')[1].click();
	$('#row5').find('input')[0].click();
	
	var logMessages = new Array();
	
	//Redirect console.log() output to append to the logMessages array.
	(function(){
		var oldlog = console.log;
		console.log = function(message){
			logMessages.push( message );
			oldlog.apply(console, arguments);
		};
	})();
	
	//Click the submit button to print the status to the console.
	$('#submitButton').click();
	
	//Assert the status of each feature's level.
	equal('Feature 1 level is 0', logMessages[0], 'First row console.log() messages do not equate.');
	equal('Feature 2 level is 1', logMessages[1], 'Second row console.log() messages do not equate.');
	equal('Feature 3 level is 2', logMessages[2], 'Third row console.log() messages do not equate.');
	equal('Feature 4 level is 1', logMessages[3], 'Fourth row console.log() messages do not equate.');
	equal('Feature 5 level is 0', logMessages[4], 'Fifth row console.log() messages do not equate.');
});

/**
 * Tests the behavior of checking the checkboxes in the feature rows.
 * 
 * Steps:
 * 1) Uncheck all of the checkboxes in the table.
 * 2) Do verifications for each row.
 * 
 * @author Jerry Vigil
 */
test('Test the checkbox checking behavior',function(){
	$.each($('#privacySettingsTable').find('input'), function(){
		this.checked = false;
	});

	//In the first row, get the first input and click it.
	$('#row1').find('input')[0].click();
	
	//Verify that all of the checkboxes in the first row are checked after clicking the first box.
	$.each($('#row1').find('input'), function(){
		ok(this.checked, 'Failed to verify the checkboxes checked in the first row.');
	});
	
	//In the second row get the second checkbox and click it.
	$('#row2').find('input')[1].click();
	
	//Verify that the first checkbox in the second row did not get checked.
	equal(false, $('#row2').find('input')[0].checked, 'Failed to verify unchecked box in second row');
	
	//Verify that the second and third checkboxes in the second row are checked.
	equal(true, $('#row2').find('input')[1].checked, 'Failed to verify checked box in second row');
	equal(true, $('#row2').find('input')[2].checked, 'Failed to verify checked box in second row');
	
	//In the third row get the third checkbox and click it.
	$('#row3').find('input')[2].click();
	
	//Verify that the first and second boxes are unchecked in the third row.
	equal(false, $('#row3').find('input')[0].checked, 'Failed to verify unchecked box in third row');
	equal(false, $('#row3').find('input')[1].checked, 'Failed to verify unchecked box in third row');
	
	//Verify that the third box in the third row is checked.
	equal(true, $('#row3').find('input')[2].checked, 'Failed to verify checked box in third row');
	
	//In the fourth row get the second checkbox and click it.
	$('#row4').find('input')[1].click();
	
	//Verify that the first checkbox in the fourth row did not get checked.
	equal(false, $('#row4').find('input')[0].checked, 'Failed to verify unchecked box in fourth row');
	
	//Verify that the second and third checkboxes in the fourth row are checked.
	equal(true, $('#row4').find('input')[1].checked, 'Failed to verify checked box in fourth row');
	equal(true, $('#row4').find('input')[2].checked, 'Failed to verify checked box in fourth row');
	
	//In the fifth row get the first checkbox and click it.
	$('#row5').find('input')[0].click();
	
	//Verify that all of the checkboxes in the fifth row are checked after clicking the first box.
	$.each($('#row5').find('input'), function(){
		ok(this.checked, 'Failed to verify the checkboxes checked in the fifth row.');
	});
});

/**
 * Tests the behavior of unchecking the checkboxes in the feature rows.
 * 
 * Steps:
 * 1) Check all of the checkboxes in the table.
 * 2) Do verifications for each row.
 * 
 * @author Jerry Vigil
 */
test('Test the checkbox unchecking behavior',function(){
	$.each($('#privacySettingsTable').find('input'), function(){
		this.checked = true;
	});
	
	//In the first row, get the first input and click it.
	$('#row1').find('input')[0].click();
	
	//Verify that the first box is unchecked and the 2nd and 3rd are checked in the first row.
	equal(false, $('#row1').find('input')[0].checked, 'Failed to verify unchecked box in first row');
	ok($('#row1').find('input')[1].checked, 'Failed to verify checked box in first row');
	ok($('#row1').find('input')[2].checked, 'Failed to verify checked box in first row');
	
	//In the second row, get the second input and click it.
	$('#row2').find('input')[1].click();
	
	//Verify that the first and second boxes are unchecked and the third box checked in the second row.
	equal(false, $('#row2').find('input')[0].checked, 'Failed to verify unchecked box in second row');
	equal(false, $('#row2').find('input')[1].checked, 'Failed to verify unchecked box in second row');
	ok($('#row2').find('input')[2].checked, 'Failed to verify checked box in second row');
	
	//In the third row, get the third input and click it.
	$('#row3').find('input')[2].click();
	
	//Verify that all the boxes are unchecked in the third row.
	$.each($('#row3').find('input'), function(){
		equal(false, this.checked, 'Failed to verify unchecked box in third row');
	});
	
	//In the fourth row, get the second input and click it.
	$('#row4').find('input')[1].click();
	
	//Verify that the first and second boxes are unchecked and the third box checked in the fourth row.
	equal(false, $('#row4').find('input')[0].checked, 'Failed to verify unchecked box in fourth row');
	equal(false, $('#row4').find('input')[1].checked, 'Failed to verify unchecked box in fourth row');
	ok($('#row4').find('input')[2].checked, 'Failed to verify checked box in fourth row');
	
	//In the fifth row, get the first input and click it.
	$('#row5').find('input')[0].click();
	
	//Verify that the first box is unchecked and the 2nd and 3rd are checked in the fifth row.
	equal(false, $('#row5').find('input')[0].checked, 'Failed to verify unchecked box in fifth row');
	ok($('#row5').find('input')[1].checked, 'Failed to verify checked box in fifth row');
	ok($('#row5').find('input')[2].checked, 'Failed to verify checked box in fifth row');
});