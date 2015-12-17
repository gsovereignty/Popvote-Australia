Template.voteItem.events({
    'click .yesvote': function(e) {
        e.preventDefault();
        Meteor.call('voteYes', this._id, function(error, result) {if (error) {sAlert.error(error.reason)} else {sAlert.info('Your vote has been recorded', {})}});
    },

    'click .novote': function(e) {
        e.preventDefault();
        Meteor.call('voteNo', this._id, function(error, result) {if (error) {sAlert.error(error.reason)} else {sAlert.info('Your vote has been recorded', {})}});
    },
    'click .comments': function() {
        alert("boo");
    }

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
        var pc = novotes / total * 100;
        return Math.floor(pc);
    },
    yesvotes: function () {

        var novotes = this.noVotes;
        var yesvotes = this.yesVotes;
        var total = novotes + yesvotes;
        var pc = yesvotes / total * 100;
        return Math.ceil(pc);
    }
});

