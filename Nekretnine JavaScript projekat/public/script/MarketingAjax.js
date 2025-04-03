const MarketingAjax = (() => {

    function impl_osvjeziPretrage(divNekretnine) {
        
    }

    function impl_osvjeziKlikove(divNekretnine) {
       

    }

    

    function impl_novoFiltriranje(listaFiltriranihNekretnina) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200)
                console.log("Ok");
            else if(ajax.readyState == 4)
                console.log("Not Ok");
        }
        ajax.open("POST", "http://localhost:3000/marketing/nekretnine", true);
        ajax.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        ajax.send(JSON.stringify({"nizNekretnina":listaFiltriranihNekretnina}));
    }

    function impl_klikNekretnina(idNekretnine) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200)
                console.log("Ok");
            else if(ajax.readyState == 4)
                console.log("Not Ok");
        }
        ajax.open("POST", "http://localhost:3000/marketing/nekretnina/"+idNekretnine, true);
        ajax.send();
    }

    return {
        osvjeziPretrage: impl_osvjeziPretrage,
        osvjeziKlikove: impl_osvjeziKlikove,
        novoFiltriranje: impl_novoFiltriranje,
        klikNekretnina: impl_klikNekretnina
    };
})();