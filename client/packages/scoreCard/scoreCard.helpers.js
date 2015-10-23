Template.scoreCard.helpers ({
    politicians: function () {
        return Polivote.find({voteId: this._id}, {});
    },

    indicated: function () {
        var max = Math.max(this.indicatedFor, this.indicatedAgainst, this.indicatedUnsure);
        var total = this.indicatedFor + this.indicatedAgainst + this.indicatedUnsure;
        var average = total / 3;
        if (this.indicatedFor === max && this.indicatedFor > average) {
            return "YES";
        } else if (this.indicatedAgainst === max && this.indicatedAgainst > average) {
            return "NO";
        } else if (this.indicatedUnsure === max && this.indicatedUnsure > average) {
            return "Undecided";
        } else {
            return "Not enough data";
        }},
    actual: function () {
        var max = Math.max(this.votedFor, this.votedAgainst, this.abstained);
        var total = this.votedFor + this.votedAgainst + this.abstained;
        var average = total / 3;
        if (this.votedFor === max && this.votedFor > average) {
            return "YES";
        } else if (this.votedAgainst === max && this.votedAgainst > average) {
            return "NO";
        } else if (this.abstained === max && this.abstained > average) {
            return "Abstained";
        } else {
            return "Not enough data";
        }
},
    display: function(){
        var max = Math.max(this.votedFor, this.votedAgainst, this.abstained, this.indicatedFor, this.indicatedAgainst, this.indicatedUnsure);
        if (this.flags > 3 && this.flags > max) {
            return "none";
        } else {}
    }
});

Template.scoreCard.events ({
    'submit form': function(e, template) {
        e.preventDefault();
        var polivote = {
            name: $(e.target).find('[name=name]').val(),
            voteId: this._id
        };

        Meteor.call('polivoteInsert', polivote, function(error, result) { // display the error to the user and abort
            if (error)
                return alert(error.reason);
        });

        event.target.name.value = "";
    },
    'click .indFor': function () {
        Meteor.call('indFor', this._id);
    },
    'click .indAgainst': function () {
        Meteor.call('indAgainst', this._id);
    },
    'click .indUnsure': function () {
        Meteor.call('indUnsure', this._id);
    },
    'click .actFor': function () {
        Meteor.call('actualFor', this._id);
    },
    'click .actAgainst': function () {
        Meteor.call('actualAgainst', this._id);
    },
    'click .flag': function () {
        Meteor.call('flag', this._id);
    }

});