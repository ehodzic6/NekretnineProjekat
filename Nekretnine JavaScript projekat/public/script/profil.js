window.onload = function(){
    PoziviAjax.getKorisnik(function(status,data){
        const {id,ime,prezime,username,password} = JSON.parse(data);
        document.getElementById("ime").value = ime;
        document.getElementById("prezime").value = prezime;
        document.getElementById("username").value = username;

        document.getElementById("azurirajInfo").onclick = function(){
            var username2= document.getElementById("username").value;
            var ime2 = document.getElementById("ime").value;
            var prezime2 = document.getElementById("prezime").value;
            var password2 = document.getElementById("password").value;
            var noviPodaci = JSON.stringify({"username":username2 ,"ime":ime2,"prezime": prezime2,"password": password2});
            PoziviAjax.putKorisnik(noviPodaci, function(status,data){
                if(status){
                    alert("Podaci azurirani")
                }
                else{
                    alert("Greska")
                }
            })
        }
        
    });
    
}

