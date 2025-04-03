function spojiNekretnine(divReferenca, instancaModula, kriterij) {
    const lista=instancaModula.filtrirajNekretnine( kriterij );
    const listaDiv = document.getElementById(divReferenca.id);
    listaDiv.innerHTML = "";
    for(let nekretnina of lista){
        
        if(nekretnina.tip_nekretnine=="Stan" && kriterij.tip_nekretnine=="Stan"){
            let imgSrc="https://www.gradnja.rs/wp-content/uploads/2013/09/enterijer-stana-slike.jpg";
            listaDiv.innerHTML+=`<div class="stanItem" id="nekretnina-${nekretnina.id}">
            <img src="${imgSrc}" alt="Stan "><br><br>
            <p class="nazivKvadraturaNekretnine"><strong>${nekretnina.naziv}</strong></p>
            <p class="nazivKvadraturaNekretnine"><strong>${nekretnina.kvadratura}m<sup>2</sup></strong> </p>
            <p class="brojKlikova" id="klikovi-${nekretnina.id}"><strong>Broj klikova:</strong></p>
            <p class="brojPretraga" id="pretrage-${nekretnina.id}"><strong>Broj pretraga:</strong></p>
            <p class="godinaIzgradnje" id="godinaIzgradnje-${nekretnina.id}"> <strong>${nekretnina.godina_izgradnje} </strong></p>
            <p class="lokacija" id="lokacija-${nekretnina.id}"> <strong>${nekretnina.lokacija} </strong></p>
            <p class="cijenaNekretnine" > <strong>${nekretnina.cijena} KM</strong></p>
            
            <button type="button" class="detaljiBtn" onclick="clickHandle(${nekretnina.id})" data-id=${nekretnina.id}><strong>Detalji</strong></button>
            <button type="button" class="prikaziDetaljeBtn" id="detalji-${nekretnina.id}" onclick="clickHandle2(${nekretnina.id})" data-id=${nekretnina.id}><strong>Prikaži detalje</strong></button>
            
            </div>`
        }
        else if(nekretnina.tip_nekretnine=="Poslovni prostor" && kriterij.tip_nekretnine=="Poslovni prostor"){
            let imgSrc="https://maliganes.hr/wp-content/uploads/2018/08/poslovni-prostori.jpg";
            listaDiv.innerHTML+=`<div class="poslovniProstorItem" id="nekretnina-${nekretnina.id}">
            <img src="${imgSrc}"  alt="Poslovni prostor 1"><br><br>
            <p class="nazivKvadraturaNekretnine"><strong>${nekretnina.naziv}</strong></p>
            <p class="nazivKvadraturaNekretnine"><strong>${nekretnina.kvadratura}m<sup>2</sup></strong> </p>
            <p class="brojKlikova" id="klikovi-${nekretnina.id}"><strong>Broj klikova:</strong></p>
            <p class="brojPretraga" id="pretrage-${nekretnina.id}"><strong>Broj pretraga:</strong></p>
            <p class="godinaIzgradnje" id="godinaIzgradnje-${nekretnina.id}">  <strong>${nekretnina.godina_izgradnje} </strong></p>
            <p class="lokacija" id="lokacija-${nekretnina.id}"> <strong>${nekretnina.lokacija} </strong></p>
            <p class="cijenaNekretnine"> <strong>${nekretnina.cijena} KM</strong></p>
            
            <button type="button" class="detaljiBtn" onclick="clickHandle(${nekretnina.id})" data-id=${nekretnina.id}><strong>Detalji</strong></button>
            <button type="button" class="prikaziDetaljeBtn" id="detalji-${nekretnina.id}" onclick="clickHandle2(${nekretnina.id})" data-id=${nekretnina.id}><strong>Prikaži detalje</strong></button>
        </div>`
        }   
        else if(nekretnina.tip_nekretnine=="Kuća" && kriterij.tip_nekretnine=="Kuća"){
            let imgSrc="https://storefrontapi.commerce.xella.com/medias/sys_master/root/h77/hd8/9152791347230/ytong-kuca-letnja-01-xl-1920x768/ytong-kuca-letnja-01-xl-1920x768.jpg";
            listaDiv.innerHTML+=`<div class="kucaItem" id="nekretnina-${nekretnina.id}">
            <img src="${imgSrc}" alt="Kuća 1"><br><br>
            <p class="nazivKvadraturaNekretnine"><strong>${nekretnina.naziv}</strong></p>
            <p class="nazivKvadraturaNekretnine"><strong>${nekretnina.kvadratura}m<sup>2</sup></strong> </p>
            <p class="brojKlikova" id="klikovi-${nekretnina.id}"><strong>Broj klikova:</strong></p>
            <p class="brojPretraga" id="pretrage-${nekretnina.id}"><strong>Broj pretraga:</strong></p>
            <p class="godinaIzgradnje" id="godinaIzgradnje-${nekretnina.id}">  <strong>${nekretnina.godina_izgradnje} </strong></p>
            <p class="lokacija" id="lokacija-${nekretnina.id}"> <strong>${nekretnina.lokacija} </strong></p>
            <p class="cijenaNekretnine"> <strong>${nekretnina.cijena} KM</strong></p>
            <button type="button" class="detaljiBtn" onclick="clickHandle(${nekretnina.id})" data-id=${nekretnina.id}><strong>Detalji</strong></button>
            <button type="button" id="detalji-${nekretnina.id}" class="prikaziDetaljeBtn" onclick="clickHandle2(${nekretnina.id})" data-id=${nekretnina.id}><strong>Prikaži detalje</strong></button>
        </div>`
        }
        
    }
    
}

const divStan = document.getElementById("stanGrid");
const divKuca = document.getElementById("kucaGrid");
const divPp = document.getElementById("ppGrid");


let nekretnine = SpisakNekretnina();

function dajFiltriraneNekretnine(instancaModula,kriterij){
    return instancaModula.filtrirajNekretnine(kriterij);
}
PoziviAjax.getNekretnine(function(status,data){
    const listaKorisnika = [{
        id: 1,
        ime: "Neko",
        prezime: "Nekic",
        username: "username1",
    },
    {
        id: 2,
        ime: "Neko2",
        prezime: "Nekic2",
        username: "username2",
    }]



    if(status){
        
        const listaNekretnina=JSON.parse(data);
        nekretnine.init(listaNekretnina, listaKorisnika);

        //pozivanje funkcije
        let stanKriterij = Object();
        stanKriterij.tip_nekretnine = "Stan";
        let kucaKriterij = Object();
        kucaKriterij.tip_nekretnine = "Kuća";
        let ppKriterij = Object();
        ppKriterij.tip_nekretnine = "Poslovni prostor";
        
        spojiNekretnine(divStan, nekretnine, stanKriterij);
        spojiNekretnine(divKuca, nekretnine, kucaKriterij);
        spojiNekretnine(divPp, nekretnine, ppKriterij);

        
    }
    else{
        const listaNekretnina = [];
        nekretnine.init(listaNekretnina, listaKorisnika);
        alert("Greska")
    }
})


document.getElementById("filtrirajBtn").onclick = function(){
    let kriterij = Object();
    if(document.getElementById("minKvadratura").value!=""){
        kriterij.min_kvadratura = parseInt(document.getElementById("minKvadratura").value,10);
    }
    if(document.getElementById("maxKvadratura").value!=""){
        kriterij.max_kvadratura = parseInt(document.getElementById("maxKvadratura").value,10);
    }
    if(document.getElementById("minCijena").value!=""){
        kriterij.min_cijena = parseInt(document.getElementById("minCijena").value,10);
    }
    if(document.getElementById("maxCijena").value!=""){
        kriterij.max_cijena = parseInt(document.getElementById("maxCijena").value,10);
    }
    
   
    
    
   
    let kriterijStan = JSON.parse(JSON.stringify(kriterij));
    kriterijStan.tip_nekretnine = "Stan";
    let kriterijKuca = JSON.parse(JSON.stringify(kriterij));
    kriterijKuca.tip_nekretnine = "Kuća";
    let kriterijPp = JSON.parse(JSON.stringify(kriterij));
    kriterijPp.tip_nekretnine = "Poslovni prostor";
    
    
    
    spojiNekretnine(divStan,nekretnine,kriterijStan);
    spojiNekretnine(divKuca,nekretnine,kriterijKuca);
    spojiNekretnine(divPp,nekretnine,kriterijPp);

    
    let listaFiltriranihNekretnina = dajFiltriraneNekretnine(nekretnine,kriterij);
    
    let idFiltriranihNekretnina = [];

    listaFiltriranihNekretnina.forEach(nekretnina => {
        idFiltriranihNekretnina.push(nekretnina.id);
    });
    
    MarketingAjax.novoFiltriranje(idFiltriranihNekretnina);

    idFiltriranihNekretnina.forEach(id => {
        document.getElementById("klikovi-"+nekretninaId).value+=NekretnineKartica.dajKlikove(id);
    });



}

function clickHandle(nekretninaId){
    KlikoviAjax.dajKlikovePretrage(nekretninaId,function(status,data){
        const obj = JSON.parse(data);
        if(document.getElementById("klikovi-"+nekretninaId).style.display == 'block'){
            document.getElementById("nekretnina-"+nekretninaId).style.width = '300px';
            document.getElementById("klikovi-"+nekretninaId).style.display = 'none';
            document.getElementById("pretrage-"+nekretninaId).style.display = 'none';
            document.getElementById("lokacija-"+nekretninaId).style.display = 'none';
            document.getElementById("godinaIzgradnje-"+nekretninaId).style.display = 'none';
            document.getElementById("klikovi-"+nekretninaId).innerText = "Broj klikova:"
            document.getElementById("stanGrid").style.marginBottom = 'auto';
            document.getElementById("kucaGrid").style.marginBottom = 'auto';
            document.getElementById("ppGrid").style.marginBottom = 'auto';
            document.getElementById("detalji-"+nekretninaId).style.display = 'none';
        }
        else {
            document.getElementById("nekretnina-" + nekretninaId).style.width = '500px';
            document.getElementById("klikovi-" + nekretninaId).style.display = 'block';
            document.getElementById("pretrage-" + nekretninaId).style.display = 'block';
            document.getElementById("lokacija-" + nekretninaId).style.display = 'block';
            document.getElementById("godinaIzgradnje-" + nekretninaId).style.display = 'block';
            document.getElementById("klikovi-" + nekretninaId).innerHTML = `<strong>Broj klikova: ` + obj.broj_klikova + `</strong>`;
            document.getElementById("pretrage-" + nekretninaId).innerHTML = `<strong>Broj pretraga: ` + obj.broj_pretraga + `</strong>`;
            document.getElementById("stanGrid").style.marginBottom = '13%';
            document.getElementById("kucaGrid").style.marginBottom = '14%';
            document.getElementById("ppGrid").style.marginBottom = '13%';
            document.getElementById("ppGrid").style.marginBottom = '13%';
            
            document.getElementById("detalji-" + nekretninaId).style.display = 'block';

            MarketingAjax.klikNekretnina(nekretninaId);
        }
    });
   
    
        
    
    //const kartice = NekretnineKartica();
    
}

function clickHandle2(nekretninaId){
    localStorage.setItem("nekretnina-id",nekretninaId);
    window.location.href = './detalji.html';
}