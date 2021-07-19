// TODOL Implement continuation token.
// Will fail for large folders due to run time limitations

function start() {

  var sourceFolder = "SOURCE FOLDER NAME";
  var targetFolder = "TARGET FOLDER NAME";

  var source = DriveApp.getFoldersByName(sourceFolder);
  var target = DriveApp.createFolder(targetFolder);

  if (source.hasNext()) {
    copyFolder(source.next(), target);
  }
}

function copyFolder(source, target) {

  var folders = source.getFolders();
  var files   = source.getFiles();

  while(files.hasNext()) {
    var file = files.next();
    file.makeCopy(file.getName(), target);
  }

  while(folders.hasNext()) {
    var subFolder = folders.next();
    var folderName = subFolder.getName();
    var targetFolder = target.createFolder(folderName);
    copyFolder(subFolder, targetFolder);
  }

}
