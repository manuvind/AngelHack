Files = new Meteor.Collection("files");
var editor;
if (Meteor.isClient) {
  Meteor.startup(function () 
  {
  	editor=ace.edit("editor");
    ///
    editor.setTheme('ace/theme/solarized_light');
	var query = Files.find({name : "default"});
	//alert(Files.findOne({})._id);
	handle = query.observe({        
	  	changed : function(newDoc, oldDoc) {
	      if(editor !== undefined){
	        editor.setValue("",1);
          editor.insert(newDoc.contents);
	      }
	    }
	});
}); //End Meteor.startup
Template.page.events({
  'keyup div.listener' : function () {
    var fHandle = Files.findOne({name : "default"});
    var fID;
    if (fHandle) {
      fID = fHandle._id;
    }
    if (fID) {
      Files.update(fID, 
      {name : "default", contents : editor.getValue()});
    }
  }
});
Template.buttons.events({
  'click input.sync' : function () {
    editor.setValue(Files.findOne({}).contents);
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
  docHandle.innerHTML += '<input class="btn fileButton ' + inp + '" type="button" value=' + inp + ' ></input>';
  $('#addButton').popover('hide');
  },
  'click #closeButton' : function () {
    $('#addButton').popover('hide');
  },

    //Languages
    'click #rubyButton' : function () {
      editor.getSession().setMode('ace/mode/ruby');
    },
    'click #javaButton' : function () {
      editor.getSession().setMode('ace/mode/java');
    },
    'click #javascriptButton' : function () {
      editor.getSession().setMode('ace/mode/javascript');
    },
    'click #phpButton' : function () {
      editor.getSession().setMode('ace/mode/php');
    },
    'click #sassButton' : function () {
      editor.getSession().setMode('ace/mode/sass');
    },
    //Themes
    // 'click #rubyButton' : function () {
    //   editor.getSession().setMode('ace/mode/ruby');
    // },
    // 'click #rubyButton' : function () {
    //   editor.getSession().setMode('ace/mode/ruby');
    // },
    // 'click #rubyButton' : function () {
    //   editor.getSession().setMode('ace/mode/ruby');
    // },
    // 'click #rubyButton' : function () {
    //   editor.getSession().setMode('ace/mode/ruby');
    // },

}); //End button events

// Template.filelist.events({
//   'mouseenter input.fileButton' : function () {
//     alert($('<div>').append($(this).clone()).html());
//   }
// });
///

}//End if

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Files.find().count() === 0) {
        Files.insert({name : "default", contents : "<Insert Content>"});
    }    
  });
}
