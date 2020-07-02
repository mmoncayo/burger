// import express and the burger model (burger.js) to use its database functions
const express = require("express");
const burger = require("../models/burger.js");
const router = express.Router();

// creates all our routes and set up logic within those routes where needed
// route for selecting all entries

router.get("/", (req, res) => {
    burger.selectAll((data) => {
        let burgers = data.map(({ burger_name, id, devoured }) => ({
            burger_name: burger_name,
            id: id,
            devoured: devoured
        }));

        let burgerObject = { burgers: burgers };
        console.log(burgerObject);
        res.render("index", burgerObject);
    });
});

// route for creating a new entry
router.post("/api/new", (req, res) => {
    let burgerName = req.body.burger_name;

    burger.createOne(burgerName, (result) => {
        res.json( { id: result.insertId } );
    });
});

// route for updating an entry
router.put("/api/burgers/:id", (req, res) => {
    let devouredID = req.params.id;
    console.log("condition: ", devouredID);
    burger.updateOne(devouredID, (result) => {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    })
    console.log(devouredID, " has been devoured");

});

// export routes for server.js to use.
module.exports = router;