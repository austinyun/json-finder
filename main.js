// Based on ThiefMaster's code from StackOverflow
// http://stackoverflow.com/a/10574546/843854
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
                result = JSON.parse(candidate);
                callback(null, result, firstOpen, firstClose + 1);
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
