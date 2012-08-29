// Based on ThiefMaster's code from StackOverflow
// http://stackoverflow.com/a/10574546/843854
//
// @param: string or buffer that may have a JSON object
// @return: an array [object, start index, end index]
//
// Throws an error if no object is found

module.exports = function extractJSON(str) {
    var firstOpen, firstClose, candidate, result;

    str = str.toString().trim();
    firstOpen = str.indexOf('{', firstOpen + 1);

    do {
        firstClose = str.lastIndexOf('}');

        // Terminal condition
        if (firstClose <= firstOpen) {
            throw new Error("No JSON object found");
        }

        do {
            candidate = str.substring(firstOpen, firstClose + 1);

            try {
                result = JSON.parse(candidate);
                return [result, firstOpen, firstClose + 1];
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
