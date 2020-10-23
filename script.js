var cities = [];
var cityName = "";

function inIt() {
  var storedCity = localStorage.getItem("city-Weather");

  if (storedCity !== null) {
    cityName = storedCity;
  }
  renderForecastOne(storedCity);
}

$("#Search-Btn").on("click", function (event) {
  event.preventDefault();

  var city = $("#city-Search").val().trim();

  cities.push(city);

  localStorage.setItem("city-Weather", city);

  renderButtons();
  renderForecastTwo();
});
function weatherDetails(response) {
  $("#weather-Data").empty();
  $("#icon").empty();

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

  $("<li>")
    .text("Temperature (F): " + response.list[0].main.temp)
    .appendTo("#weather-Data");
  $("<li>")
    .text("Humidity: " + response.list[0].main.humidity + "%")
    .appendTo("#weather-Data");
  $("<li>")
    .text("Wind Speed: " + response.list[0].wind.speed + "MPH")
    .appendTo("#weather-Data");
  uvIndex(response);
}
function uvIndex(res) {
  var apiKey = "6f26d796a5c1f84b9d55ebd0979da856";
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
      .html("Uv Index: " + "<button id = 'UV'>" + response.value + "</button>")
      .appendTo("#weather-Data");

    if (response.value <= 2) {
      $("#UV").addClass("button is-success");
    }
    if (response.value >= 3 || response.value <= 7) {
      $("#UV").addClass("button is-warning");
    }
    if (response.value >= 8) {
      $("#UV").addClass("button is-danger");
    }
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
function renderForecastOne(storedCity) {
  cityName = storedCity;
  $("#weather-Data").empty();
  $("#icon").empty();
  var APIKey = "6f26d796a5c1f84b9d55ebd0979da856";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial" +
    "&appid=" +
    APIKey;
  console.log(cityName);
  console.log(queryURL);

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

    $("<li>")
      .text("Temperature (F): " + response.list[0].main.temp)
      .appendTo("#weather-Data");
    $("<li>")
      .text("Humidity: " + response.list[0].main.humidity + "%")
      .appendTo("#weather-Data");
    $("<li>")
      .text("Wind Speed: " + response.list[0].wind.speed + "MPH")
      .appendTo("#weather-Data");
    uvIndex(response);
    fiveDayForecast(response);
  });
}
function renderForecastTwo() {
  cityName = $("#city-Search").val().trim();
  $("#weather-Data").empty();
  $("#icon").empty();
  var APIKey = "6f26d796a5c1f84b9d55ebd0979da856";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial" +
    "&appid=" +
    APIKey;
  console.log(cityName);
  console.log(queryURL);

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

    $("<li>")
      .text("Temperature (F): " + response.list[0].main.temp)
      .appendTo("#weather-Data");
    $("<li>")
      .text("Humidity: " + response.list[0].main.humidity + "%")
      .appendTo("#weather-Data");
    $("<li>")
      .text("Wind Speed: " + response.list[0].wind.speed + "MPH")
      .appendTo("#weather-Data");
    uvIndex(response);
    fiveDayForecast(response);
  });
}
function renderForecast() {
  var cityName = $(this).attr("data-name");
  var APIKey = "6f26d796a5c1f84b9d55ebd0979da856";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&units=imperial" +
    "&appid=" +
    APIKey;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#weather-Data").empty();
    $("#icon").empty();

    weatherDetails(response).appendTo($("#weather-Data"));
    fiveDayForecast(response);

    console.log(response);
  });
}
function fiveDayForecast(res) {
  $("#date0").empty();
  $("#icon0").empty();
  $("data0").empty();
  $("#date1").empty();
  $("#icon1").empty();
  $("data1").empty();
  $("#date2").empty();
  $("#icon2").empty();
  $("data2").empty();
  $("#date3").empty();
  $("#icon3").empty();
  $("data3").empty();
  $("#date4").empty();
  $("#icon4").empty();
  $("data4").empty();

  $("#date0").text(res.list[0].dt_txt);
  $("<img>")
    .attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        res.list[0].weather[0].icon +
        "@2x.png"
    )
    .attr("alt", "Weather Icon")
    .appendTo("#icon0");
  $("<li>")
    .text("Temp: " + res.list[0].main.temp)
    .appendTo("#data0");
  $("<li>")
    .text("Humidity: " + res.list[0].main.humidity + "%")
    .appendTo("#data0");

  $("#date1").text(res.list[6].dt_txt);
  $("<img>")
    .attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        res.list[6].weather[0].icon +
        "@2x.png"
    )
    .attr("alt", "Weather Icon")
    .appendTo("#icon1");
  $("<li>")
    .text("Temp: " + res.list[6].main.temp)
    .appendTo("#data1");
  $("<li>")
    .text("Humidity: " + res.list[6].main.humidity + "%")
    .appendTo("#data1");

  $("#date2").text(res.list[14].dt_txt);
  $("<img>")
    .attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        res.list[14].weather[0].icon +
        "@2x.png"
    )
    .attr("alt", "Weather Icon")
    .appendTo("#icon2");
  $("<li>")
    .text("Temp: " + res.list[14].main.temp)
    .appendTo("#data2");
  $("<li>")
    .text("Humidity: " + res.list[14].main.humidity + "%")
    .appendTo("#data2");

  $("#date3").text(res.list[22].dt_txt);
  $("<img>")
    .attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        res.list[22].weather[0].icon +
        "@2x.png"
    )
    .attr("alt", "Weather Icon")
    .appendTo("#icon3");
  $("<li>")
    .text("Temp: " + res.list[22].main.temp)
    .appendTo("#data3");
  $("<li>")
    .text("Humidity: " + res.list[22].main.humidity + "%")
    .appendTo("#data3");

  $("#date4").text(res.list[30].dt_txt);
  $("<img>")
    .attr(
      "src",
      "https://openweathermap.org/img/wn/" +
        res.list[30].weather[0].icon +
        "@2x.png"
    )
    .attr("alt", "Weather Icon")
    .appendTo("#icon4");
  $("<li>")
    .text("Temp: " + res.list[30].main.temp)
    .appendTo("#data4");
  $("<li>")
    .text("Humidity: " + res.list[30].main.humidity + "%")
    .appendTo("#data4");
}
inIt();
$(document).on("click", ".button", renderForecast);
