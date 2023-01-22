'use strict';

let city = 'Leiria';
let apiKey = "82f4545f768cc3b045c97cca21bab0f3";

detalhes_list();

function procurar(elemento) {
    city = $(elemento).val();
    $(elemento).val('');
    detalhes_list();
}

function detalhes_list() {

    //console.log(city);

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey + "&lang=pt"
    }).done(function(msg) {
        //alert("Processo GET terminado!");

        console.log(msg);
        //alert(msg.name);

        $("#cidade").text(msg.name);
        $("#tempo").attr("src", "http://openweathermap.org/img/wn/" + msg.weather[0].icon + ".png");
        $("#weather").text(msg.weather[0].main);
        $("#temperatura").text(parseInt(msg.main.temp) + "°C");
        $("#sen_term").text(parseInt(msg.main.feels_like));
        $("#temp_max").text(parseInt(msg.main.temp_max));
        $("#temp_min").text(parseInt(msg.main.temp_min));
        $("#descricao").text(first_letter(msg.weather[0].description));
        $("#wind").text(parseFloat(msg.wind.speed.toFixed(1)));
        $("#direcao").text(msg.wind.deg);
        $("#humidade").text(parseInt(msg.main.humidity));
        $("#pressao").text(msg.main.pressure);
        $("#nascer").text(data(msg.sys.sunrise));
        $("#por").text(data(msg.sys.sunset));
    });
}

function first_letter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function data(msg) {
    let dt = new Date(msg * 1000).toString();

    return dt.substring(16,18) + "H" + dt.substring(19,21);
}