var cities = [];

$("#Search-Btn").on("click", function (event) {
  event.preventDefault();

  var city = $("#city-Search").val().trim();

  cities.push(city);

  renderForecast();
});
function renderForecast() {
  $("#weather-Data").empty();
  $("#icon").empty();
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
  var cityName = $("#city-Search").val().trim();
  // Here we are building the URL we need to query the database
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast/daily?q=" +
    cityName +
    "&units=imperial" +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    var weatherIcon = $("<img>")
      .attr(
        "src",
        "https://openweathermap.org/img/wn/" +
          response.list[0].weather[0].icon +
          "@2x.png"
      )
      .attr("alt", "Weather Icon")
      .addClass("is-pulled-left");
    $("#city-Name").html("<strong>" + response.city.name + "</strong>");

    weatherIcon.appendTo("#icon");

    // var tempF = (response.list[0].feels_like.day - 273.15) * 1.8 + 32;

    $("<li>")
      .text("Temperature (F): " + response.list[0].feels_like.day)
      .appendTo("#weather-Data");
    $("<li>")
      .text("Humidity: " + response.list[0].humidity + "%")
      .appendTo("#weather-Data");
    $("<li>")
      .text("Wind Speed: " + response.list[0].speed + "MPH")
      .appendTo("#weather-Data");
    uvIndex(response);
    renderButtons();
  });
}
function uvIndex(res) {
  var apiKey = "166a433c57516f51dfab1f7edaed8413";
  var queryURL2 =
    "http://api.openweathermap.org/data/2.5/uvi?lat=" +
    res.city.coord.lat +
    "&lon=" +
    res.city.coord.lon +
    "&appid=" +
    apiKey;
  $.ajax({
    url: queryURL2,
    method: "GET",
  }).then(function (response) {
    $("<li>")
      .text("Uv Index: " + response.value)
      .addClass("UV")
      .appendTo("#weather-Data");
  });
}
function renderButtons() {
  $("#Search-History").empty();

  for (var i = 0; i < cities.length; i++) {
    var a = $("<button>");
    var li = $("<li>");

    a.attr("data-name", cities[i]);

    a.text(cities[i]);

    a.addClass("button is-dark is-rounded");

    li.append(a);

    $("#Search-History").append(li);
  }
}
