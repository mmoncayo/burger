// import MySQL connection.
const connection = require("../config/connection.js");
const { response } = require("express");

// helper function for SQL syntax 
// the below helper function loops through and creates an array of question marks and turns it into a string.
// ["?", "?"].toString() => "?,?"; --> but not used due to issues with MySQL syntax
function printQuestionMarks(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

// helper function to convert object key/value pairs to SQL syntax, but not used due to issues with MySQL syntax
function objToSql(ob) {
    let arr = [];
    // loop through the keys and push the key/value as a string int arr
    for (let key in ob) {
        let value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// object for all our SQL statement functions.
let orm = {
    selectAll: function (tableName, cb) {
        let queryString = "SELECT * FROM ??";
        let inserts = tableName
        connection.query(queryString, inserts, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function (tableName, cols, vals, cb) {
        let queryString = "INSERT INTO ?? (??) VALUES (?)";

        connection.query(queryString, [tableName, cols, vals], function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    // An example of objColVals would be {burger_name: spicy chicken sandwich, devoured: true}
    updateOne: function (tableName, col, vals, cb) {
        let queryString = "UPDATE ?? SET ?? = 1 WHERE id = ?";

        connection.query(queryString, [tableName, col, vals], function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
};

// exporting the ORM object in 'module.exports'
module.exports = orm;