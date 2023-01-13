'use strict';

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

        alert(get_old_data);

        let old_data = JSON.parse(get_old_data);   
        old_data.push(get_new_data);
        localStorage.setItem('old_data', JSON.stringify(old_data));
        
        alert("Passou aqui!");

    }
}

else {
    alert("Não é válido!");
    event.preventDefault();
}