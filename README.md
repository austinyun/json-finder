JSON-FINDER
===========

A small tool for finding JSON objects in strings. By default, returns the first
JSON object found, but can return all or an arbitrary number in an array.

Options
-------

```
DEFAULT: require("json-finder")();
-------------------------------------------------
callback(err, result, startIndex, endIndex)

err:        null if parse was successful
result:     the parsed JSON object
startIndex: index of the opening brace '{'
endIndex:   index of the closing brace '}'
```
---
```
ALL: require("json-finder")({"multiple": true});
SOME: require("json-finder")({"multiple": 5});
-------------------------------------------------

If you pass the option `{"multiple": true}`, it returns all JSON objects
found. You can pass an arbitrary integer to get back the first n occurences
of a JSON object.

callback(err, resultArray)

err: null if parse was successful
resultArray: contains one array per JSON object found
    [result, startIndex, endIndex]
```

Usage
-----

With default settings,
```javascript
var json-finder = require("json-finder")();

json-finder(string, function(err, result, startIndex, endIndex) {
    if (err) {
        // no JSON object found
    } else {
        console.log(Object.keys(result));
        // Print only the part after the JSON object
        console.log(string.slice(endIndex))
    }
}
```
---
```javascript
var json-finder = require("json-finder")({"multiple": true});

json-finder(string, function(err, resultArray) {
    if (err) {
        // no objects found
    } else {
        console.log(resultArray.length); // print how many objects were found
        console.log(resultArray[1][1]); // print the second object's start idx
    }
})
```

Algorithm Description
---------------------

Given a string (or buffer that can be toString()'d), and a callback,
looks for a JSON object by finding the first occurence of '{', and the
last occurence of '}', and calling JSON.parse on that substring.

If that doesn't work, find the next-to-last occurence of '}', and call
JSON.parse on that substring, until all closing brackets are exhausted.

If that doesn't work, repeat the process with the second occurence of '{',
etc., until all possibilities have been tried.

If no JSON object could be found, calls the callback with an error.

TODO
----

* Add tests
