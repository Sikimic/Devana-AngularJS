function addServices(app) {
	app.service('sharedProperties', function () {
        var currentFolder = new Folder();
        var copy = null;

        return {
            getCurrentFolder: function () { return currentFolder; },
            setCurrentFolder: function(value) { currentFolder = value; },
            getCopy: function() { return copy; },
            Copy: function($file) { copy = $file; },
            addNewFile: function() {
            	var file = new File();
				file.parentFolder = currentFolder;
				currentFolder.myFiles.push(file);
				sortFiles(currentFolder.myFiles);
            },
            addNewFolder: function() {
            	var folder = new Folder();
				folder.parentFolder = currentFolder;
				currentFolder.myFiles.push(folder);
				sortFiles(currentFolder.myFiles);
            },
            Paste: function() {
            	var temp = currentFolder;
            	var success = true;
            	while(temp != null) {
            		if(angular.equals(temp,copy)) success = false;
            		temp = temp.parentFolder; 
            	}
            	if(success) {
	            	var f;
					if(copy.type == "Folder") f = new Folder(); 
					else {f = new File(); f.setName(copy.name)}
					angular.copy(copy,f);
					f.parentFolder = currentFolder;
					f.editing = true;
					currentFolder.myFiles.push(f);
				}
				return success;
            }
        };
    });
}