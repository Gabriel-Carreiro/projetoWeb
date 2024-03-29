'use strict'

let city = 'Leiria';
let apiKey = "82f4545f768cc3b045c97cca21bab0f3";
let cloneTemp = $("#temp").clone();
let cloneFor = $("#forecast-table").clone();

forecast_list();

function procurar(elemento) {
    city = $(elemento).val();
    $(elemento).val('');
    forecast_list();
}

function forecast_list() {
    //console.log(city);

    //console.log(cloneTemp);

    $("#lista").html("");
    $("#lista2").html("");

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKey + "&lang=pt",

    }).done(function(msg) {
        //alert("Processo GET terminado!");

        console.log(msg);
        //alert(msg.name);

        //Valores Forecast 5 dias
        for(var i=0; i<msg.list.length; i++) {
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
}

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

    //console.log(data_value);
    //console.log(atual_data);

    $("#lista").hide();
    $("#procurar").hide();
    $("#lista2").show();

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=" + apiKey + "&lang=pt"
    }).done(function(msg) {
    
        console.log(msg);

        var atual_hour, atual_temp, atual_hum;

        $("#data_atual", cloneFor).text(data2(data_value));
        $("#tempo2", cloneFor).attr("src", "http://openweathermap.org/img/wn/" + msg.list[0].weather[0].icon + ".png");

        let hour_row = $(cloneFor).find('.time_row');
        let temp_row = $(cloneFor).find('.temp_row');
        let hum_row = $(cloneFor).find('.hum_row');

        for(var i=0; i<msg.list.length; i++) {
            let atual_day = get_day(atual_data); 

            let td_hour = document.createElement("td");
            let td_temp = document.createElement("td");
            let td_hum = document.createElement("td");

            if(atual_day == get_day(new Date(msg.list[i].dt * 1000))) {
                let atual_hour = get_hour(new Date(msg.list[i].dt * 1000));
                let atual_temp = parseInt(msg.list[i].main.temp);
                let atual_hum = parseInt(msg.list[i].main.humidity);

                //console.log(i);
                //console.log(get_day(atual_data) + "atual_data");
                //console.log(get_day(new Date(msg.list[i].dt * 1000)) + "data [" + i + "]");
                //console.log(atual_temp);
                //console.log(atual_hour);
                //console.log(atual_hum);

                //Valores Forecast 3 horas
                $(td_hour).text(atual_hour + ":00");
                $(td_temp).text(atual_temp + "°C");
                $(td_hum).text(atual_hum + "%");
                
                atual_day=+3;
            }

            $(hour_row).append(td_hour);
            $(temp_row).append(td_temp);
            $(hum_row).append(td_hum);
            
        }

        //$("#lista2").append(liFor);
        $("#lista2").append(cloneFor);

        //console.log($("#data").text());
    });
}

function forecast_5d() {
    $("#lista").show();
    $("#procurar").show();
    $("#lista2").hide();
}

pesquisa.addEventListener('keypress', function(e){ 
       if(e.which == 13){
          procurar(pesquisa);
       }
    });