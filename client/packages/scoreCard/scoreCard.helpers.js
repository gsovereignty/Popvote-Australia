Template.scoreCard.helpers ({
    politicians: function () {
        return Polivote.find();
    },

    indicated: function () {
        var max = Math.max(this.indicatedYes, this.indicatedNo, this.indicatedUnsure);
        var total = this.indicatedYes + this.indicatedNo + this.indicatedUnsure;
        var average = total / 3;
        if (this.indicatedYes === max && this.indicatedYes > average) {
            return "YES";
        } else if (this.indicatedNo === max && this.indicatedNo > average) {
            return "NO";
        } else if (this.indicatedUnsure === max && this.indicatedUnsure > average) {
            return "Undecided";
        } else {
            return "Not enough data";
        }},
    actual: function () {
        var max = Math.max(this.votedYes, this.votedNo, this.abstained);
        var total = this.votedYes + this.votedNo + this.abstained;
        var average = total / 3;
        if (this.votedYes === max && this.votedYes > average) {
            return "YES";
        } else if (this.votedNo === max && this.votedNo > average) {
            return "NO";
        } else if (this.abstained === max && this.abstained > average) {
            return "Undecided";
        } else {
            return "Not enough data";
        }
}});

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
    }});


