//Function for Renaming files (names cannot be the same, default values..)
function renameFile($file,$scope) {
	var editing = false;
	angular.forEach($scope.currentFolder.myFiles, function(value,key) {
		if(!angular.equals($file, value)) {
			if($file.type === value.type && $file.name === value.name ) {
				//customAlert("Sorry!"," " + $file.type + " names cannot be the same","warning");
				editing = true;
			}
		}
	});
	if(editing == true) {
		var version = 1;
		var index = "";
		var ext = "";
		var fileName = $file.name;
		if($file.type == "File") {
			var index = $file.name.lastIndexOf('.');
			var ext = $file.name.slice(index,$file.name.length);
			var fileName = $file.name.slice(0,index);
			$file.name = fileName;
		}
		while(containsArrayItem($scope.currentFolder.myFiles,$file,ext)) {
				$file.name = fileName + " (" + version + ")";
				version++;
		}
		$file.name += ext;
		editing = false;
	} else if($file.type == "File")  {
		if($file.setName($file.name)) {
			editing = false;
		} else {
			customAlert("Failed!","You can only create .js , .php , .css and .html files","danger");
			editing = true;
		}
	}

	if(editing == false) sortFiles($scope.currentFolder.myFiles);
	return editing;
}

function containsArrayItem($array,$item,$ext) {
	var found = false;
	for(var i = 0; i < $array.length; i++) {
		if(!angular.equals($array[i], $item)) {
			var name = $item.name + $ext;
		    if ($array[i].name == name) {
		        found = true;
		    }
		}
	}
	return found;
}

function customAlert($title,$message,$type) {
	$("#customAlert").html();
	$("#customAlert").html("<div class='alert alert-"+$type+"'></div>");
  	$(".alert").html("<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a><strong>"+$title+"</strong> " + $message);
}

function sortFiles($array) {
	$array.sort(function(a, b){
	  return a.name.localeCompare(b.name)
	});
}