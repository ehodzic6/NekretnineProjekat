let SpisakNekretnina = function(){
    let listaNekretnina =[];
    let listaKorisnika = [];


    let init = function(ListaNekretnina, ListaKorisnika){
        listaNekretnina=ListaNekretnina;
        listaKorisnika=ListaKorisnika;
    }

    let filtrirajNekretnine = function(kriterij){
        //console.log(kriterij);
        if(kriterij!=undefined){
        let listaFiltriranihNekretnina=[];
        for(let n of listaNekretnina){
            let istina=true;
        
                if(kriterij.max_cijena!=undefined && kriterij.max_cijena<n.cijena){
                    istina=false;
                }
                else if(kriterij.min_cijena!=undefined && kriterij.min_cijena>n.cijena){
                    istina=false;
                }
                else if(kriterij.tip_nekretnine!=undefined && kriterij.tip_nekretnine!=n.tip_nekretnine){
                    istina=false;
                }
                else if(kriterij.max_kvadratura!=undefined && kriterij.max_kvadratura<n.kvadratura){
                    istina=false;
                }
                else if(kriterij.min_kvadratura!=undefined && kriterij.min_kvadratura>n.kvadratura){
                    istina=false;
                }
                if(istina)listaFiltriranihNekretnina.push(n);
        } 
    
        return listaFiltriranihNekretnina;
    }
    }

    let ucitajDetaljeNekretnine = function(id){
    
        for(let n of listaNekretnina){
            if(n.id==id){
                return n;
            }

        }
        return null;
    }


    return{
        init:init,
        filtrirajNekretnine:filtrirajNekretnine,
        ucitajDetaljeNekretnine:ucitajDetaljeNekretnine
    }
};

