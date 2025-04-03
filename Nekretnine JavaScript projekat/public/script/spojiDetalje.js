window.onload = function(){
    PoziviAjax.getNekretninaById(localStorage.getItem("nekretnina-id"),function(status,data){
        if(status){
            let nekretnina=JSON.parse(data)
        document.getElementById("naziv").innerHTML=`<strong>Naziv: </strong>${nekretnina.naziv}`;
        document.getElementById("kvadratura").innerHTML = `<strong>Kvadratura: </strong>${nekretnina.kvadratura}`;
        document.getElementById("cijena").innerHTML = `<strong>Cijena: </strong>${nekretnina.cijena}`;
        document.getElementById("tipGrijanja").innerHTML = `<strong>Tip grijanja: </strong>${nekretnina.tip_grijanja}`;
        document.getElementById("godinaIzgradnje").innerHTML = `<strong>Godina izgradnje: </strong>${nekretnina.godina_izgradnje}`;
        document.getElementById("lokacija").innerHTML = `<strong>Lokacija: </strong>${nekretnina.lokacija}`;
        document.getElementById("datumObjave").innerHTML = `<strong>Datum objave: </strong>${nekretnina.datum_objave}`;
        document.getElementById("opis").innerHTML = `<strong>Opis: </strong>${nekretnina.opis}`;
        }
        
    });

        
    
}





