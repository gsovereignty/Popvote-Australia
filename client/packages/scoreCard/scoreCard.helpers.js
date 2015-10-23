Template.scoreCard.helpers ({
    politicians: function () {
        return Politicians.find({}, {});
    },

    indicated: function () {
        return Politicians.findOne({_id: this._id}, {});
    }

});