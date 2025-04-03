window.onload = function () {
    if(document.getElementById("odjavaBtn")!=null){
    document.getElementById("odjavaBtn").onclick = function(){
        PoziviAjax.postLogout(function(status,data){
            if(status){
                alert("Uspješna odjava!");
                window.location.href='prijava.html';
            }
            else{
                alert("Neuspješna odjava")
            }
        })
    }
}
}


document.addEventListener("DOMContentLoaded", function(){
    provjeriStatusPrijave();
});


let daLiJeKorisnikPrijavljen=localStorage.getItem("daLiJeKorisnikPrijavljen");

function provjeriStatusPrijave(){
    daLiJeKorisnikPrijavljen=localStorage.getItem("daLiJeKorisnikPrijavljen");
    if(daLiJeKorisnikPrijavljen){
        azurirajMeniOdjava();
    }
    else{
        azurirajMeniPrijava();
    }
}

function azurirajMeniOdjava(){
    let glavniMeni = document.getElementById("glavniMeniLista");
    glavniMeni.innerHTML = `<li><a href="profil.html"><strong>Profil</strong></a></li>
                            <li><a href="nekretnine.html"><strong>Nekretnine</strong></a></li>
                            <li><button id="odjavaBtn">Odjava</button></li>`;

    document.getElementById("odjavaBtn").addEventListener("click",function(){
        //ODJAVA AKTIVNOSTI
        daLiJeKorisnikPrijavljen=false;
        localStorage.clear();
        provjeriStatusPrijave();
    })
}

function azurirajMeniPrijava(){
    let glavniMeni = document.getElementById("glavniMeniLista");
    glavniMeni.innerHTML = `<li><a href="nekretnine.html"><strong>Nekretnine</strong></a></li>
                            <li><a href="prijava.html" id="prijavaLink"><strong>Prijava</strong></a></li>`;
    daLiJeKorisnikPrijavljen = localStorage.getItem("daLiJeKorisnikPrijavljen");
    
}

