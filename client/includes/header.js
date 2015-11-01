Template.header.helpers({
    displayRegister: function () {
        if (Meteor.user().profile) {return "none";}
    }
})