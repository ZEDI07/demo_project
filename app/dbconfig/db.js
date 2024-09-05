const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_DATABASE
})

conn.connect((error)=>{
    if(error){
        console.log('something wrong')
    } else {
        console.log('database connected !!!')
    }
});

module.exports = conn