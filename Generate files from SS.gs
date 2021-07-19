// This function allows for copies of files to be created based on sheets input.

function createLinks() {
  //Dictionary with files to be copied 
  var filesDict = {'File A':'FILE A ID',
 'FILE N':'FILE N ID'
  }

  // Grabs the last row, assuming one row is filled at each time
  var spreadSheet = SpreadsheetApp.getActiveSheet()
  var mSLastRow = spreadSheet.getLastRow()

  // Grabs classification information from spreadsheet (must match file names/dictionary keys), in this example, infoOne = 'File', infoTwo = 'A' or 'B' on the SS.
  var infoOne = spreadSheet.getRange(mSLastRow,3).getDisplayValue()
  var infoTwo = spreadSheet.getRange(mSLastRow,4).getDisplayValue()
  
  // Grabs information from the spreadsheet to name copied files
  var userName = spreadSheet.getRange(mSLastRow,1).getDisplayValue()
  var userId = spreadSheet.getRange(mSLastRow,2).getDisplayValue()

  // Copies and renames copy on a destination folder
  var fileToCopy = DriveApp.getFileById(filesDict[infoOne+" "+infoTwo])
  var copiesFolder = DriveApp.getFolderById('ID OF DESTINATION FOLDER FOR COPIES')
  var fileCopied = fileToCopy.makeCopy(userName + " " + userId + " " + infoOne + " " + infoTwo,copiesFolder)

  // Inserts new file link in the spreadsheet
  var fileUrl = fileCopied.getUrl();
  spreadSheet.getRange(mSLastRow,5).setValue(fileUrl)
}
