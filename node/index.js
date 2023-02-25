const express = require('express');
const app = express();
const port = 3000;
const config ={
    host:'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const conn = mysql.createConnection(config);




let sql = `DROP TABLE IF EXISTS pessoas;`
conn.query(sql);
sql = `CREATE TABLE pessoas (     id INT AUTO_INCREMENT PRIMARY KEY,     name VARCHAR(255) NOT NULL);`
conn.query(sql);
sql = `INSERT into pessoas(name) values ('Pessoa1'),('Pessoa2'),('Pessoa3'),('Pessoa4'),('Pessoa5');`
conn.query(sql);


app.get('/', (req,res)=>{
    conn.query("SELECT * FROM pessoas", function (err, result, fields) {
        if (err) throw err;
        var itens = result.map((it) => it.name );
        var fit = ""
        itens.forEach((it) => {fit += `<p>${it}</p>` })
        
        res.send('<style>p { margin: 0px}</style><h1>Full Cycle Rocks!</h1>'+fit);
    })
})

app.listen(port,()=>{
    console.log(`Servidor na porta ${port}`)
})
