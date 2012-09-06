// Based on ThiefMaster's code from StackOverflow
// http://stackoverflow.com/a/10574546/298479
var _ = require("underscore");

function attemptParse(open, close, str) {
    try {
        return JSON.parse(str.substring(open, close + 1));
    } catch (e) {
        return false;
    }
}

module.exports = function(optsArg) {
    var defaultOpts = {
        "multiple": false,
        "error": new Error("No JSON object found")
    }, opts = _.extend(defaultOpts, optsArg);

    function recur(open, close, str, acc, cb) {
        var candidate;

        // TERMINAL CONDITIONS -----------------------------------------------
        if ((open === -1) || (close <= open)) {
            if (acc && acc.length === 0) { // nothing found
                return cb(opts.error);
            }
            return cb(null, acc); // Finished searching
        }

        candidate = attemptParse(open, close, str);
        if (candidate) {
            // With default options we're done here.
            if (opts.multiple === false) {
                return cb(null, candidate, open, close + 1);
            }

            acc.push([candidate, open, close + 1]);

<<<<<<< HEAD
            // Terminate based on the "multiple" option
            if (opts.multiple === acc.length) {
                return cb(null, acc);
=======
            try {
                // Have to put the return in otherwise it will callback
                // multiple times for every valid object it finds, including
                // {}, which I don't want.
                // TODO: make result an array of valid JSON objects and return
                //       result at the end?
                result = JSON.parse(candidate);
                return callback(null, result, firstOpen, firstClose + 1);
            } catch (e) {
                // Do nothing
>>>>>>> 751c1fbb5bf3a41cd5b1b781ed56e60ff49ea834
            }

            recur(str.indexOf("{", open + 1),
                    str.lastIndexOf("}"), str, acc, cb);
        } else {
            recur(open, str.substr(0, close).lastIndexOf("}"), str, acc, cb);
        }
    }

    return function(str, callback) {
        recur(str.indexOf("{"), str.lastIndexOf("}"), str, [], callback);
    };
};
