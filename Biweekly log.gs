// This function initializes a parameter to allow for backups every two weeks.
// Run it once on a separate .gs file and combine it with a weekly trigger. 

function initBiweeklyParam() {
 var runThisWeek = PropertiesService.getScriptProperties();
 var newProperties = {runThisWeek: "False"};
 runThisWeek.setProperties(newProperties); 
}


// This function appends biweekly logs to another spreadsheet/workbook. Place it in a separate .gs and place a weekly trigger.

function biweekyLog() {
  
  var runThisWeek = ScriptProperties.getProperty("runThisWeek");
  
  if (runThisWeek == "False") {

    var sourceSheet = SpreadsheetApp.openById("SOURCE SPREADSHEET/WORKBOOK ID").getSheetByName("SOURCE SHEET NAME");
    var rawCol = sourceSheet.getLastColumn();
    var rawRow = sourceSheet.getLastRow();
    // Data range to copy.
    var sourceData = sourceSheet.getRange(2, 1, rawRow - 1,rawCol);
    var sourceDataRows = sourceData.getNumRows();
    var sourceDataValues = sourceData.getValues();
    // This adds the log date. Point it to a cell on the destination spreasheet with =TODAY
    var logdate = SpreadsheetApp.openById("SOURCE SPREADSHET ID").getSheetByName("SHEET NAME").getRange("CELL WITH =TODAY").getDisplayValue();
    var destination = SpreadsheetApp.openById("DESTINATION SPREADSHEET ID");
    var destSs = destination.getSheetByName("DESTINATION SHEET NAME");
    var rowOffset = destSs.getLastRow();
    // Adds the logdate to the destination sheet
    destSs.getDataRange().offset(rowOffset, 0, sourceDataRows, 1).setValue(logdate);
    // Appends data to the sheet. Offset allows for logdate on the first column
    destSs.getDataRange().offset(rowOffset, 1, sourceDataRows, rawCol).setValues(sourceDataValues);
    //Sets the script property to True, so it does not run on the next weekly trigger.
    ScriptProperties.setProperty("runThisWeek","True");

  } else {
    //Resets the parameter so that it logs on the next weekly trigger.
    ScriptProperties.setProperty("runThisWeek","False");

  }
}
