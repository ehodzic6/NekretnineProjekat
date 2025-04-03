const Sequelize = require('sequelize');

module.exports = function (sequelize,DataTypes){
    const nekretninaMarketing = sequelize.define("nekretninaMarketing",{
        broj_klikova: Sequelize.INTEGER,
        broj_pretraga: Sequelize.INTEGER


    });

    
    return nekretninaMarketing;
}
