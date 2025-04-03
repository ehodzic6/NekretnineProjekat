const PoziviAjax = (() => {
    // fnCallback se u svim metodama poziva kada stigne
    // odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data,
    // error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška, poruka se prosljeđuje u error parametru
    // callback-a, a data je tada null
    // vraća korisnika koji je trenutno prijavljen na sistem
    function impl_getKorisnik(fnCallback) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                var user = this.responseText;
                fnCallback(true, user);
            }
                
            else if(ajax.readyState == 4)
                fnCallback(false, null);
        }
        ajax.open("GET", "http://localhost:3000/korisnik", true);
        ajax.send();
    }
    // ažurira podatke loginovanog korisnika
    function impl_putKorisnik(noviPodaci, fnCallback) {
        const { username, ime, prezime , password} = JSON.parse(noviPodaci);
        console.log(JSON.stringify({"username":username,"ime":ime,"prezime":prezime,"password":password}))
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                
                fnCallback(true, this.responseText);
            }
                
            else if(ajax.readyState == 4)
                fnCallback(false, null);
        }
        ajax.open("PUT", "http://localhost:3000/korisnik", true);
        ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        ajax.send(JSON.stringify({"username":username,"ime":ime,"prezime":prezime,"password":password}));
    }
    // dodaje novi upit za trenutno loginovanog korisnika
    function impl_postUpit(nekretnina_id, tekst_upita, fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                fnCallback(true, "Sve je ok");
            } else if (ajax.readyState == 4) {
                fnCallback(false, "Došlo je do greške");
            }
        };
    
        ajax.open("POST", "http://localhost:3000/upit", true);
        ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        ajax.send(JSON.stringify({ "nekretnina_id": nekretnina_id, "tekst_upita": tekst_upita }));
    }
    function impl_getNekretnine(fnCallback) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200)
                fnCallback(true, ajax.responseText);
            else if(ajax.readyState == 4)
                fnCallback(false, null);
        }
        ajax.open("GET", "http://localhost:3000/nekretnine", true);
        ajax.send();
    }
    
    function impl_postLogin(username, password, fnCallback) {
        let ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function () {
            if(ajax.readyState==4 && ajax.status==200){
                fnCallback(true,"Sve je ok");
            }
            else if(ajax.readyState==4){
                fnCallback(false,"Došlo je do greške");
            }
            
        };

            ajax.open("POST","http://localhost:3000/login",true);
            ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            ajax.send(JSON.stringify({"username":username,"password":password}));
        
    }

    
    function impl_postLogout(fnCallback) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200)
                fnCallback(true, ajax.responseText);
            else if(ajax.readyState == 4)
                fnCallback(false, null);
        }
        ajax.open("POST", "http://localhost:3000/logout", true);
        ajax.send();
    }
    function impl_getNekretninaById(nekretnina_id,fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200){
                var nekretnina = this.responseText;
                fnCallback(true, nekretnina);
            }
                
            else if(ajax.readyState == 4)
                fnCallback(false, null);
        }
        ajax.open("GET", "http://localhost:3000/nekretnina/"+nekretnina_id, true);
        ajax.send();
    }
    return {
    postLogin: impl_postLogin,
    postLogout: impl_postLogout,
    getKorisnik: impl_getKorisnik,
    putKorisnik: impl_putKorisnik,
    postUpit: impl_postUpit,
    getNekretnine: impl_getNekretnine,
    getNekretninaById: impl_getNekretninaById
    };
    })();