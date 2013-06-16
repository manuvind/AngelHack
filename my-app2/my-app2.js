Files = new Meteor.Collection("files");
if (Meteor.isClient) {
  Meteor.startup(function () 
  {
  	var editor=ace.edit("editor");
 	var textarea = $('textarea[name="description"]');
	editor.getSession().setValue(textarea.val());
	editor.getSession().on('change', function(){textarea.val(editor.getSession().getValue());});
	
	var query = Files.find({_id : Session.get("files")});
	handle = query.observe({        
		changed : function(newDoc, oldIndex, oldDoc) 
		{
			if(editor !== undefined)
			{
				editor.setValue(newDoc.contents);
      		}
    	}
	});//end handle definition
	Template.editout.contents = function () {
		return "lol";
	}
  });//End Meteor.startup
}//End if

if (Meteor.isServer) {
  Meteor.startup(function () {
    
  });
}
