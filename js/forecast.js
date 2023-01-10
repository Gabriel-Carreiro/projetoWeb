var cloneTemp = $("#temp").clone();
var cloneFor = $("#forecast").clone();
//console.log(cloneTemp);

const apiKey = "82f4545f768cc3b045c97cca21bab0f3";
var city = 'Leiria';

$("#lista").html("");
$("#lista2").html("");

$.ajax({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKey + "&lang=pt"
}).done(function(msg) {
    //alert("Processo GET terminado!");

    console.log(msg);
    //alert(msg.name);

    var liTemp = cloneTemp.clone();

    //Valores Forecast 5 dias
    $("#ident", liTemp).text(msg.city.id);
    $("#cidade").text(msg.city.name);
    $("#data", liTemp).text(data(msg));
    $("#tempo", liTemp).attr("src", "http://openweathermap.org/img/wn/" + msg.list[0].weather[0].icon + ".png");
    $("#temperatura", liTemp).text(parseInt(msg.list[0].main.temp_max) + " / " + parseInt(msg.list[0].main.temp_min) + "°C");
    $("#vento", liTemp).text(parseFloat(msg.list[0].wind.speed.toFixed(1)) + " m/s");
    $("#hum", liTemp).text(parseInt(msg.list[0].main.humidity) + " %");

    //Atualizar os valores no html
    $("#lista").append(liTemp);
});

function data(msg) {
    let dt = new Date(msg.list[0].dt * 1000).toDateString(); //timestamp * 1000

    return dt.substring(0,4) + "| " + dt.substring(8,11) + dt.substring(4,7);
}

function forecast_3h() {
    $("#temp").css("display", "none");
    $("#lista2").css("display", "block");

    var id = $("#ident").text();

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKey + "&lang=pt"
    }).done(function(msg) {
    
        console.log(msg);

        var liFor = cloneFor.clone();

        //Valores Forecast 3 horas
        $("#tempo2", liFor).attr("src", "http://openweathermap.org/img/wn/" + msg.list[0].weather[0].icon + ".png");
        $("#temp2", liFor).text(parseInt(msg.list[0].main.temp));
        $("#hum2", liFor).text(parseInt(msg.list[0].main.humidity));

        $("#lista2").append(liFor);

        console.log($("#data").text());
    });
}

function forecast_5d() {
    $("#temp").css("display", "block");
    $("#lista2").css("display", "none");
}