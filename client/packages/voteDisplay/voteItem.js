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
        Router.go('commentList', {_id: this._id});
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
    },
    voteDisplay: function() {if(Meteor.user() === null){return "block"} else if(Session.get("showVoted") !== true){
        {if(_.include(this.yesVoters, Meteor.userId())) {return "none"}
        else {if(_.include(this.noVoters, Meteor.userId())) {return "none"} else {return "block"}}
        }
    }},

    disabled: function() {if(Meteor.user()){return ""} else {return "disabled"}}

});

Template.voteItem.topGenresChart = function() {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: this.username + "'s top genres"
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'genre',
            data: [
                ['Adventure',   45.0],
                ['Action',       26.8],
                ['Ecchi',   12.8],
                ['Comedy',    8.5],
                ['Yuri',     6.2]
            ]
        }]
    };
};