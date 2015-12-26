/* <3
 http://html5.litten.com/graphing-data-in-the-html5-canvas-element-part-iv-simple-pie-charts/
 */
Template.testchart.onRendered(function(){
    function noVotes(){
        var novotes = this.noVotes;
        var yesvotes = this.yesVotes;
        var total = novotes + yesvotes;
        var pc = novotes / total * 100;
        return Math.floor(pc);
    };
    function yesVotes(){
        var novotes = this.noVotes;
        var yesvotes = this.yesVotes;
        var total = novotes + yesvotes;
        var pc = yesvotes / total * 100;
        return Math.ceil(pc);
    };

    var nopc = noVotes();
    var yespc = yesVotes();
    alert(this.noVotes);
var myColor = ["#39ca74","#e54d42","#f0c330","#3999d8","#35485d"];
var myData = [yesVotes(),noVotes()];
var myLabel = ["YES","NO"];

function getTotal(){
    var myTotal = 0;
    for (var j = 0; j < myData.length; j++) {
        myTotal += (typeof myData[j] == 'number') ? myData[j] : 0;
    }
    return myTotal;
}

function plotData() {
    var canvas;
    var ctx;
    var lastend = 0;
    var myTotal = getTotal();
    var doc;
    canvas = document.getElementById("canvas");
    var x = (canvas.width)/2;
    var y = (canvas.height)/2;
    var r = 150;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < myData.length; i++) {
        ctx.fillStyle = myColor[i];
        ctx.beginPath();
        ctx.moveTo(x,y);
        ctx.arc(x,y,r,lastend,lastend+(Math.PI*2*(myData[i]/myTotal)),false);
        ctx.lineTo(x,y);
        ctx.fill();

        // Now the pointers
        ctx.beginPath();
        var start = [];
        var end = [];
        var last = 0;
        var flip = 0;
        var textOffset = 0;
        var precentage = (myData[i]/myTotal)*100;
        start = getPoint(x,y,r-20,(lastend+(Math.PI*2*(myData[i]/myTotal))/2));
        end = getPoint(x,y,r+20,(lastend+(Math.PI*2*(myData[i]/myTotal))/2));
        if(start[0] <= x)
        {
            flip = -1;
            textOffset = -110;
        }
        else
        {
            flip = 1;
            textOffset = 10;
        }
        ctx.moveTo(start[0],start[1]);
        ctx.lineTo(end[0],end[1]);
        ctx.lineTo(end[0]+120*flip,end[1]);
        ctx.strokeStyle = "#bdc3c7";
        ctx.lineWidth   = 2;
        ctx.stroke();
        // The labels
        ctx.font="17px Arial";
        ctx.fillText(myLabel[i]+" "+precentage.toFixed(2)+"%",end[0]+textOffset,end[1]-4);
        // Increment Loop
        lastend += Math.PI*2*(myData[i]/myTotal);

    }
}
// Find that magical point
function getPoint(c1,c2,radius,angle) {
    return [c1+Math.cos(angle)*radius,c2+Math.sin(angle)*radius];
}
// The drawing
plotData();

});


Template.stats_chart.onRendered(function () {
    new Chartist.Line('.ct-chart', {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        series: [
            [12, 9, 7, 8, 5],
            [2, 1, 3.5, 7, 3],
            [1, 3, 4, 5, 6]
        ]
    }, {
        fullWidth: true,
        chartPadding: {
            right: 40
        }
    });
});