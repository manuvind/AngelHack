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

  	///
  	editor.getSession().on('change', function(e) {
    Files.update(Files.findOne({})._id, 
      { $set : 
        { 
          contents : editor.getValue()
        }
      })
	});
	///
  });//End Meteor.startup
}//End if

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Files.find().count() === 0) {
        Files.insert({name: "default", contents: "<Insert Content>"});
    }    
  });
}
