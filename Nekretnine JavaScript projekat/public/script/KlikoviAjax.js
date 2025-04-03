const KlikoviAjax = (() => {

function impl_dajKlikovePretrage(nekretnina_id,fnCallback){
    var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                fnCallback(true, ajax.responseText);
            }
                
            else if(ajax.readyState == 4)
                fnCallback(false, null);
        }
        ajax.open("GET", "http://localhost:3000/klikovi/"+nekretnina_id, true);
        ajax.send();
}

function impl_dajUpite(nekretnina_id,fnCallback){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200){
            fnCallback(true, ajax.responseText);
        }
            
        else if(ajax.readyState == 4)
            fnCallback(false, null);
    }
    ajax.open("GET", "http://localhost:3000/upiti/"+nekretnina_id, true);
    ajax.send();
}

function impl_getKorisnikById(korisnik_id,fnCallback){
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200){
            fnCallback(true, ajax.responseText);
        }
            
        else if(ajax.readyState == 4)
            fnCallback(false, null);
    }
    ajax.open("GET", "http://localhost:3000/korisnikbyid/"+korisnik_id, true);
    ajax.send();
}

    return {
        dajKlikovePretrage: impl_dajKlikovePretrage,
        dajUpite: impl_dajUpite,
        getKorisnikById: impl_getKorisnikById
    };
})();