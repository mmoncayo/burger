// import express and the burger model (burger.js) to use its database functions
var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();

// creates all our routes and set up logic within those routes where needed
// route for selecting all entries
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// route for creating a new entry
router.post("/api/burgers", function (req, res) {
    burger.createOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function (result) {
        res.json({ id: result.insertId });
    });
});

// route for updating an entry
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.updateOne(
        {
            devoured: req.body.devoured
        },
        condition,
        function (result) {
            if (result.changedRows === 0) {
                // if no rows were changed, then the ID must not exist, so 404
                return res.status(404).end();
            }
            res.status(200).end();

        }
    );
});

// export routes for server.js to use.
module.exports = router;