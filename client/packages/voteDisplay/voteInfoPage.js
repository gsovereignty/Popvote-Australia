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
    },
    displaylink: function () {
        if (this.officialLink === "") {return "none"}
    },
    displaydetails: function () {
        if (this.voteBody === "") {return "none"}
    },
    displayproblem: function () {
        if (this.problem === "") {return "none"}
    }
})