$(document).ready(function () {

  var apiKey = "6fff619b5618a83197c30e7fdabe0ad8";
  var city = $("#city");
  // GIVEN a weather dashboard with form inputs
  // WHEN I search for a city
  // THEN I am presented with current and future conditions for that city and that city is added to the search history

  function currentWeather() {
      //Need to get this value from local
    var city = $("#city").val()
    
    if (city){
    
    var todayURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" +
      apiKey;
    //ajax call for today's date
    $.ajax({
      url: todayURL,
      method: "GET",
    })
      // Promise retrieved data in "response"
      .then(function (response) {
        console.log("current weather", response);

        $("#cityDisplay").append($("<h4>" + city + "</h4>"));
        var lat = response.coord.lat;
        console.log("lat", lat);
        var lon = response.coord.lon;
        console.log("lon", lon);
        var tempToday = response.main.temp;
        $("#temp").append($("<h4>" + tempToday + "</h4>"));
        var humidityToday = response.main.humidity;
        $("#humidity").append($("<h4>" + humidityToday + "</h4>"));
        var windToday = response.wind.speed;
        $("#wind").append($("<h4>" + windToday + "</h4>"));
      });
    } 

    var uvURL =
      "http://api.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37&appid=" +
      apiKey;

    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (response) {
      console.log("uv index", response);
    });
  }
  currentWeather();

  $("#search").on("click", function(event) {
    event.preventDefault();
    var city = $("#city").val()
    // queryURL for API call

    var queryURL =
      "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" +
      apiKey;
    //ajax call for api data
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      // Promise retrieved data in "response"
      .then(function (response) {
        for (var i = 0; i < 5; i++) {
          // console.log(queryURL);
          // console.log('all info', response)
          // console.log('city name', response.city.name);
          // console.log('date', response.list[i].dt);
          // console.log('current temp', response.list[i].main.temp);
          // console.log('weather icon', response.list[i].weather.icon);
          // console.log('humidity', response.list[i].main.humidity);
          // console.log('wind speed', response.list[i].wind.speed);
          var fiveDayTemp = response.list[i].main.temp;
          var fiveDayHumidity = response.list[i].main.humidity;
          var fiveDayIcon = response.list[i].weather.icon;
          console.log("fiveDayTemp", fiveDayTemp);
          console.log("fiveDayHumidity", fiveDayHumidity);
          console.log("fiveDayIcon", fiveDayIcon);

          $("#fiveDay").append($("<h6>" + fiveDayTemp + "</h6>"));
          $("#fiveDay").append($("<h6>" + fiveDayHumidity + "</h6>"));
          $("#fiveDay").append($("<h6>" + fiveDayIcon + "</h6>"));
        }
      });
  });

  // WHEN I view current weather conditions for that city
  // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
  // WHEN I view the UV index
  // THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
  // WHEN I view future weather conditions for that city
  // THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
  // WHEN I click on a city in the search history
  // THEN I am again presented with current and future conditions for that city
  // WHEN I open the weather dashboard
  // THEN I am presented with the last searched city forecast
});
