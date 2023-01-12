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
    let dt = new Date(valor).toDateString(); //timestamp * 1000

    return dt.substring(0,4) + "| " + dt.substring(8,11) + dt.substring(4,7);
}

function get_hour(valor_data) {
    let res = valor_data.toString();

    return res.substring(16,18);
}

function get_day(valor_data) {
    let res = valor_data.toDateString();

    return res.substring(8,10);
}

function forecast_3h(element) {
    let clickedLI = $(element);
    let data_value = parseInt(clickedLI.children().first().text() * 1000);
    let atual_data = new Date(data_value);

    console.log(data_value);
    console.log(atual_data);

    $("#lista").css("display", "none");
    $("#lista2").css("display", "block");

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKey + "&lang=pt"
    }).done(function(msg) {
    
        console.log(msg);

        var atual_hour, atual_temp, atual_hum;

        $("#data_atual", liFor).text(data2(data_value));
        $("#tempo2", liFor).attr("src", "http://openweathermap.org/img/wn/" + msg.list[0].weather[0].icon + ".png");

        for(var i=0; i<msg.list.length; i++) {
            var liFor = cloneFor.clone();
            let atual_day = get_day(atual_data); 

            if(atual_day == get_day(new Date(msg.list[i].dt * 1000))) {
                let atual_hour = get_hour(new Date(msg.list[i].dt * 1000));
                let atual_temp = parseInt(msg.list[i].main.temp);
                let atual_hum = parseInt(msg.list[i].main.humidity);

                console.log(i);
                console.log(get_day(atual_data) + "atual_data");
                console.log(get_day(new Date(msg.list[i].dt * 1000)) + "data [" + i + "]");
                console.log(atual_temp);
                console.log(atual_hour);
                console.log(atual_hum);

                //Valores Forecast 3 horas
                $("#hour2", liFor).text(atual_hour + ":00");
                $("#temp2", liFor).text(atual_temp + "°C");
                $("#hum2", liFor).text(atual_hum + " %");

                //Atualizar os valores no html
                $("#lista2").append(liFor);
                
                atual_day=+3;
            }
            else {
                //Valores Forecast 3 horas
                $("#hour2", liFor).text("-");
                $("#temp2", liFor).text("-");
                $("#hum2", liFor).text("-");
            }
        }

        //$("#lista2").append(liFor);
        $("#lista2").append(liFor);

        //console.log($("#data").text());
    });
}

function forecast_5d() {
    $("#lista").css("display", "block");
    $("#lista2").empty();
}