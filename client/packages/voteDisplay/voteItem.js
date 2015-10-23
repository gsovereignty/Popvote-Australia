Template.voteItem.events({
    'click .yesvote': function(e) {
        e.preventDefault();
        Meteor.call('voteYes', this._id);
    },

    'click .novote': function(e) {
        e.preventDefault();
        Meteor.call('voteNo', this._id);
    },

});

Template.voteItem.helpers({
    officialStatus: function(){
        if (this.isofficial === true) {
            return "(Official)";
        } else {}
    }
});

