const sequelize = require('../util/database');

const Sequelize = require('sequelize');

const CartItem = sequelize.define('cart', {
    id : {
        type : Sequelize.INTEGER,
        allownull : false,
        autoIncrement : true,
        primaryKey : true,
    },
    quantity : Sequelize.INTEGER
});

module.exports = CartItem;