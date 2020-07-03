"use strict";
const mysql = require("mysql");
const options = require("./connectionOptions.json");

/**
 * Função para retornar a lista de pessoas da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getPeople(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT id, name, birthDate, idCountry, timeSpan FROM person";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query to person table" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "person": rows });
        }
    });
}
module.exports.getPeople = getPeople;










function getSession(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT id, descriptionSession, assignationSession, idCountry, timeSpan FROM session";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query to person session" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "session": rows });
        }
    });
}
module.exports.getSession = getSession;















/**
 * Função para retornar a lista de pessoas da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getCountries(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT id, name, shortName FROM country";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query to country table" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "country": rows });
        }
    });
}
module.exports.getCountries = getCountries;

/**
 * Função que permite criar ou editar uma pessoa, consoante o pedido enviado pelo cliente.
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
function createUpdatePerson(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var name = req.body.name;
    var birthDate = (req.body.birthDate) ? req.body.birthDate : null;
    var idCountry = (req.body.idCountry) ? req.body.idCountry : null;
    var timeSpan = (req.body.timeSpan) ? req.body.timeSpan : null;
    var sql;
    if (req.method === "PUT") {
        sql = mysql.format("UPDATE person SET name=?, birthdate=?, idCountry=?, timeSpan=? WHERE id=?", [name, birthDate, idCountry, timeSpan, req.params.id]);
    } else {
        if (req.method === "POST") {
            sql = mysql.format("INSERT INTO person(name, birthdate, idCountry, timeSpan) VALUES (?,?,?,?)", [name, birthDate, idCountry, timeSpan]);
        }
    }
    connection.query(sql,function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(404);
                    } else {
                        res.send(rows);
                    }
        });
    connection.end();
}
module.exports.createUpdatePerson = createUpdatePerson;





















function createUpdateSession(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var descriptionSession = req.body.descriptionSession;
    var assignationSession = (req.body.assignationSession) ? req.body.assignationSession : null;
    var idCountry = (req.body.idCountry) ? req.body.idCountry : null;
    var timeSpan = (req.body.timeSpan) ? req.body.timeSpan : null;
    var sql;
    if (req.method === "PUT") {
        sql = mysql.format("UPDATE session SET descriptionSession=?, assignationSession=?, idCountry=?, timeSpan=? WHERE id=?", [descriptionSession, assignationSession, idCountry, timeSpan, req.params.id]);
    } else {
        if (req.method === "POST") {
            sql = mysql.format("INSERT INTO session(descriptionSession, assignationSession, idCountry, timeSpan) VALUES (?,?,?,?)", [descriptionSession, assignationSession, idCountry, timeSpan]);
        }
    }
    connection.query(sql,function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(404);
                    } else {
                        res.send(rows);
                    }
        });
    connection.end();
}
module.exports.createUpdateSession = createUpdateSession;










/**
 * Função que permite remover uma pessoa
 * 
 * @param {Object} request pedido do cliente
 * @param {Object} response resposta do servidor
 */
function removePerson(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var sql = mysql.format("DELETE FROM person WHERE id = ?", [req.params.id]);
    connection.query(sql,
        function (err, rows, fields) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.send();
            }
        });
    connection.end();
}
module.exports.removePerson = removePerson;















function removeSession(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var sql = mysql.format("DELETE FROM session WHERE id = ?", [req.params.id]);
    connection.query(sql,
        function (err, rows, fields) {
            if (err) {
                res.sendStatus(404);
            } else {
                res.send();
            }
        });
    connection.end();
}
module.exports.removeSession = removeSession;










































/**
 * Função para retornar a lista de pessoas da BD.
 * @param {*} req 
 * @param {*} res 
 */
function getStat(req, res) {
    var connection = mysql.createConnection(options);
    connection.connect();
    var query = "SELECT id, wins, loses, idPerson FROM stat";
    connection.query(query, function (err, rows) {
        if (err) {
            res.json({ "Erro": true, "Message": "Error MySQL query to stat table" });
        } else {
            res.json({ "Ok": false, "Message": "Success", "stat": rows });
        }
    });
}
module.exports.getStat = getStat;

