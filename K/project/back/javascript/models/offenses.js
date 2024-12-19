const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const hotel = sequelize.define('hotel',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    driver_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    driver_surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sum: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
}, {
    tableName: 'offenses',
    timestamps: false,
});

module.exports = hotel;