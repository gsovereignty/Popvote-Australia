var Schemas = {};

Schemas.VotesCollection = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 360
    },
    author: {
        type: String,
        label: "Author" //Replace with Username
    },
    scope: {
        type: String,
        label: "Scope of the vote",
        max: 20 //To specify: Council Name, State Name (NSW, VIC...), Federal
    },
    
    creationdate: {
        type: Date,
        label: "Date the vote was created"
    }
});

VotesCollection.attachSchema(Schemas.VotesCollection);