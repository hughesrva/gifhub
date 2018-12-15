// list of original buttons
var btnArr = ["cute", "nature", "animals", "memes", "explosions"];

// variable to get topic name on click
var topic = "";

var offset = 0;

function init() {

    // creates initial set of buttons
    for (i = 0; i < btnArr.length; i++) {

        // creates button for each array item
        var origBtn = $("<button></button>").text(btnArr[i]);
        // gives the button a data "topic"
        $(origBtn).data("topic", btnArr[i]);

        // gives button the queryBtn class
        $(origBtn).addClass("queryBtn");
        // appends the button to the button row
        $("#buttonCol").append(origBtn);
    }
}

$("body").on("click", ".queryBtn", function () {

    // assigns button's topic data to topic variable
    topic = $(this).data("topic");

    // adds topic to query URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        topic + "&api_key=P4vSC3J5v39fi3SldaPF0fllaAu1syxQ&limit=1&offset=" + offset;

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        // function to handle returned response
        .then(function (response) {
            offset++;
            console.log(response);
            var results = response.data;

            // creates new div for gif
            var newDiv = $("<div>");

            // adds <p> for the gif's rating
            var rating = $("<p>").text("Rating: " + results[0].rating);

            // creates image and assigns source to still image
            var newGif = $("<img>").attr("src", results[0].images.fixed_height_still.url);

            // gives div the unit class
            $(newDiv).addClass("unit");

            // gives image the gif class
            $(newGif).addClass("gif");

            // gives image a data "state"
            $(newGif).data("state", "still");

            // gives image a data "stilURL" of still image URL
            $(newGif).data("stillURL", results[0].images.fixed_height_still.url);

            // gives images a data "animURL" of animated image URL
            $(newGif).data("animURL", results[0].images.fixed_height.url);

            // appends p and img to div
            $(newDiv).append(rating);
            $(newDiv).append(newGif);

            // prepends div to row
            $("#gifColumn").prepend(newDiv);
            console.log(newGif.data("state"));
        });
});


// click function for submit button to create button
$("#submitBtn").on("click", function (event) {

    // allows enter to be used to submit
    event.preventDefault();

    var searchInput = $("#searchInput");
    var newQuery = $(searchInput).val();

    // creates button for each array item
    var newBtn = $("<button></button>").text(newQuery);

    // gives the button a data "topic"
    $(newBtn).data("topic", newQuery);

    // gives button the queryBtn class
    $(newBtn).addClass("queryBtn");

    // appends the button to the button row
    $("#buttonCol").append(newBtn);;

    // clears input field
    $(searchInput).val(null);
    $(".newQueryBtn").on("click", pullGif);
});

// gif click function to start or stop gifs
$("body").on("click", ".gif", function () {
    var state = $(this).data("state");
    if (state === "still") {
        $(this).attr("src", $(this).data("animURL"));
        $(this).data("state", "anim");
    }
    else if (state === "anim") {
        $(this).attr("src", $(this).data("stillURL"));
        $(this).data("state", "still");
    }
    // console.log($(this).data("state"));

});

$(document).ready(init);