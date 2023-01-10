var cloneTemp = $("#temp").clone();
//console.log(cloneTemp);

const apiKey = "82f4545f768cc3b045c97cca21bab0f3";
var city = 'Leiria';

$("#lista").html("");

$.ajax({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKey + "&lang=pt"
}).done(function(msg) {
    //alert("Processo GET terminado!");

    console.log(msg);
    //alert(msg.name);

    var liTemp = cloneTemp.clone();

    $("#cidade", liTemp).text(msg.city.name);
    $("#tempo", liTemp).attr("src", "http://openweathermap.org/img/wn/" + msg.list[0].weather[0].icon + ".png");
    $("#temperatura", liTemp).text(parseInt(msg.list[0].main.temp_max) + " / " + parseInt(msg.list[0].main.temp_min) + "°C");

    //Atualizar os valores no html
    $("#lista").append(liTemp);
});