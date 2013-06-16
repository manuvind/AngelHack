Files = new Meteor.Collection("files");
if (Meteor.isClient) {
  Meteor.startup(function () {
  	var editor=ace.edit("editor");
 	var textarea = $('textarea[name="description"]');
	editor.getSession().setValue(textarea.val());
	editor.getSession().on('change', function(){
  	textarea.val(editor.getSession().getValue());
});
      });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    
  });
}
