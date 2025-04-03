const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const port = 3000;
const session = require('express-session');
const db  = require('./data/baza.js');


app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

let daLiJeKorisnikPrijavljen=false;
let usernamePrijavljenogKorisnika="";
let korisnikId;

const jsonPath = 'data/korisnici.json';
let jsonData;
fs.readFile(jsonPath, 'utf-8', (err,data) =>{
     jsonData=JSON.parse(data);
})

app.get('/meni.html',(req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'meni.html'));
});

app.get('/detalji.html',(req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'detalji.html'));
    
});

app.get('/nekretnine.html',(req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'nekretnine.html'));
    
});

app.get('/profil.html',(req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'profil.html'));
   
});

app.get('/prijava.html',(req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'prijava.html'));
    
});

app.post('/login', (req,res) => {
    const {username: reqUsername, password: reqPassword} = req.body;
    db.korisnik.findOne({where:{username: reqUsername}}).then((korisnik =>{
        if(korisnik!=undefined){
        var result = bcrypt.compare(reqPassword,korisnik.password) 
            if(korisnik.username==reqUsername && result){
                res.status(200).send(JSON.stringify({"poruka":"Uspješna prijava"}));
                daLiJeKorisnikPrijavljen = true;
                usernamePrijavljenogKorisnika= korisnik.username;
                korisnikId = korisnik.id;
            }
            else{
                res.status(401).send(JSON.stringify({"greska":"Neuspješna prijava1"}));
                
            }
        }   
        
        else{
            res.status(401).send(JSON.stringify({"greska":"Neuspješna prijava2"}));
        }
        }
        ));
    
    });



app.post('/logout', (req,res) =>{
    if(daLiJeKorisnikPrijavljen){
        req.session.destroy();
        res.status(200);
        res.json({poruka: "Uspješno ste se odjavili"});
        daLiJeKorisnikPrijavljen = false;
    }
    else{
        res.status(401);
        res.json({greska: "Neautorizovan pristup"});
    }
});

app.get('/korisnik', (req,res) =>{
    if(daLiJeKorisnikPrijavljen){
    db.korisnik.findOne({where:{username: usernamePrijavljenogKorisnika}}).then(korisnik =>{
    res.status(200);
    res.json({id: korisnik.id, ime: korisnik.ime, prezime: korisnik.prezime, username: korisnik.username, password: korisnik.password});
    })}
    else{
        res.status(401);
        res.json({greska: "Neautorizovan pristup"});
    }

    


});

app.put('/korisnik', (req,res) => {
    if(daLiJeKorisnikPrijavljen){
       

        const {ime: reqIme, prezime: reqPrezime, username: reqUsername, password: reqPassword} = req.body;
        
        let korisnik=Object();
        
        if(reqIme!=undefined){
           korisnik.ime = reqIme;
        }
        
        if(reqPrezime!=undefined){
            korisnik.prezime = reqPrezime;
        }
        
        if(reqUsername!=undefined){
           korisnik.username = reqUsername;
            usernamePrijavljenogKorisnika = reqUsername;
        }
        
        if(reqPassword!=undefined){
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(reqPassword,salt);
           korisnik.password = hashedPassword;
        }
        db.korisnik.update(korisnik,{where:{username:usernamePrijavljenogKorisnika}});
        
        res.status(200);
        res.json({poruka: "Podaci su uspješno ažurirani"});
    }
    else{
        res.status(401);
        res.json({greska: "Neautorizovan pristup"});
    }
});

app.get('/nekretnine', (req,res) => {
    db.nekretnina.findAll().then((nekretnine)=>{
        res.status(200).json(nekretnine);
    })

});

app.post('/upit', (req,res) => {
    if(daLiJeKorisnikPrijavljen){
        const {nekretnina_id: id, tekst_upita: tekst} = req.body;
        
        db.nekretnina.findOne({where: {id: id}}).then(nekretnina =>{
            if (nekretnina) {
                db.upit.create({ nekretninaId: id, tekst_upita: tekst, korisnikId: korisnikId });
                res.status(200);
                res.json(nekretnina);
            }
            else{
                res.status(401);
                res.json("Nekretnina sa tim id-em ne postoji");
            }
        })
        
    }
    else{
        res.status(401);
        res.json({greska: "Neautorizovan pristup"});
    }
});
app.post('/marketing/nekretnine', function(req, res) {
    let idFiltriranihNekretnina = req.body.nizNekretnina;
    
    for(let id of idFiltriranihNekretnina){
        db.nekretninaMarketing.findOne({where: {nekretninaId: id}}).then((nekretninaMarketing => {
            let noviPodaci = Object();
            noviPodaci.broj_klikova=nekretninaMarketing.broj_klikova;
            noviPodaci.nekretninaId = nekretninaMarketing.nekretninaId;
            let brojPretraga = nekretninaMarketing.broj_pretraga;
            brojPretraga++;
            noviPodaci.broj_pretraga=brojPretraga;
            db.nekretninaMarketing.update(noviPodaci,{where:{nekretninaId: id}})
            res.status(200).send();
        }))
    }
    
    
    
});

app.post('/marketing/nekretnina/:id', function(req, res) {
   
    db.nekretninaMarketing.findOne({where: {nekretninaId: req.params.id}}).then((nekretninaMarketing => {
        let noviPodaci = Object();
        noviPodaci.broj_pretraga=nekretninaMarketing.broj_pretraga;
        noviPodaci.nekretninaId = nekretninaMarketing.nekretninaId;
        let brojKlikova = nekretninaMarketing.broj_klikova;
        brojKlikova++;
        noviPodaci.broj_klikova=brojKlikova;
        db.nekretninaMarketing.update(noviPodaci,{where:{nekretninaId: req.params.id}})
        res.status(200).send();
    }))
    
});
app.post('/marketing/osvjezi', function(req,res){
    
});

app.get('/klikovi/:id', function(req,res){
    db.nekretninaMarketing.findOne({where: {nekretninaId: req.params.id}}).then((nekretninaMarketing => {
        let noviPodaci = Object();
        noviPodaci.broj_pretraga=nekretninaMarketing.broj_pretraga;
        noviPodaci.broj_klikova=nekretninaMarketing.broj_klikova;
        res.status(200).json(noviPodaci);
    }))
})

app.get('/nekretnina/:id', function(req,res){
    db.nekretnina.findOne({where: {id: req.params.id}}).then((nekretnina)=>{
        let poruka = "Nekretnina sa id-em "+req.params.id+" ne postoji"
        if(nekretnina)res.status(200).json(nekretnina);
        else res.status(400).json({greska: poruka});
    })
})

app.get('/upiti/:id', function(req,res){
    db.upit.findAll({where: {nekretninaId: req.params.id}}).then((upiti => {
        if(upiti)
            res.status(200).json(upiti);
        else
            res.status(400).send();
    }))
})

app.get('/korisnikbyid/:id', function(req,res){
    db.korisnik.findOne({where: {id: req.params.id}}).then((korisnik => {
        
        res.status(200).json(korisnik);
    }))
})
app.listen(3000);