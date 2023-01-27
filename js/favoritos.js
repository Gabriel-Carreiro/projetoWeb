'use strict';

let stored_data = obter();
let stored_data_size;
let apiKey = "82f4545f768cc3b045c97cca21bab0f3";
let cloneTemp = $("#temp").clone();

$("#lista").html("");

//alert(stored_data);
//console.log(stored_data[1]);

if(stored_data != null) {
    list_fav();
}

function list_fav() {
    stored_data_size = Object.keys(stored_data).length;

    for(var i=0; i<stored_data_size; i++) {
        //alert("Passou aqui dentro");
        
        $.ajax({
            method: "GET",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + stored_data[i] + "&units=metric&appid=" + apiKey + "&lang=pt"
        }).done(function(msg) {
            //alert("Processo GET terminado!");

            //console.log(msg);

            var liTemp = cloneTemp.clone();

            $("#cidade", liTemp).text(msg.name);
            $("#tempo", liTemp).attr("src", "http://openweathermap.org/img/wn/" + msg.weather[0].icon + ".png");
            $("#temperatura", liTemp).text(parseInt(msg.main.temp_max) + " / " + parseInt(msg.main.temp_min) + "°C");
            $("#vento", liTemp).text(parseFloat(msg.wind.speed.toFixed(1)) + " m/s");
            $("#hum", liTemp).text(parseInt(msg.main.humidity) + " %");

            //Atualizar os valores no html
            $("#lista").append(liTemp);
        });
    };
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

function insert(elemento) {
    let city = $(elemento).val();
    $(elemento).val('');

    if(stored_data != null) {
        for(var i=0; i<stored_data_size; i++) {
            if(stored_data[i] == city) {
                alert("Cidade já existe!");
            }

            else {
                if(typeof(Storage) !== "undefined") {
                    localStorage.setItem("nome", city);
                }
            
                else {
                    //Aviso para o não suporte do web storage
                    alert("Não é válido!");
                    event.preventDefault();
                }
            }
        }
    }

    else {
        if(typeof(Storage) !== "undefined") {
            localStorage.setItem("nome", city);
        }
    
        else {
            //Aviso para o não suporte do web storage
            alert("Não é válido!");
            event.preventDefault();
        }
    }
    
    salvar();
    //alert(city);
    location.reload();
}

function remove(elemento) {
    stored_data_size = Object.keys(stored_data).length;
    let city = $(elemento).val();
    $(elemento).val('');

    //console.log("Stored data: " + stored_data[0]);
    //console.log("City: " + city);
    //console.log("Size: " + stored_data_size);

    for(var i=0; i<stored_data_size; i++) {
        if(stored_data[i] == city) {
            stored_data.splice(i, 1);
            localStorage.setItem('old_data', JSON.stringify(stored_data));
            location.reload();
        }
    }
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