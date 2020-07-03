"use strict";





/**
 * Função que será executada quando a página estiver toda carregada, criando a variável global "info" com um objeto Information
 * Aproveitamos ainda para solicitar ao servidor o carregamento de dados de forma assincrona(ajax)
 * @memberof window
 * @params {Event} event - objeto que representará o evento
 */
var info = new Information("divInformation");
window.onload = function (event) {
    info.getPerson();
    info.getCountry();
    info.getSession();
    info.getStats();

    window.info = info;

};

/** 
* @class Guarda toda informação necessaria na execução do exercicio 
* @constructs Informacao
* @param {string} id - id do elemento HTML que contém a informação.
* 
* @property {string} id - id do elemento HTML que contém a informação.
* @property {country[]} countries - Array de objetos do tipo Country, para guardar todos os countries do nosso sistema
* @property {person[]} people - Array de objetos do tipo person, para guardar todas as pessoas do nosso sistema
* @property {session[]} session - Array de objetos do tipo session, para guardar todas as pessoas do nosso sistema
*/
function Information(id) {
    this.id = id;
    this.people = [];
    this.countries = [];



    //table session


    this.session = [];
    this.stats = [];
};

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade pessoa 
* @constructs Person
* @param {int} id - id da pessoa
* @param {int} name - nome da pessoa
* @param {Date} birthDate - data de nascimento da pessoa
* @param {int} idCountry - id do pais da pessoa
*/
function Person(id, name, birthDate, idCountry, timeSpan) {
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
    this.idCountry = idCountry;
    this.timeSpan = timeSpan;
};

/** 
* @class Estrutura com capacidade de armazenar o estado de uma entidade país 
* @constructs Person
* @param {int} id - id do país
* @param {int} name - nome do país
* @param {int} shortName - abreviatura
*/
function Country(id, name, shortName) {
    this.id = id;
    this.name = name;
    this.shortName = shortName;
};

function Session(id, descriptionSession, assignationSession, idCountry, timeSpan) {
    this.id = id;
    this.descriptionSession = descriptionSession;
    this.assignationSession = assignationSession;
    this.idCountry = idCountry;
    this.timeSpan = timeSpan;
};


function Stats(id, wins, loses, idPerson) {
    this.id = id;
    this.wins = wins;
    this.loses = loses;
    this.idPerson = idPerson;

};


/**
 * coloca a palavra "home" no div titulo e limpa o div informação
 */
Information.prototype.showHome = function () {
    document.getElementById("headerTitle").textContent = "Home";
    var d = document.createElement("div");
    replaceChilds(this.id, d);

    document.getElementById("formPerson").style.display = "none";

};

Information.prototype.showGraph = function (wins,loses) {
    document.getElementById("headerTitle").textContent = "Graph";
    var d = document.createElement("div");
    replaceChilds(this.id, d);
  //  d.id = "doughnut-chart";
  d.id = "chartdiv";
    var s = document.createElement('script');
   // s.type = 'text/javascript';
  //  s.src="https://www.gstatic.com/charts/loader.js";
    var code = ' new Chart(document.getElementById("doughnut-chart"), {type: "doughnut",data: {labels: ["WIN", "LOSES"],datasets: [{label: "Population (millions)", backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],data: [2478, 5267]}]},options: {title: { display: true,text: " Global Ranking  "}}});';
    var code1 = ' var chart = AmCharts.makeChart("chartdiv", {"type": "pie","theme": "light","dataProvider": [{"title": "WIN","value":'+wins+'}, {"title": "LOSES","value": '+loses+'}],"titleField": "title","valueField": "value","labelRadius": 5,"radius": "42%","innerRadius": "60%","labelText": "[[title]]","export": {"enabled": true}});';
   
   
    try {
        s.appendChild(document.createTextNode(code1));
        document.body.appendChild(s);
    } catch (e) {
       s.text = code1;
        document.body.appendChild(s);
   }






  // document.body.appendChild(d);


    
   // replaceChilds("divInformation", d);
  
    document.getElementById("formPerson").style.display = "none";

};
































































Information.prototype.showSession = function () {

    document.getElementById("headerTitle").textContent = "Session";
    document.getElementById("formSession").style.display = "none";
    document.getElementById("formSession").style.display = "none";
    var table = document.createElement("table");
    table.id = "tableSession";
    table.className = "table table-horizontal table-highlight";
    table.appendChild(tableHead(new Session()));
    for (var i = 0; i < this.session.length; i++) {
        table.appendChild(tableLine(this.session[i]));
        console.log(this.session[i]);
    }
    var divTableSession = document.createElement("divTableSession");
    divTableSession.setAttribute("id", "divTableSession");//não tenho a certeza
    divTableSession.appendChild(table);
    function deleteSessionEventHandler() {
        var table = document.getElementById("tableSession");
        for (var i = 1, row; row = table.rows[i]; i++) {
            var checkBoxSession = row.cells[0].firstChild;
            var idSession = row.cells[1].firstChild.nodeValue;
            if (checkBoxSession.checked) {
                info.removeSession(idSession);

            }
        }
    }
    function newSessionEventHandler() {
        replaceChilds("divTableSession", document.createElement("div"));
        document.getElementById("formSession").action = "javascript: info.processingSession('create');";
        document.getElementById("formSession").style.display = "block";
        for (var i = 0; i < info.countries.length; i++)
            document.getElementById("countriesSession").options[i] = new Option(info.countries[i].name, info.countries[i].id);
    }
    function updateSessionEventHandler() {
        var idSession = 0;
        for (var i = 1; i < table.rows.length; i++) {
            var checkBox = table.rows[i].cells[0].firstChild;
            if (checkBox.checked)
                idSession = parseInt(table.rows[i].cells[1].firstChild.nodeValue);
        }
        replaceChilds("divTableSession", document.createElement("div"));
        document.getElementById("formSession").action = "javascript: info.processingSession('update');";
        document.getElementById("formSession").style.display = "block";
        document.getElementById("idSession").value = idSession;
        document.getElementById("descriptionSession").value = info.session[info.session.findIndex(i => i.id === idSession)].descriptionSession;
        document.getElementById("assignationSession").value = info.session[info.session.findIndex(i => i.id === idSession)].assignationSession.toString().split('T')[0];
        document.getElementById("timeSpanSession").value = info.session[info.session.findIndex(i => i.id === idSession)].timeSpan;
        var idCountry = info.session[info.session.findIndex(i => i.id === idSession)].idCountry;
        for (var i = 0; i < info.countries.length; i++) {
            document.getElementById("countriesSession").options[i] = new Option(info.countries[i].name, info.countries[i].id);
            if (info.countries[i].id === idCountry)
                document.getElementById("countriesSession").selectedIndex = i;
        }
    }
    createButton(divTableSession, newSessionEventHandler, "New Session");

    var btn = createButton(divTableSession, deleteSessionEventHandler, "Delete Session");

    createButton(divTableSession, updateSessionEventHandler, "Update Session");
    replaceChilds(this.id, divTableSession);
};










Information.prototype.removeSession = function (id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8081/session/" + id, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            info.session.splice(info.session.findIndex(i => i.id === id), 1);

            info.showSession();

        }
    };
    xhr.send();
    //xhr.open("GET", "http://localhost:8081/session", true);


}











Information.prototype.processingSession = function (acao) {
    var id = document.getElementById("idSession").value;
    var descriptionSession = document.getElementById("descriptionSession").value;
    var assignationSession = document.getElementById("assignationSession").value;
    var timeSpan = document.getElementById("timeSpanSession").value;
    var countryList = document.getElementById("countriesSession");
    var idCountry = countryList.options[countryList.selectedIndex].value;
    var session = { id: id, descriptionSession: descriptionSession, assignationSession: assignationSession, idCountry: idCountry, timeSpan: timeSpan };
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    if (acao === "create") {
        xhr.onreadystatechange = function () {
            if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                var newSession = new Session(xhr.response.insertId, descriptionSession, assignationSession, idCountry, timeSpan);
                info.session.push(newSession);
                info.showSesssion();
            }
        }
        xhr.open("POST", "http://localhost:8081/session", true);
    } else if (acao === "update") {
        xhr.onreadystatechange = function () {
            if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                info.session.splice(info.session.findIndex(i => i.id === id), 1);
                info.session.push(session);

                info.showSession();
            }
        }
        xhr.open("PUT", "http://localhost:8081/session/" + id, true);
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(session));
}

Information.prototype.getSession = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8081/session", true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            info.session = [];
            response.session.forEach(function (current) {
                info.session.push(new Session(current.id, current.descriptionSession, (current.assignationSession) ? current.assignationSession.toString().split('T')[0] : "-",
                    current.idCountry, current.timeSpan));
            });
        }
    };
    xhr.send();

};






















































/**
 * coloca a palavra "People" no div titulo, cria dinamicamente uma tabela com a informação das pessoas e respetivos botões de crud
 */
Information.prototype.showPerson = function () {
    document.getElementById("headerTitle").textContent = "Players";
    document.getElementById("formPerson").style.display = "none";
    document.getElementById("formSession").style.display = "none";
    var table = document.createElement("table");
    table.id = "tablePerson";
    table.className = "table table-horizontal table-highlight";
    table.appendChild(tableHead(new Person()));
    for (var i = 0; i < this.people.length; i++) {
        table.appendChild(tableLine(this.people[i]));
    }
    var divTable = document.createElement("divTable");
    divTable.setAttribute("id", "divTable");
    divTable.appendChild(table);
    function deletePersonEventHandler() {
        var table = document.getElementById("tablePerson");
        for (var i = 1, row; row = table.rows[i]; i++) {
            var checkBox = row.cells[0].firstChild;
            var idPerson = row.cells[1].firstChild.nodeValue;
            if (checkBox.checked) {
                info.removePerson(idPerson);
            }
        }
    }
    function newPersonEventHandler() {
        replaceChilds("divTable", document.createElement("div"));
        document.getElementById("formPerson").action = "javascript: info.processingPerson('create');";
        document.getElementById("formPerson").style.display = "block";
        for (var i = 0; i < info.countries.length; i++)
            document.getElementById("countries").options[i] = new Option(info.countries[i].name, info.countries[i].id);
    }
    function updatePersonEventHandler() {
        var idPerson = 0;
        for (var i = 1; i < table.rows.length; i++) {
            var checkBox = table.rows[i].cells[0].firstChild;
            if (checkBox.checked)
                idPerson = parseInt(table.rows[i].cells[1].firstChild.nodeValue);
        }
        replaceChilds("divTable", document.createElement("div"));
        document.getElementById("formPerson").action = "javascript: info.processingPerson('update');";
        document.getElementById("formPerson").style.display = "block";
        document.getElementById("id").value = idPerson;
        document.getElementById("name").value = info.people[info.people.findIndex(i => i.id === idPerson)].name;
        document.getElementById("date").value = info.people[info.people.findIndex(i => i.id === idPerson)].birthDate.toString().split('T')[0];
        document.getElementById("timeSpan").value = info.people[info.people.findIndex(i => i.id === idPerson)].timeSpan;
        var idCountry = info.people[info.people.findIndex(i => i.id === idPerson)].idCountry;
        for (var i = 0; i < info.countries.length; i++) {
            document.getElementById("countries").options[i] = new Option(info.countries[i].name, info.countries[i].id);
            if (info.countries[i].id === idCountry)
                document.getElementById("countries").selectedIndex = i;
        }
    }
    createButton(divTable, newPersonEventHandler, "New Person");
    createButton(divTable, deletePersonEventHandler, "Delete Person");
    createButton(divTable, updatePersonEventHandler, "Update Person");
    replaceChilds(this.id, divTable);
};

/**
 * Função genérica que cria um botão HTML, dá-lhe um evento e coloca-o na árvore de nós
 * @param {HTMLElement} fatherNode - nó pai do botão
 * @param {function} eventHandler - evento do botão.
 * @param {String} value - texto do botão.
 */
function createButton(fatherNode, eventHandler, value) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = value;
    button.className = "btn";
    button.addEventListener("click", eventHandler);
    fatherNode.appendChild(button);

}

/**
 * Função que substitui todos os elementos filhos de um elemento HTML por um novo elemento HTML (facilitador de DOM)
 * @param {string} id - id do elemento HTML para o qual se pretende substituir os filhos.
 * @param {HTMLElement} newSon - elemento HTML que será o novo filho.
 */
function replaceChilds(id, newSon) {
    var no = document.getElementById(id);
    while (no.hasChildNodes()) {
        no.removeChild(no.lastChild);
    }
    no.appendChild(newSon);
};

/**
 * Função que recebe um qualquer objeto e retorna dinamicamente uma linha de tabela HTML com os supostos headers
 * @param {Object} object - objecto do qual vamos transformar os atributos e TH
 */
function tableHead(object) {
    var tr = document.createElement("tr");
    tr.appendChild(document.createElement("th"));
    for (var property in object) {
        if ((object[property] instanceof Function) === false) {
            var td = document.createElement("th");
            td.textContent = property[0].toUpperCase() + property.substr(1, property.length - 1);;
            tr.appendChild(td);
        }
    }
    return tr;
};

/**
 * Função que recebe um qualquer objeto e retorna dinamicamente uma linha de tabela HTML com informação relativa ao estado das suas propriedades
 * @param {Object} object - objecto do qual vamos transformar o conteudo dos seus atributos em TD
 */
function tableLine(object) {
    var tr = document.createElement("tr");
    tr.appendChild(createCellCheckbox());
    for (var property in object) {
        if ((object[property] instanceof Function) === false) {
            var td = document.createElement("td");
            td.textContent = object[property];
            tr.appendChild(td);
        }
    }
    return tr;
};
/**
 * Função genérica que tem como objetivo a criação de uma coluna com checkbox
 */
function createCellCheckbox() {
    var td = document.createElement("td");
    var check = document.createElement("input");
    check.type = "checkbox";
    td.appendChild(check);
    return td;
}

/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso person através do verbo GET, usando pedidos assincronos e JSON
  */
Information.prototype.getPerson = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8081/person", true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            info.people = [];
            response.person.forEach(function (current) {
                info.people.push(new Person(current.id, current.name, (current.birthDate) ? current.birthDate.toString().split('T')[0] : "-",
                    current.idCountry, current.timeSpan));
            });
        }
    };
    xhr.send();
};
/**
 * Função que que tem como principal objetivo solicitar ao servidor NODE.JS o recurso país através do verbo GET, usando pedidos assincronos e JSON
  */
Information.prototype.getCountry = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8081/country", true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            info.countries = [];
            response.country.forEach(function (current) {
                info.countries.push(new Country(current.id, current.name, current.shortName));
            });
        }
    };
    xhr.send();
};
/**
 * Função que apaga o recurso pessoa com ym pedido ao NODE.JS através do verbo DELETE, usando pedidos assincronos e JSON
  */
Information.prototype.removePerson = function (id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "http://localhost:8081/person/" + id, true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            info.people.splice(info.people.findIndex(i => i.id === id), 1);
            info.showPerson();
        }
    };
    xhr.send();

}
/**
 * Função que insere ou atualiza o recurso pessoa com um pedido ao servidor NODE.JS através do verbo POST ou PUT, usando pedidos assincronos e JSON
 *  * @param {String} acao - controla qual a operação do CRUD queremos fazer
  */
Information.prototype.processingPerson = function (acao) {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var birthDate = document.getElementById("date").value;
    var timeSpan = document.getElementById("timeSpan").value;
    var countryList = document.getElementById("countries");
    var idCountry = countryList.options[countryList.selectedIndex].value;
    var person = { id: id, name: name, birthDate: birthDate, idCountry: idCountry, timeSpan: timeSpan };
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    if (acao === "create") {
        xhr.onreadystatechange = function () {
            if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                var newPerson = new Person(xhr.response.insertId, name, birthDate, idCountry, timeSpan);
                info.people.push(newPerson);
                info.showPerson();
            }
        }
        xhr.open("POST", "http://localhost:8081/person", true);
    } else if (acao === "update") {
        xhr.onreadystatechange = function () {
            if ((xhr.readyState == XMLHttpRequest.DONE) && (this.status === 200)) {
                info.people.splice(info.people.findIndex(i => i.id === id), 1);
                info.people.push(person);

                info.showPerson();
            }
        }
        xhr.open("PUT", "http://localhost:8081/person/" + id, true);
    }
    //location.reload();
    //info.showPerson();
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(person));

}






























































Information.prototype.getStats = function () {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8081/stats", true);
    xhr.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            var response = JSON.parse(xhr.responseText);
            info.stats = [];
            response.stat.forEach(function (current) {
                info.stats.push(new Stats(current.id, current.wins, current.loses, current.idPerson));
            });
        }
    };
    xhr.send();
};
















Information.prototype.showStats = function () {

    document.getElementById("headerTitle").textContent = "STATS";
    document.getElementById("formSession").style.display = "none";
    document.getElementById("formSession").style.display = "nidone";
    //   var div =document.createElement("div");
    //var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
    //  div.id="chartdiv";
    var tableStat = document.createElement("table");
    tableStat.id = "tableStats";
    tableStat.className = "table table-horizontal table-highlight";
    tableStat.appendChild(tableHead(new Stats()));
    for (var i = 0; i < this.stats.length; i++) {
        tableStat.appendChild(tableLine(this.stats[i]));
        console.log(this.stats[i]);
    }
    var divTableStats = document.createElement("divTableStats");
    divTableStats.setAttribute("id", "divTableStats");//não tenho a certeza
    divTableStats.appendChild(tableStat);



    function showGraph() {
        console.log("Not implement");
        for (var i = 1, row; row = tableStat.rows[i]; i++) {
            var checkBoxStat = row.cells[0].firstChild;
            var wins = row.cells[2].firstChild.nodeValue;
            var loses = row.cells[3].firstChild.nodeValue;
            if (checkBoxStat.checked) {
               // info.removeSession(idSession);

        info.showGraph(wins , loses);
            }
        // window.location.href="stats.html";

    }
}
    /*
    
        function deleteStatsEventHandler(){
            var table = document.getElementById("tableStats");
            for (var i = 1, row; row = table.rows[i]; i++) {
                var checkBoxStat = row.cells[0].firstChild;
                var idStat = row.cells[1].firstChild.nodeValue;
                if (checkBoxSession.checked) {
                    info.removeStats(idStat);
                }
            }
        }
        
        function newStatEventHandler(){
            replaceChilds("divTableStats",document.createElement("div"));
            document.getElementById("formSession").action="javascript: info.processingSession('create');";
            document.getElementById("formSession").style.display="block";
            for(var i=0;i<info.countries.length;i++)
                document.getElementById("countriesSession").options[i] =new Option(info.countries[i].name, info.countries[i].id);
        }
        function updateStatEventHandler(){
            var idStat =0;
            for (var i = 1; i<table.rows.length; i++) {
                var checkBox = table.rows[i].cells[0].firstChild;
                if (checkBox.checked)
                idStat = parseInt(table.rows[i].cells[1].firstChild.nodeValue);
            }
            
            replaceChilds("divTableStats",document.createElement("div"));
            document.getElementById("formSession").action="javascript: info.processingStat('update');";
            document.getElementById("formSession").style.display="block";
            document.getElementById("idSession").value=idSession;
            document.getElementById("descriptionSession").value=info.session[info.session.findIndex(i => i.id === idSession)].descriptionSession;
            document.getElementById("assignationSession").value=info.session[info.session.findIndex(i => i.id === idSession)].assignationSession.toString().split('T')[0];
            document.getElementById("timeSpanSession").value=info.session[info.session.findIndex(i => i.id === idSession)].timeSpan;
            var idCountry = info.session[info.session.findIndex(i => i.id === idSession)].idCountry;
            for(var i=0;i<info.countries.length;i++){
                document.getElementById("countriesSession").options[i] =new Option(info.countries[i].name, info.countries[i].id);
                if(info.countries[i].id===idCountry)
                    document.getElementById("countriesSession").selectedIndex=i;
            }
        }
        createButton(divTableSession, newSessionEventHandler, "New Session");
    
        var btn=createButton(divTableSession, deleteSessionEventHandler, "Delete Session");
        
        createButton(divTableSession, updateSessionEventHandler, "Update Session");
        
        */

    //  xhr.setRequestHeader('Content-Type', 'application/json');
    //xhr.send(JSON.stringify(person));
    createButton(divTableStats, showGraph, "SHOW GRAPH");


    replaceChilds(this.id, divTableStats);

};