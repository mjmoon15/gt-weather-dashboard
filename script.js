$(document).ready(function(){


    var apiKey = "0a7e8180f08536648e0ba444206d74ec"
// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
    
    function currentWeather(){

        var currentURL = "http://api.openweathermap.org/data/2.5/weather?q=atlanta,us&units=imperial&appid=" + apiKey;
        //ajax call for api data
        $.ajax({
            url: currentURL,
            method: 'GET'
        })
        // Promise retrieved date in "response"
        .then(function (response) {
            console.log('current weather', response)
        })
    }
    currentWeather()





    $("#search").on("click", function (){
        event.preventDefault()
        // queryURL for API call
        
        var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=atlanta,us&units=imperial&appid=" + apiKey;
        //ajax call for api data
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
        // Promise retrieved date in "response"
        .then(function (response) {
            

            for (var i=0; i<5; i++){
            // console.log(queryURL);
            // console.log('all info', response)
            // console.log('city name', response.city.name);
            // console.log('date', response.list[i].dt);
            // console.log('current temp', response.list[i].main.temp);
            // console.log('weather icon', response.list[i].weather.icon);
            // console.log('humidity', response.list[i].main.humidity);
            // console.log('wind speed', response.list[i].wind.speed);
            var fiveDay = response.list[i].main.temp;
            console.log('fiveDay', fiveDay);

            $("#search-results").append($("<h6>" + fiveDay + "</h6>"))
            }

            
        });
    })
   

    // function getForecast(response){
        


    // }
    // getForecast()

  

    function uvIndex(){
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=37.75&lon=-122.37&appid=" + apiKey;

        $.ajax({
            url: uvURL,
            method: 'GET'
        })
        .then(function (response){
            console.log('uv index', response)
        })
    }
    uvIndex()



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





})

