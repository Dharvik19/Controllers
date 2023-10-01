const mysql = require('mysql2');

//two ways set up one connection to run queries but we need to end the connection 
// after the query is done but we need to do alot of requests and this way we need to rerun the code as well
//hence we create a connection poo instead 

const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database : 'node-mysql',
    password : 'Dharvik.Mysql',
});

module.exports = pool.promise();