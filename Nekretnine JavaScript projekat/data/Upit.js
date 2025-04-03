const Sequelize = require('sequelize')
//const baza = require('./baza.js')

module.exports = function (sequelize,DataTypes){
    const upit = sequelize.define("upit",{
        tekst_upita: Sequelize.STRING,
    });
    
    return upit
}