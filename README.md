json-finder
===========

A small tool for finding JSON objects in strings.

Description
-----------

Given a string (or buffer that can be toString()'d), and a callback,
looks for a JSON object by finding the first occurence of '{', and the
last occurence of '}', and calling JSON.parse on that substring.

If that doesn't work, find the next-to-last occurence of '}', and call
JSON.parse on that substring, until all closing brackets are exhausted.

If that doesn't work, repeat the process with the second occurence of '{',
etc., until all possibilities have been tried.

If no JSON object could be found, calls the callback with an error and the
original string as parameters.

If a JSON object was found, calls the callback with null as the first param,
the parsed JSON object as the second param, the index of the opening brace of
the object in the string as the third param, and the index of the closing
brace as the fourth param.

```
callback(err, result, startIndex, endIndex)

err: null if parse was successful
result: the parsed JSON object
startIndex: index of the opening brace '{'
endIndex: index of the closing brace '}'
```

Usage
-----

```
var json-finder = require("json-finder");

json-finder(string, function(err, result, startIndex, endIndex) {
    if (err) {
        // no JSON object found
    } else {
        console.log(Object.prototype.keys(result));
        // Print only the part after the JSON object
        console.log(string.slice(endIndex))
    }
}
```

TODO
----

* Add tests
