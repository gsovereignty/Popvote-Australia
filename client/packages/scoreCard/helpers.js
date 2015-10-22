Template.scoreCard.helpers ({
    politicians: function () {
        return Politicians.find({}, {});
    }

});