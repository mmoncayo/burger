const addBtn = $("#submitBtn");
const devourBtn = $("#devourBtn");

$(function () {
    // adds a new burger when you click on submit
    $(".addBurger").on("submit", (event) => {
        event.preventDefault();
        let newBurger = {
            burger_name: $("#burger").val().trim()
        }
        console.log(newBurger);

        // this ensures the new burger name isn't an empty string
        if (newBurger.burger_name != "") {
            // make a POST api request to add a new burger to the db
            $.ajax("/api/new", {
                type: "POST",
                data: newBurger
            })
                .then(() => {
                    console.log("New burger added!");
                    location.reload();
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error! Please check the code, burger couldn't be added to the list.");
                })
            // alert user if the entry to submit a burger name was null
        } else { alert("Error! You must give the burger a name.") }
    });

    // 'devour' the burger and move it to devoured burgers list
    $(".devourBtn").on("click", (event) => {
        let clickedId = event.target.id;
        $.ajax(`/api/burgers/${clickedId}`, {
            type: "PUT",
        })
            .then(() => {
                console.log("A burger was devoured!");
                location.reload();
            })
    })

})