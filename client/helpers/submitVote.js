Template.submitVote.rendered = function() {
    if(!this._rendered) {
        this._rendered = true;
        Session.set('official', 'none');
        Session.set('notofficial', 'none');
        Session.set('officialandunofficial', 'none');
        Session.set('aeciframe', 'block');
        Session.set('juris', 'waiting for your selection');
        Session.set('voteofficial', 'Waiting for your selection');
        Session.set('titleplaceholder', '');
        Session.set('linkplaceholder', '');
        Session.set('detailsplaceholder', '');
        //INITIALIZE BUTTONS
        Session.set('stateButton', 'btn-default');
        Session.set('councilButton', 'btn-default');
        Session.set('parliamentButton', 'btn-default');

    }
};

Template.submitVote.events({
    'click #parliament': function () {
        Session.set('juris', 'The Australian Nation');
        Session.set('officialandunofficial', 'block');
        Session.set('parliamentButton', 'btn-primary');
        Session.set('stateButton', 'btn-default');
        Session.set('councilButton', 'btn-default');
    },
    'click #mystate': function () {
        Session.set('juris', 'myState'); //replace with this.userID.profile.state or something
        Session.set('officialandunofficial', 'block');
        Session.set('stateButton', 'btn-primary');
        Session.set('parliamentButton', 'btn-default');
        Session.set('councilButton', 'btn-default');
    },
    'click #mycouncil': function () {
        Session.set('juris', 'myCouncil'); //replace with this.userID.profile.council or something
        Session.set('officialandunofficial', 'block');
        Session.set('councilButton', 'btn-primary');
        Session.set('parliamentButton', 'btn-default');
        Session.set('stateButton', 'btn-default');
    },
    'click #official': function () {
        //DISPLAY AND HIDE FIELDS
        Session.set('official', 'block');
        Session.set('notofficial', 'none');
        Session.set('officialandunofficial', 'block');
        //PLACEHOLDER TEXT FOR FIELDS
        Session.set('voteofficial', 'OK, please input the official data below!');
        Session.set('titleplaceholder', 'Please paste the official bill or council motion name here');
        Session.set('linkplaceholder', 'Please paste a link to the offical bill or council motion here');
        Session.set('detailsplaceholder', 'Please paste an official summary here');
        //METADATA
        Session.set('isofficial', true);
        official = true;

    },
    'click #unofficial': function () {
        //PLACEHOLDER TEXT FOR FIELDS
        Session.set('titleplaceholder', 'Please state the issue you want people to vote on');
        Session.set('voteofficial', 'OK, create your new vote below!');
        Session.set('detailsplaceholder', 'Please describe exactly what people are choosing between when voting');
        //DISPLAY AND HIDE FIELDS
        Session.set('notofficial', 'block');
        Session.set('official', 'none');
        Session.set('officialandunofficial', 'block');
        //METADATA
        Session.set('isofficial', false);
        official = false;

    },
    'submit form': function(e) {
    e.preventDefault();
    var vote = {
        title: $(e.target).find('[name=title]').val(),
        jurisdiction: $(e.target).find('[name=jurisdiction]').val(),
        officiallink: $(e.target).find('[name=officiallink]').val(),
        problem: $(e.target).find('[name=problem]').val(),
        votebody: $(e.target).find('[name=votebody]').val(),
        isofficial: official

    };

    Meteor.call('voteInsert', vote, function(error, result) { // display the error to the user and abort
        if (error)
            return alert(error.reason);
        Router.go('voteInfoPage', {_id: result._id});
    });



}
});


Template.submitVote.helpers({

    data: function (variable) {
        return Session.get(variable);
    },

    display: function(block) {
        return Session.get(block);
    }
});