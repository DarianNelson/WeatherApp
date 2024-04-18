//LOCATION OBJECT
var area = { lat: 0.0, lon: 0.0, office: 0.0, gridX: 0.0, gridY: 0.0 };
//FORECAST OBJECTS---need an array??
var forecast = { isDay: true, dayOfWeek: 0, iconsrc: 0, high: 0.0, low: 0.0, precipAM: 0.0, precipPM: 0.0, humidityAM: 0.0, humidityPM: 0.0 };
function GetLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(LocationCallback, errorCallback);
    }//end if
}//end function

const LocationCallback = (position) => {
    console.log(position);
    area.lat = position.coords.latitude;
    area.lon = position.coords.longitude;

    GetOfficeGrid(area.lat, area.lon);
}//end function

const errorCallback = (error) => {
    console.log("There was an error");
}//end function

function GetOfficeGrid(lat, lon) {
    //VARIABLES
    var ajaxRequest = new XMLHttpRequest;
    var url = 'https://api.weather.gov/points/'+ lat + "," + lon;
    var runAsyncronously = true;

    //SETUP REQUEST
    ajaxRequest.open('GET', url, runAsyncronously);

    //WHICH FUNCTION TO RUN WHEN THE REQUEST RETURNS
    ajaxRequest.onreadystatechange = OfficeGridCallback;
   
    //ACTUALLY SEND THE REQUEST AND WAIT FOR RESPONSE
    ajaxRequest.send();
}//end function

GetLocation();
function OfficeGridCallback() {
    //STATUSES
    //200: "OK"
    //403: "Forbidden"
    //404: "Page not found"

    //READY STATES
    //0      The request is not initialized
    //1      The request has been set up
    //2      The request has been sent
    //3      The request is in process
    //4      The request is complete

    var response = this;
    //MAKE CERTAIN RESPONSE IS OK AND READY  
    if (response.status === 200 && response.readyState === 4) {
        //DEBUG
        console.log(response.responseText);

        //PARSE THE STRING BACK INTO AN OBJECT
        var data = JSON.parse(response.responseText);
        
    } else {
        console.log("Ready State -> " + response.readyState);

        if (response.status !== 200) {
            response.onerror = OnError()
        }//end if    
    }//end if
    area.office = data.properties.gridId;
    area.gridX = data.properties.gridX;
    area.gridY = data.properties.gridY;
    GetWeatherReport(area.office, area.gridX, area.gridY);
}//end function

function GetWeatherReport(office, gridX, gridY) {
    //VARIABLES
    var ajaxRequest = new XMLHttpRequest;
    var url = 'https://api.weather.gov/gridpoints/' + office + '/' + gridX + ',' + gridY + '/forecast';
    var runAsyncronously = true;
    //SETUP REQUEST
    ajaxRequest.open('GET', url, runAsyncronously);

    //WHICH FUNCTION TO RUN WHEN THE REQUEST RETURNS
    ajaxRequest.onreadystatechange = WeatherReportCallback;

    //ACTUALLY SEND THE REQUEST AND WAIT FOR RESPONSE
    ajaxRequest.send();
}//end function

function WeatherReportCallback() {
    //STATUSES
    //200: "OK"
    //403: "Forbidden"
    //404: "Page not found"

    //READY STATES
    //0      The request is not initialized
    //1      The request has been set up
    //2      The request has been sent
    //3      The request is in process
    //4      The request is complete

    var response = this;
    //MAKE CERTAIN RESPONSE IS OK AND READY  
    if (response.status === 200 && response.readyState === 4) {
        //DEBUG
        console.log(response.responseText);

        //PARSE THE STRING BACK INTO AN OBJECT
        var data = JSON.parse(response.responseText);
        
    } else {
        console.log("Ready State -> " + response.readyState);

        if (response.status !== 200) {
            response.onerror = OnError();
        }//end if    
    }//end if
    
    

    DisplayForecast(data);
}//end function
function OnError() {
    console.log("There was an error with the request");
}//end functon
function GetDay1AMWeather(data) {
    forecast.dayOfWeek = data.properties.period
    forecast.high = data.properties.periods[0].temperature;
    forecast.low = data.properties.periods[0].temperature;
    forecast.precipAM = data.properties.periods[0].probabilityOfPrecipitation.value;
    forecast.humidityAM = data.properties.periods[0].relativeHumidity.value;
}
function getIconUrl(iconCode) {
    return 'icons/$(ICON_MAP.get(iconCode)}.svg';
}
var currentIcon = document.querySelector("[data-current-icon]");
