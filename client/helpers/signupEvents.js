
Template.signup.events({

    'submit form': function(e) {
        e.preventDefault();
        var textdata = $(e.target).find('[name=usertext]').val();
        if (textdata.indexOf("Given names") >=0){

        var string = textdata.split("\n").join(",");
        var arraylist = string.split(",");
        for (var i = 0; i < arraylist.length; i++) {

            if(arraylist[i].indexOf('Given names') >= 0){
                var temp = arraylist[i].split(":");
                Session.set('givenName', temp[1].trim());
            };
            if(arraylist[i].indexOf('Family') >= 0){
                var temp = arraylist[i].split(":");
                Session.set('familyName', temp[1].trim());
            };
            if(arraylist[i].indexOf('Locality') >= 0){
                var temp = arraylist[i].split(":");
                Session.set('locality', temp[1].trim());
            };
            if(arraylist[i].indexOf('Federal Division') >= 0){
                var temp = arraylist[i].split(":");
                Session.set('federalDivision', temp[1].trim());
            };
            if(arraylist[i].indexOf('Local Government') >= 0){
                var temp = arraylist[i].split(":");
                Session.set('localCouncil', temp[1].trim());
            };
            if(arraylist[i].indexOf('State District') >= 0){
                var temp = arraylist[i].split(":");
                Session.set('stateDistrict', temp[1].trim());
            };
            if(arraylist[i].indexOf('Ward') >= 0){
                var temp = arraylist[i].split(":");
                Session.set('ward', temp[1].trim());
            };



        }; } else {alert("The text you pasted did not contain the correct details. Please try again.")};


}})

Template.signup.helpers({
data: function (variable) {
    return Session.get(variable);
}

})
