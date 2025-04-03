spojiSveUpite();

if (localStorage.getItem("daLiJeKorisnikPrijavljen")) {
    document.getElementById("dodajUpit").style.display = 'block';
    document.getElementById("posaljiUpitBtn").onclick = function (event) {
        event.preventDefault();
        let id = localStorage.getItem("nekretnina-id");
        let tekst = document.getElementById("upitInput").value;
        PoziviAjax.postUpit(id, tekst, function (status, data) {
            if (status) {
                document.getElementById("upitInput").value = "";
                spojiSveUpite();
                alert("Upit uspješno dodan!");
            }
            else {
                alert("Greška!");
                document.getElementById("dodajUpit").style.display = 'none';
            }

        })
    }
}
else {
    document.getElementById("dodajUpit").style.display = 'none';
}

function spojiSveUpite() {
    KlikoviAjax.dajUpite(localStorage.getItem("nekretnina-id"), function (status, data) {
        if (status) {
            document.getElementById("upiti").innerHTML = ``;
            var upiti = JSON.parse(data);

            for (let i = 0; i < upiti.length; i++) {
                const upit = upiti[i];


                KlikoviAjax.getKorisnikById(upit.korisnikId, function (statusKorisnik, dataKorisnik) {
                    if (statusKorisnik) {

                        const korisnik = JSON.parse(dataKorisnik);
                        document.getElementById("upiti").innerHTML += `<div class="upit">
                    <strong>${korisnik.username}</strong><br>
                    <p>${upit.tekst_upita}</p>
                    </div>`
                    } else {
                        console.error("Greška pri dobavljanju podataka o korisniku.");
                    }
                });
            }
        } else {
            console.error("Greška pri dobavljanju upita.");
        }
    });

}