//Addiing controllers for the module
function addControllers(app) {
	//Home Controller, displays items.
	app.controller("HomeController",["$scope","sharedProperties",function($scope,sharedProperties) {
		$scope.currentFolder = sharedProperties.getCurrentFolder();
		$scope.menuOptions = [
	          ['New Folder', function ($item) { sharedProperties.addNewFolder(); }],
	          null,
	          ['New File', function ($item) { sharedProperties.addNewFile(); }],
	          null,
	          ['Paste', function ($item) { 
	          	if(!sharedProperties.Paste()) customAlert("Failed!","The destination folder is a subfolder of the source folder","danger"); 
	          },
	          function($item){ return (sharedProperties.getCopy() != null) ? true : false; }]
      	];
      	$scope.setSelected = function($file) { $scope.selected = $file; }
		$scope.isSelected = function($file) { return $scope.selected === $file; }
		$scope.isFile = function($file) { return ($file.type == "File" ? true : false);}
		$scope.isFolder = function($folder) { return ($folder.type == "Folder" ? true : false);}
	}]);
	//File Controller, deletes, hides, manages files.
	app.controller("FileController",["$scope","sharedProperties",function($scope,sharedProperties) {
		$scope.folderNavigation = [];
		$scope.menuOptions = [
			['Open', function ($item) { $scope.enterFolder($item.folder) }],
			null,
			['Copy', function ($item) { $scope.Copy($item.folder); }],
			null,
			['Cut', function ($item) { $scope.Copy($item.folder); $scope.Delete($item.folder); }],
			null,
			['Delete', function ($item) { $scope.Delete($item.folder); }],
			null,
			['Rename', function ($item) { $item.folder.editing = true; }]
      	];
      	$scope.menuOptionsFile = [
			['Copy', function ($item) { $scope.Copy($item.file); }],
			null,
			['Cut', function ($item) { $scope.Copy($item.file); $scope.Delete($item.file) }],
			null,
			['Delete', function ($item) { $scope.Delete($item.file); }],
			null,
			['Rename', function ($item) { $scope.editName($item.file); }]
      	];
		$scope.Delete = function($file) {
			sharedProperties.getCurrentFolder().myFiles.splice(sharedProperties.getCurrentFolder().myFiles.indexOf($file), 1);
		}
		$scope.leaveFolder = function() {
			var currentFolder = sharedProperties.getCurrentFolder();
			if(currentFolder.parentFolder != null) {
				$scope.setSelected(currentFolder);
				sharedProperties.setCurrentFolder(currentFolder.parentFolder);
				$scope.folderNavigation.splice(-1,1);
				$scope.currentFolder = sharedProperties.getCurrentFolder();
			} 
		}
		$scope.enterFolder = function($file) {
			$scope.folderNavigation.push(" > " + $file.name);
			sharedProperties.setCurrentFolder($file);
			$scope.currentFolder = sharedProperties.getCurrentFolder();
		}
		$scope.addFolder = function() { sharedProperties.addNewFolder($scope); }
		$scope.addFile = function() { sharedProperties.addNewFile($scope); }
		$scope.Copy = function($file) {  sharedProperties.Copy($file); }
		$scope.doneEditing = function($file) { $file.editing = renameFile($file,$scope); }
		$scope.editName = function($file) { $file.editing = true; }
	}]);
}