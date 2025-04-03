const db = require('./baza.js')
db.sequelize.sync({force:true}).then(function(){
    inicializacija().then(function(){
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function inicializacija(){
    var korisniciLista=[];
    var nekretnineLista=[];
    var upitiLista=[];
    var nekretnineMarketingLista=[];

    return new Promise(function(resolve,reject){
        korisniciLista.push(db.korisnik.create({ime:"Eman",prezime:"Hodzic",username:"ehodzic6",password:"$2b$10$RADbEEp2XG6pMSDQVOszXuxbtyAKxPf4rLcQGhg.z0DRPT621waMy"}));


        Promise.all(korisniciLista).then(function(){});

        nekretnineLista.push(db.nekretnina.create({tip_nekretnine:"Stan",naziv:"Useljiv stan Sarajevo",kvadratura:100,
        cijena:290000,tip_grijanja:"Plin",lokacija:"Novo Sarajevo",godina_izgradnje:2017,datum_objave:"10.1.2024.",
        opis:"Stan u Sarajevu"}));
        nekretnineLista.push(db.nekretnina.create({tip_nekretnine:"Stan",naziv:"Useljiv stan Sarajevo",kvadratura:50,
        cijena:69999,tip_grijanja:"Centralno",lokacija:"Novi Grad Sarajevo",godina_izgradnje:1973,datum_objave:"10.1.2024.",
        opis:"Adaptiran stan sa namještajem"}));
        nekretnineLista.push(db.nekretnina.create({tip_nekretnine:"Kuća",naziv:"Kuća sa okućnicom",kvadratura:175,
        cijena:325000,tip_grijanja:"Plin",lokacija:"Novi Grad Sarajevo",godina_izgradnje:2003,datum_objave:"10.1.2024.",
        opis:"Kuća ima dva sprata i veliku avliju."}));
        nekretnineLista.push(db.nekretnina.create({tip_nekretnine:"Kuća",naziv:"Kuća Poljine",kvadratura:350,
        cijena:1000000,tip_grijanja:"Plin",lokacija:"Centar Sarajevo",godina_izgradnje:2018,datum_objave:"10.1.2024.",
        opis:"Luksuzna vila sa pogledom"}));
        nekretnineLista.push(db.nekretnina.create({tip_nekretnine:"Poslovni prostor",naziv:"Poslovni prostor Sarajevo",kvadratura:100,
        cijena:900000,tip_grijanja:"Plin",lokacija:"Stari Grad Sarajevo",godina_izgradnje:2019,datum_objave:"10.1.2024.",
        opis:"Prodajem opremljen poslovni prostor na području općine Stari Grad u Sarajevu"}));
        nekretnineLista.push(db.nekretnina.create({tip_nekretnine:"Poslovni prostor",naziv:"Poslovni prostor Centar",kvadratura:60,
        cijena:1000,tip_grijanja:"Plin",lokacija:"Centar Sarajevo",godina_izgradnje:1983,datum_objave:"10.1.2024.",
        opis:"Izdajem poslovni prostor"}));


        Promise.all(nekretnineLista).then(function(){});

        upitiLista.push(db.upit.create({nekretninaId:1, korisnikId:1, tekst_upita:"Koliko ima spavaćih soba?"}));

        Promise.all(upitiLista).then(function(){});

        nekretnineMarketingLista.push(db.nekretninaMarketing.create({broj_klikova:0,broj_pretraga:0,nekretninaId:1}));
        nekretnineMarketingLista.push(db.nekretninaMarketing.create({broj_klikova:0,broj_pretraga:0,nekretninaId:2}));
        nekretnineMarketingLista.push(db.nekretninaMarketing.create({broj_klikova:0,broj_pretraga:0,nekretninaId:3}));
        nekretnineMarketingLista.push(db.nekretninaMarketing.create({broj_klikova:0,broj_pretraga:0,nekretninaId:4}));
        nekretnineMarketingLista.push(db.nekretninaMarketing.create({broj_klikova:0,broj_pretraga:0,nekretninaId:5}));
        nekretnineMarketingLista.push(db.nekretninaMarketing.create({broj_klikova:0,broj_pretraga:0,nekretninaId:6}));
    });
}