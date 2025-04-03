const Sequelize = require("sequelize");
const sequelizeDb = new Sequelize("wt24","root","password",{host:"127.0.0.1",dialect:"mysql",logging:false});
const baza={};

baza.Sequelize=Sequelize;
baza.sequelize = sequelizeDb;

baza.korisnik = require('./Korisnik.js')(sequelizeDb);
baza.nekretnina = require('./Nekretnina.js')(sequelizeDb);
baza.upit = require('./Upit.js')(sequelizeDb);
baza.nekretninaMarketing = require('./NekretninaMarketing.js')(sequelizeDb)


baza.nekretnina.hasMany(baza.upit, {as: 'upiti'});
baza.korisnik.hasMany(baza.upit, {as: 'upiti'});
baza.nekretnina.hasOne(baza.nekretninaMarketing, {as: 'nekretnina'});


//baza.korisnik = require('./Korisnik.js')(sequelizeDb);

module.exports = baza;
