var Schemas = {};

Schemas.VotesCollection = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 360
    },
    jurisdiction: {
        type: String,
        label: "Jurisdiction",
        max: 40
    },
    officiallink: {
        type: String,
        label: "Official Link",
        max: 200,
        optional: true
    },
    problem: {
        type: String,
        label: "Problem",
        max: 2000,
        optional: true
    },
    votebody: {
        type: String,
        label: "Problem",
        max: 10000,
        optional: true
    },
    userID: {
        type: String,
        label: "User ID",
        optional: true
    },
    author: {
        type: String,
        label: "Username",
        max: 20
    },
    submitted: {
        type: Date,
        label: "Submit Date"
    }

});

VotesCollection.attachSchema(Schemas.VotesCollection);