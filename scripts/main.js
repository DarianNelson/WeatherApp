//GET LOCATION 
var latitude;//30.3755788
var longitude; //-89.1801225

const successCallback = (position) => {
    console.log(position);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
}
const errorCallback = (error) => {
    console.log(error);
}
//USE GEOLOCATION API TO GET COORDINATES BACK
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

function getLocation() {
    //VARIABLES
    var User-Agent: (myweatherapp.com, "darian.nelson@mscoding.org");
    var ajaxRequest = new XMLHttpRequest;
    var url = "https://api.weather.gov/points/30.3755788,-89.1801225";
    var runAsyncronously = true;
    //SETUP REQUEST
    ajaxRequest.open('GET', url, runAsyncronously);

    //WHICH FUNCTION TO RUN WHEN THE REQUEST RETURNS
    ajaxRequest.onreadystatechange = GridCallback();

    //ACTUALLY SEND THE REQUEST AND WAIT FOR RESPONSE
    ajaxRequest.send();
}
//function getForecast() {
//    //VARIABLES
//    var ajaxRequest = new XMLHttpRequest;
//    var url = "https://api.weather.gov/gridpoints/"{office}/{gridX},{gridY}/forecast;
//    var runAsyncronously = true;
//    //SETUP REQUEST
//    ajaxRequest.open('GET', url, runAsyncronously);

//    //WHICH FUNCTION TO RUN WHEN THE REQUEST RETURNS
//    ajaxRequest.onreadystatechange =

//    //ACTUALLY SEND THE REQUEST AND WAIT FOR RESPONSE
//    ajaxRequest.send();
//}

function GridCallback() {
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

    //MAKE CERTAIN RESPONSE IS OK AND READY  
    if (this.status === 200 && this.readyState === 4) {
        //DEBUG
        console.log(this.responseText);

        //PARSE THE STRING BACK INTO AN OBJECT
        var data = JSON.parse(this.responseText);

        //SHOW JOKE ON HTML PAGE
        //index.innerHTML = `${data.value}`;

    } else {
        console.log("Ready State -> " + this.readyState);

        if (this.status !== 200) {
            this.onerror = OnError();
        } //    
    }//end if
}//end function

function OnError() {
    jokeDIV.textContent = 'There was an error';
}//end functon