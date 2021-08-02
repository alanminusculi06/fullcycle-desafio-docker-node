const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')

function createTable() {
    const connection = mysql.createConnection(config)
    const sql =
        "CREATE TABLE IF NOT EXISTS `people` ( " +
        " `name` VARCHAR(50) NOT NULL " +
        ") ";
    connection.query(sql)
    connection.end()
}

function insert(text) {
    const connection = mysql.createConnection(config)
    const sql = `INSERT INTO people (name) values('${text}')`
    connection.query(sql)
    connection.end()
}

findAll = function (callback) {
    const connection = mysql.createConnection(config)
    connection.query('SELECT name FROM people', function (err, rows, fields) {
        connection.end();
        callback(err, rows);
    });
};

app.get('/', (req, res) => {
    insert("Alan")
    findAll(function (err, results) {
        if (err)
            throw err;
        else {
            const rows = results;
            var result = "<h1>Full Cycle Rocks!</h1><ul>"
            rows.forEach(row => {
                result += "<li>" + row['name'] + "</li>"
            });
            result += "</ul>"
            res.send(result);
        }
    });
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})

createTable();