class Folder {
	constructor() {
		this.name = "New Folder";
		this.img = "folder.png";
		this.hidden = false;
		this.editing = true;
		this.selected = false;
		this.myFiles = [];
		this.type = "Folder";
		this.parentFile = null;
	}
}


class File extends Folder {
	constructor() {
		super();
		this.name = "File.js"
		this.type = "File";
		this.img = "js.png"
	}

	setName(name) {
		var ind = name.lastIndexOf('.');
		var ext = name.slice(ind,name.lenght);
		if(ext == ".js" || ext == ".css" || ext == ".html" || ext == ".php") {
			this.name = name;
			this.setImg(ext);
			return true;
		}
		else return false;
	}

	setImg(ext) {
		this.img = ext.slice(1,ext.lenght) + ".png";
	}
}