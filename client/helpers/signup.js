Template.signup.rendered = function() {
    if(!this._rendered) {
        this._rendered = true;
        Session.set('aecinput', 'none');
        Session.set('aecconfirm', 'none');
        Session.set('aeciframe', 'block');
        Session.set('finalPage', 'none');

    }
}

Template.signup.events({
    'click #copied': function () {
       Session.set('aeciframe', 'none');
       Session.set('aecinput', 'block');
   },
    'click #p1': function () {
        Session.set('aeciframe', 'block');
        Session.set('aecinput', 'none');
    },

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

            Session.set('aecinput', 'none');
            Session.set('aecconfirm', 'block');



        }; } else {alert("The text you pasted did not contain the correct details. Please try again.")};


},
    'click #toLast': function () {
        Session.set('finalPage', 'block');
        Session.set('aecinput', 'none');
        Session.set('aecconfirm', 'none');
        Session.set('aeciframe', 'none');

    }
});

Template.signup.helpers({

    data: function (variable) {
    return Session.get(variable);
    },

    display: function(block) {
        return Session.get(block);
    }
});
