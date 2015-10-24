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
    },

    novotes: function () {

        var novotes = this.noVotes;
        var yesvotes = this.yesVotes;
        var total = novotes + yesvotes;
        return novotes / total * 100;
    },
    yesvotes: function () {

        var novotes = this.noVotes;
        var yesvotes = this.yesVotes;
        var total = novotes + yesvotes;
        return yesvotes / total * 100;
    }
});

