'use strict';

var cloneTemp = $("#temp").clone();
//console.log(cloneTemp);

const apiKey = "82f4545f768cc3b045c97cca21bab0f3";
var city = ['Leiria', 'Lisboa', 'Porto', 'Funchal', 'Viseu', 'Braga'];

$("#lista").html("");

for(let i=0; i<6; i++) {

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city[i] + "&units=metric&appid=" + apiKey + "&lang=pt"
    }).done(function(msg) {
        //alert("Processo GET terminado!");

        console.log(msg);
        //alert(msg.name);

        var liTemp = cloneTemp.clone();

        $("#cidade", liTemp).text(msg.name);
        $("#tempo", liTemp).attr("src", "http://openweathermap.org/img/wn/" + msg.weather[0].icon + ".png");
        $("#temperatura", liTemp).text(parseInt(msg.main.temp_max) + " / " + parseInt(msg.main.temp_min) + "°C");

        //Atualizar os valores no html
        $("#lista").append(liTemp);
    });
};

