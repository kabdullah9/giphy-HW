$("#addAnimal").click(function () {

    var btnTxt = $("#animal-input").val();

    if (btnTxt === "") {
        $("#animal-input").focus();
    } else {

        var newbtn = $("<button class='creatureBtn'>");
        newbtn.attr("value", btnTxt);
        newbtn.text(btnTxt);
        $("#animalSwitch").append(newbtn);
        $("#animal-input").val("");
        $("#animal-input").focus();
    }
    return false;
})

$("#animalSwitch").on("click", "button", function (res) {
    var apikey = "pFRLCyxP5qtTWZIgS7hQOwUF5XpTB1UI";
    var host = "api.giphy.com";
    var path = "/v1/gifs/search";
    var fullpath = "https://" + host + path;
    var limit = 10;
    var search = this.value;
    fullpath = fullpath + "?api_key=" + apikey;
    fullpath = fullpath + "&q=" + search;
    fullpath = fullpath + "&limit=" + limit;


    $.ajax({
        "url": fullpath,
        "method": "GET"
    }).then(function (response) {

        for (var i = 0; i < response.data.length; i++) {
            console.log(response);
            console.log(response.data[i].images.downsized_still.url);
            console.log(response.data[i].images.downsized.url);
            console.log(response.data[i].rating);
            console.log(response.data[i].title);

            var newImage = $("<img>");
            newImage.attr("src", response.data[i].images.fixed_height_still.url);
            newImage.attr("data-path", response.data[i].images.fixed_height.url);
            newImage.attr("status", "still");
            newImage.attr("status", "animate");
            var ratingDiv = $("<div>");
            ratingDiv.text(response.data[i].rating);
            var titleDiv = $("<div>");
            titleDiv.text(response.data[i].title);
            
            $("#animals").prepend("<br> <b>Title:</b> ",titleDiv);
            $("#animals").prepend("<br> <b>Rating:</b> ",ratingDiv);
            $("#animals").prepend(newImage);
        }

    });

});
// was not sure what to input for this onclick i think it had something to do with fixed_height and fixed_height_still
// thought i almost had it but i ran out of time
$("<img>").on("click", function() {
    var state = $(this).attr("data-path");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-path", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-path", "still");
    }
  });