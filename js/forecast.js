var cloneTemp = $("#temp").clone();
var cloneFor = $("#forecast").clone();
//console.log(cloneTemp);

const apiKey = "82f4545f768cc3b045c97cca21bab0f3";
var city = 'London';

$("#lista").html("");
$("#lista2").html("");

$.ajax({
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKey + "&lang=pt"
}).done(function(msg) {
    //alert("Processo GET terminado!");

    console.log(msg);
    //alert(msg.name);


    //Valores Forecast 5 dias
    for(i=0; i<msg.list.length; i++) {
        var j = i-1;
        var liTemp = cloneTemp.clone();        

        if (i==0) {
            $("#cidade").text(msg.city.name);
            $("#id_date", liTemp).text(msg.list[i].dt);
            $("#data", liTemp).text(data(msg,i));
            $("#tempo", liTemp).attr("src", "http://openweathermap.org/img/wn/" + msg.list[i].weather[0].icon + ".png");
            $("#temperatura", liTemp).text(parseInt(msg.list[i].main.temp_max) + " / " + parseInt(msg.list[i].main.temp_min) + "°C");
            $("#vento", liTemp).text(parseFloat(msg.list[i].wind.speed.toFixed(1)) + " m/s");
            $("#hum", liTemp).text(parseInt(msg.list[i].main.humidity) + " %");

            //Atualizar os valores no html
            $("#lista").append(liTemp);
        }

        else if (msg.list[j].dt_txt.substring(8,10) != msg.list[i].dt_txt.substring(8,10)) {
            $("#cidade").text(msg.city.name);
            $("#id_date", liTemp).text(msg.list[i].dt);
            $("#data", liTemp).text(data(msg,i));
            $("#tempo", liTemp).attr("src", "http://openweathermap.org/img/wn/" + msg.list[i].weather[0].icon + ".png");
            $("#temperatura", liTemp).text(parseInt(msg.list[i].main.temp_max) + " / " + parseInt(msg.list[i].main.temp_min) + "°C");
            $("#vento", liTemp).text(parseFloat(msg.list[i].wind.speed.toFixed(1)) + " m/s");
            $("#hum", liTemp).text(parseInt(msg.list[i].main.humidity) + " %");

            //console.log(i);

            //Atualizar os valores no html
            $("#lista").append(liTemp);
        }
    }
});

function data(msg,i) {
    let dt = new Date(msg.list[i].dt * 1000).toDateString(); //timestamp * 1000

    return dt.substring(0,4) + "| " + dt.substring(8,11) + dt.substring(4,7);
}

function data2(valor) {
    let dt = new Date(valor * 1000).toDateString(); //timestamp * 1000

    return dt.substring(0,4) + "| " + dt.substring(8,11) + dt.substring(4,7);
}

function forecast_3h(element) {
    let clickedLI = $(element);
    let data_value = clickedLI.children().first().text();

    //console.log(data_value);

    $("#lista").css("display", "none");
    $("#lista2").css("display", "block");

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKey + "&lang=pt"
    }).done(function(msg) {
    
        console.log(msg);

        var liFor = cloneFor.clone();

        //Valores Forecast 3 horas
        $("#data_atual", liFor).text(data2(data_value));

        console.log(data_value);
        //for(dia=0; dia<5; dia=+86400)
        for(var i=0; i<msg.list.length; i++) {
            //Manhã
            if(msg.list[i].dt > data_value) {
                if((msg.list[i].dt > msg.city.sunrise) && (msg.list[i].dt < msg.city.sunset)) {
                    $("#temp2", liFor).text(parseInt(msg.list[i+1].main.temp.toFixed(0)));
                    $("#hum2", liFor).text(parseInt(msg.list[i+1].main.humidity.toFixed(0)));

                    console.log("Manhã");
                    console.log(msg.list[i].dt);
                    console.log(i);
                    //console.log(data(msg));

                    break;
                }

                else {
                    $("#temp2", liFor).text("-");
                    $("#hum2", liFor).text("-");
                }
            }
        }

        for(i=0; i<msg.list.length; i++) {
            //Tarde
            if(msg.list[i].dt > data_value) {
                if((msg.list[i].dt > ((msg.city.sunrise + msg.city.sunset)/2)) && (msg.list[i].dt > msg.city.sunrise) && (msg.list[i].dt < msg.city.sunset)) {
                    $("#temp3", liFor).text(parseInt(msg.list[i].main.temp.toFixed(0)));
                    $("#hum3", liFor).text(parseInt(msg.list[i].main.humidity.toFixed(0)));

                    console.log("Tarde");
                    console.log(msg.list[i].dt);
                    console.log(i);
                    //console.log(data(msg));

                    break;
                }

                else {
                    $("#temp3", liFor).text("-");
                    $("#hum3", liFor).text("-");
                }
            }
        }

        for(i=0; i<msg.list.length; i++) {
            //Noite
            if(msg.list[i].dt > data_value) {
                if(msg.list[i].dt > msg.city.sunset) {
                    $("#temp4", liFor).text(parseInt(msg.list[i].main.temp.toFixed(0)));
                    $("#hum4", liFor).text(parseInt(msg.list[i].main.humidity.toFixed(0)));

                    console.log("Noite");
                    console.log(msg.list[i].dt);
                    console.log(i);
                    //console.log(data(msg));

                    break;
                }
            }
        }

        $("#tempo2", liFor).attr("src", "http://openweathermap.org/img/wn/" + msg.list[0].weather[0].icon + ".png");

        $("#lista2").append(liFor);

        //console.log($("#data").text());
    });
}

function forecast_5d() {
    $("#lista").css("display", "block");
    $("#lista2").empty();
}