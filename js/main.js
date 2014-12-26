/**
 * Created by Cody on 12/25/2014.
 */

function mainController() {
    this.matcher = /^([\/\s\w]+).+[.](.+)/mg;
    this.matches = [];
    this.match = function(str) {
        var m;
        this.matches = [];
        while ((m = this.matcher.exec(str)) != null) {
            if (m.index === this.matcher.lastIndex) {
                this.matcher.lastIndex++;
            }
            var times = m[2].split("-");
            this.matches.push({name: m[1], start: times[0], end: times[1]});
        }
    };

    this.getOffsetPercent = function (match)
    {
        var start = match.start.replace(":", "");
        return Number(start) / 2400 * 100;
    };

    this.getTimePercent = function(match)
    {
        var start = Number(match.start.replace(":", ""));
        var end = Number(match.end.replace(":", ""));
        return (end-start) /2400 * 100;
    };


}


var app = angular.module("app", []);

app.controller("main", [function() {
    return new mainController();
}]);
