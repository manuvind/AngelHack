Files = new Meteor.Collection("files");
if (Meteor.isClient) {
  Template.textinput.textstuff = function () {
    var currFile = Files.findOne({});
    alert(currFile.text);
    return  currFile.text;
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        window.alert("PORKCHOP SANDWICHES")
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {

        Files.insert({name: "default", text: "timmy"});
    
  });
}
