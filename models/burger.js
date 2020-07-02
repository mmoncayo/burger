const orm = require("../config/orm.js");

const burger = {
    selectAll: function (cb) {
        orm.selectAll("burgers", function (res) {
            cb(res);
        });
    },
    createOne: function (vals, cb) {
        orm.insertOne("burgers", "burger_name", vals, function (res) {
            cb(res);
        });
    },
    updateOne: function (objColVals, cb) {
        orm.updateOne("burgers", "devoured", objColVals, function (res) {
            cb(res);
        });
    }
};

module.exports = burger;