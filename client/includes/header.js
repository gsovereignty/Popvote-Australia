Template.header.helpers({
    displayRegister: function () {
        if (Meteor.user().profile) {return "none";}
    }
})

Template.heading.helpers({
    heading: function () {
        return pageTitle;
    }
})