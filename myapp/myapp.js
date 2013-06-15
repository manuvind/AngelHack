Files = new Meteor.Collection("files");
if (Meteor.isClient) {
  Template.textinput.textstuff = function () {
    var currFile = Files.findOne({});
    return  currFile ? currFile.text : "";
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {

        Files.insert({name: "default", text: "new text"});
    
  });
}
