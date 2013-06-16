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
  'mouseenter #addButton' : function () {
    $('#addButton').popover({
      html : true,
      content : function () {
        return $('#popover_content_wrapper').html();
      }
    });
    },
    'click #createButton' : function () {
      var docHandle = document.getElementById("file-group");
      var inp = $('#newFileText').val();
      docHandle.innerHTML += '<input class="btn ' + inp + '" type="button" value=' + inp + ' ></input>';
      $('#addButton').popover('hide');
    },
    'click #closeButton' : function () {
      $('#addButton').popover('hide');
    }
}); //End button events

Template.filelist.events({
  'mouseenter input.file' : function () {
    //$('.input.file').addClass('btn-danger');
    
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
