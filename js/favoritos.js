'use strict';
let stored_data = obter();
let stored_data_size = Object.keys(stored_data).length;
let apiKey = "82f4545f768cc3b045c97cca21bab0f3";
let cloneTemp = $("#temp").clone();
$("#lista").html("");

//alert(stored_data);
//console.log(stored_data[1]);

for(var i=0; i<stored_data_size; i++) {
    //alert("Passou aqui dentro");
    
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + stored_data[i] + "&units=metric&appid=" + apiKey + "&lang=pt"
    }).done(function(msg) {
        //alert("Processo GET terminado!");

        console.log(msg);

        var liTemp = cloneTemp.clone();

        $("#cidade", liTemp).text(msg.name);
        $("#tempo", liTemp).attr("src", "http://openweathermap.org/img/wn/" + msg.weather[0].icon + ".png");
        $("#temperatura", liTemp).text(parseInt(msg.main.temp_max) + " / " + parseInt(msg.main.temp_min) + "°C");
        $("#vento2").text(parseFloat(msg.wind.speed.toFixed(1)) + " m/s");
        $("#hum2").text(parseInt(msg.main.humidity) + " %");

        //Atualizar os valores no html
        $("#lista").append(liTemp);
    });
};

function obter() {
    if (typeof(Storage) != "undefined") {
        //Passar do localstorage para um variável
        let get_stored_data =  localStorage.getItem('old_data');

        return JSON.parse(get_stored_data);
    }

    else {
        alert("Não é válido!");
        event.preventDefault();

        return null;
    }
}