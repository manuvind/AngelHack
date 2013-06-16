Files = new Meteor.Collection("files");
var editor;
if (Meteor.isClient) {
  Meteor.startup(function () 
  {
  	editor=ace.edit("editor");
    ///
	var query = Files.find({name : "default"});
	//alert(Files.findOne({})._id);
	handle = query.observe({        
	  	changed : function(newDoc, oldDoc) {
	      if(editor !== undefined){
	        editor.setValue(newDoc.contents);
	      }
	    }
	});
}); //End Meteor.startup
Template.buttons.events({
  'click input.sync' : function () {
    var fHandle = Files.findOne({name : "default"});
    var fID;
    if (fHandle) {
      fID = fHandle._id;
    }
    if (fID) {
      Files.update(fID, 
      {name : "default", contents : editor.getValue()});
    }
  },
  'click input.add' : function () {
    var docHandle = document.getElementById("file-group");
    docHandle.innerHTML += '<input class="btn" type="button" value="New Tab"></input>';
  }
});
	///

}//End if

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Files.find().count() === 0) {
        Files.insert({name : "default", contents : "<Insert Content>"});
    }    
  });
}
