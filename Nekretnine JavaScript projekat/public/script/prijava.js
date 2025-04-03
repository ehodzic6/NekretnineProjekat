window.onload=function(){
	document.getElementById("prijavaDugme").onclick = function(event){
        event.preventDefault();
        PoziviAjax.postLogin(document.getElementById("username").value, document.getElementById("password").value, function(status, data){
            if(status){
                localStorage.setItem("daLiJeKorisnikPrijavljen",true);
                alert("Uspješna prijava!");
                window.location.replace('nekretnine.html');
                
                
            }
                
            else{
                alert("Neuspješna prijava!");
                localStorage.setItem("daLiJeKorisnikPrijavljen",false);
            }
        });
    }
    
}
	
