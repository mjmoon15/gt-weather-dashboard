$(document).ready(function () {
  var apiKey = "6fff619b5618a83197c30e7fdabe0ad8";

  // GIVEN a weather dashboard with form inputs
  // WHEN I search for a city
  // THEN I am presented with current and future conditions for that city and that city is added to the search history

  function getStored() {
    //pulls info from local
    var storedSearch = window.localStorage.getItem("city");
    //if stored array is empty
    if (storedSearch == null) {
      storedSearch = "[]";
    }
    //parsing json stored array data
    storedSearch = JSON.parse(storedSearch);
    //return stored search
    return storedSearch;
  }

  //displays last searched city on page load
  var storedSearch = getStored();
  var lastCity = storedSearch[0];
  $("#city").val(lastCity);
  window.onload = function (event) {
    if (lastCity) {
      event.preventDefault();
      currentForecast(lastCity, false);
    }
  };

  //create buttons for last searches
  function createHistoryButtons() {
    storedSearch = getStored();
    $("#savedSearch").empty();
    for (var i = 0; i < 6; i++) {
      if (storedSearch[i] == undefined) {
        return;
      } else {
        var newButton = $(
          "<button class='savedSearch'>" + storedSearch[i] + "</button>"
        ).on("click", function () {
          var cityEl = $(this).text();
          forecast(cityEl, false);
        });
        $("#savedSearch").append(newButton);
      }
    }
  }
  createHistoryButtons();

  //on.click for search
  $("#search").on("click", function () {
    var cityEl = $("#city");
    forecast(cityEl.val(), true);
  });

  // WHEN I view current weather conditions for that city
  // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

  function forecast(city, saveToLocal) {
    //Need to get this value from local
    // event.preventDefault();
    $("#fiveDay").empty();
    $("#uvIndex").empty();

    //url for forecast
    var todayURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey;
    //ajax call for today's date
    $.ajax({
      url: todayURL,
      method: "GET",
    })
      // Promise retrieved data in "response"
      .then(function (response) {
        //   console.log("current weather", response);

        $("#cityDisplay").append($("<h4>" + city + "</h4>"));
        var dateDisplay = moment().format("MMM Do YYYY");
        $("#date-time").append($("<h4>" + dateDisplay + "</h4>"));
        //   console.log("current date", dateDisplay);
        var icon =
          "http://openweathermap.org/img/w/" +
          response.weather[0].icon +
          ".png";
        $("#icon").attr("src", icon);
        var lat = response.coord.lat;
        //   console.log("lat", lat);
        var lon = response.coord.lon;
        //   console.log("lon", lon);
        var tempToday = response.main.temp;
        $("#temp").append(
          $("<h4>" + "The current temperature is " + tempToday + "</h4>")
        );
        var humidityToday = response.main.humidity;
        $("#humidity").append(
          $("<h4>" + "The humidity today is: " + humidityToday + "%" + "</h4>")
        );
        var windToday = response.wind.speed.toFixed(1);
        $("#wind").append(
          $("<h4>" + "Windspeed is " + windToday + "mph" + "</h4>")
        );

        var uvURL =
          "https://api.openweathermap.org/data/2.5/uvi?appid=" +
          apiKey +
          "&lat=" +
          lat +
          "&lon=" +
          lon;

        //api call for uv index url
        $.ajax({
          url: uvURL,
          method: "GET",
        }).then(function (response) {
          var uvNumber = response.value;
          var uvButton = $(
            "<button id='uvButton'>" + response.value + "</button>"
          );
          if (uvNumber <= 3) {Number.css("background-color", "green");
          } else if (uvNumber > 7) {
            uvNumber.css("background-color", "red");
          } else {
            uvNumber.css("background-color", "orange");
          }
          $("#uvIndex").append("UV Index: ").append(uvButton);
          console.log("uv index", response);
        });
      });
  }
  forecast();

  //five day forecast

  $("#search").on("click", function (event) {
    event.preventDefault();
    var city = $("#city").val();
    // queryURL for API call

    var queryURL =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&units=imperial&appid=" +
      apiKey;
    //ajax call for api data
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      // Promise retrieved data in "response"
      .then(function (response) {
        var forecastArray = response.list;
        var filterArray = forecastArray.filter(function (listObj) {
          var time = listObj.dt_txt;
          var timeStamp = time.includes("12:00:00");
          return time;
        });
        for (var i = 0; i < filterArray; i++) {
          var forecast = filterArray[i];
          var fiveDayTemp = forecast.main.temp;
          var fiveDayHumidity = forecast.main.humidity + "%";
          var fiveDayDate = moment()
            .add(i + 1, "d")
            .format("MMMM Do");
          var fiveDayIcon =
            "http://openweathermap.org/img/w/" +
            forecast.weather[0].icon +
            ".png";
          var fiveDayTemp = $(
            "<div class='temperature'>Temp: " +
              Math.floor(fiveDayTemp) +
              "°F</div>"
          );
          var fiveDayHumidity = $(
            "<div id='newHumid'>Humidity: <br>" + fiveDayHumidity + "</div>"
          );
          var fiveDayIcon = $("<img src='" + fiveDayIcon + "'/>");
          var fiveDayDate = $("<div class='date'>" + fiveDayDate + "</div>");
          var newCol = $(
            "<div class='col card' id='forecast'" + i + "></div>"
          ).append(fiveDayDate, fiveDayIcon, fiveDayTemp, fiveDayHumidity);
          $("#forecast" + i).attr("src", fiveDayIcon);
          $("#forecastDiv").append(newCol);
          console.log(filterArray);
        }
      });
  });
  //store results to local
  if (saveToLocal) {
    var currentCity = storedSearch();
    currentCity.unshift(city);
    window.localStorage.setItem("city", JSON.stringify(currentCity));
    $("#city").val("");
  }
  createHistoryButtons();

  // WHEN I view the UV index
  // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
  // WHEN I view future weather conditions for that city
  // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
  // WHEN I click on a city in the search history
  // THEN I am again presented with current and future conditions for that city

  // WHEN I open the weather dashboard
  // THEN I am presented with the last searched city forecast
});
