'use strict';

let stored_data = obter();
let stored_data_size;
let city = ['Leiria', 'Lisboa', 'Porto', 'Funchal', 'Viseu', 'Rio de Janeiro'];
let apiKey = "82f4545f768cc3b045c97cca21bab0f3";
let cloneTemp = $("#temp").clone();

//console.log(cloneTemp);

home_list();

function procurar(elemento) {
    let cidade_existe = 0;
    $("#card").hide();
    $("#card2").show();

    city = $(elemento).val();
    $(elemento).val('');
    stored_data = obter();

    if(stored_data != null) {
        stored_data_size = Object.keys(stored_data).length;
        console.log(stored_data);
        console.log(stored_data_size);
        console.log(city);

        for(var i=0; i<stored_data_size; i++) {
            if(stored_data[i] == city) {
                alert("Cidade já existe!");
                cidade_existe += 1;
                break;
            }
        }
        if(cidade_existe == 0) {
            if(typeof(Storage) !== "undefined") {
                localStorage.setItem("nome", city);
                //alert(city);
                salvar();
                //break;
            }
        
            else {
                //Aviso para o não suporte do web storage
                alert("Não é válido!");
                event.preventDefault();
            }
        }
        
    }

    else {
        if(typeof(Storage) !== "undefined") {
            localStorage.setItem("nome", city);
            salvar();
        }
    
        else {
            //Aviso para o não suporte do web storage
            alert("Não é válido!");
            event.preventDefault();
        }
    }
    city_value();
}

function home_list() {

    //console.log(city);

    $("#lista").html("");

    for(var i=0; i<city.length; i++) {

        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + city[i] + "&units=metric&appid=" + apiKey + "&lang=pt"
        }).done(function(msg) {
            //alert("Processo GET terminado!");

            //console.log(msg);
            //alert(msg.name);

            var liTemp = cloneTemp.clone();

            $("#cidade", liTemp).text(msg.name);
            $("#tempo", liTemp).attr("src", "http://openweathermap.org/img/wn/" + msg.weather[0].icon + ".png");
            $("#temperatura", liTemp).text(parseInt(msg.main.temp_max) + " / " + parseInt(msg.main.temp_min) + "°C");

            //Atualizar os valores no html
            $("#lista").append(liTemp);
        });
    };
}

function city_value() {

    //console.log(city);

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey + "&lang=pt"
    }).done(function(msg) {
        //alert("Processo GET terminado!");

        console.log(msg);
        //alert(msg.name);

            $("#cidade2").text(msg.name);
            $("#tempo2").attr("src", "http://openweathermap.org/img/wn/" + msg.weather[0].icon + ".png");
            $("#temperatura2").text(parseInt(msg.main.temp_max) + " / " + parseInt(msg.main.temp_min) + "°C");
            $("#vento2").text(parseFloat(msg.wind.speed.toFixed(1)) + " m/s");
            $("#hum2").text(parseInt(msg.main.humidity) + " %");
    });
}

function home2() {
    $("#card").show();
    $("#card2").hide();
}

function salvar() {
    if (typeof(Storage) != "undefined") {
        let get_new_data = localStorage.getItem('nome');
        let get_old_data = localStorage.getItem('old_data');

        if(get_new_data != null) {
            //Se não houver nenhum valor no localstorage
            if(get_old_data == null) {
                localStorage.setItem('old_data', "[]");
                get_old_data = localStorage.getItem('old_data');
            }

            else {
                localStorage.setItem('old_data', get_new_data);
            }

            //alert(get_old_data);

            let old_data = JSON.parse(get_old_data);   
            old_data.push(get_new_data);
            localStorage.setItem('old_data', JSON.stringify(old_data));
            
            //alert("Passou aqui!");

        }
    }

    else {
        alert("Não é válido!");
        event.preventDefault();
    }
}

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
pesquisa.addEventListener('keypress', function(e){ 
       if(e.which == 13){
          procurar(pesquisa);
       }
    });