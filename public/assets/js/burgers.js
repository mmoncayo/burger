$(function () {

    $(".create-form").on("submit", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#bur").val().trim(),
            devoured: $("[burger_name=devoured]:checked").val()
        };

        // send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("new burger CREATED");
                // re-load the page to get the updated list
                location.reload();
            }
        );
    });


    $(".change-devour").on("click", function (event) {
        var id = $(this).attr("data-id");
        var newDevour = $(this).attr("data-newdevour");
        console.log("sending id=" + id + " value=" + newDevour);

        var newDevourState = {
            devoured: newDevour
        };

        // send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        }).then(
            function () {
                console.log("burger has been: ", newDevour);
                // re-load the page to get the updated list
                location.reload();
            }
        );
    });
});