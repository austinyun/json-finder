// Based on ThiefMaster's code from StackOverflow
// http://stackoverflow.com/a/10574546/298479
// @return: error, the JSON object, start index, end index

module.exports = function(input, callback) {
    var firstOpen, firstClose, candidate, result,
        str = input.toString().trim(),
        error = new Error("No JSON object found");

    firstOpen = str.indexOf('{', firstOpen + 1);

    do {
        firstClose = str.lastIndexOf('}');

        // Terminal condition, nothing found
        if (firstClose <= firstOpen) {
            callback(error, input);
        }

        do {
            candidate = str.substring(firstOpen, firstClose + 1);

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
            }

            firstClose = str.substr(0, firstClose).lastIndexOf('}');
        } while (firstClose > firstOpen);

        // If you get to this point, it means the first '{' is not part
        // of a JSON object, so move to the next occurence of '{'
        firstOpen = str.indexOf('{', firstOpen + 1);
    } while (firstOpen !== -1);
};
