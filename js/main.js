/**
 * Created by Cody on 12/25/2014.
 */
function MainController() {
    this.matcher = /^\W*([\/\s\w]+\w)[\W\s-.]+(\d+:\d+\w*[\W\s-.]+\d+:\d+\w*)/mg;
    this.matches = [];
    this.match = function(str) {
        var m;
        this.matches = [];
        var times;
        var start;
        var end;
        while ((m = this.matcher.exec(str)) !== null) {
            if (m.index === this.matcher.lastIndex) {
                this.matcher.lastIndex++;
            }

            times = m[2].replace(" ", "").split("-");
            start = this.getTimeNumber(times[0]);
            end = this.getTimeNumber(times[1]);

            if (start > 1800 && end < 200) end += 2400;
            if (end < start) end += 1200;


            this.matches.push(
                {
                    name: m[1],
                    string: m[1] + " " + times[0] + " - " + times[1],
                    start: start,
                    end: end
                }
            );

        }
    };

    this.getTimeNumber = function (str) {
        var time = str.replace(/(am)/gi, "");
        var isPm = false;
        time = time.replace(":", "");
        if (time.toLowerCase().indexOf("pm") > -1)
        {
            time = time.replace(/(pm)/gi, "");
            isPm = true;
        }
        var rawTimeNumber = Number(time);
        return isPm ? rawTimeNumber + 1200 : rawTimeNumber;
    };

    this.checkOverlap = function (match)
    {
        var otherMatches =_.without(this.matches, match);
        return _.reduce(otherMatches, function (memo, obj) {
            var overlaps = (match.start >= obj.start && match.start <= obj.end) ||
                (obj.start >= match.start && obj.start <= match.end);

            return (memo) ? (memo) : (overlaps);
        }, false);
    };

    this.getOffsetPercent = function (match)
    {
        return match.start / 2510 * 100;
    };

    this.getTimePercent = function(match)
    {
        return (match.end-match.start) / 2510 * 100;
    };


}


var app = angular.module("app", []);

app.controller("main", [function() {
    return new MainController();
}]);
