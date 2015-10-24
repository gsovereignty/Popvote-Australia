Template.voteInspector.helpers({
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
})