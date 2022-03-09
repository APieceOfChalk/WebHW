const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
var server = require('http').createServer(app);

app.use (
    express.urlencoded({
        extended:true
    })
);

app.use(express.static(__dirname + '/public'));

app.get('/scoring', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

server.listen(port, function() {
    console.log('Старт сервера')
})

app.post('/scoring', (req, res) => {
    let client = Json(req.body);
    if (client > 1.25) {
        res.send('Вам одобрен кредит! Ваш скоринг: ' + " " + client);
    } else {
        res.send('Вам кредит не одобрен Ваш скоринг: ' + " " + client);
    }

});

server.listen(port, function () {
    console.log('listening on 3000');
})

function Json(json) {
    let points = 0;

    points = points + json.periodWork * 0.059

    if (json.gender == "female") {
        points = points + 0.4;
    } else {
        points = points + 0;
    }

    if (json.periodLife * 0.042 <= 0.42) {
        points = points + json.periodLife * 0.042;
    } else {
        points = points + 0.42;
    }

    if (json.bankAccount) {
        points = points + 0.45;
    }

    if (json.realEstate) {
        points = points + 0.35;
    }

    if (json.insurancePolicy) {
        points = points + 0.19;
    }

    if ("manager_teacher_developer_officePeople".includes(json.profession)) {
        points = points + 0.55;
    } else if ("locksmith_policeman_judge_driver_pilot".includes(json.profession)) {
        points = points + 0;
    } else {
        points = points + 0.16;
    }

    if (json.sphere == "public") {
        points = points + 0.21;
    } else {
        points = points + 0;
    }

    let current = new Date()
    let birth_date = new Date(json.birthDate)
    let age = Math.trunc((current.getTime() - birth_date) / (24 * 3600 * 365 * 1000));

    if ((age - 20) * 0.1 <= 0.3) {
        points = points + (age - 20) * 0.1;
    } else {
        points = points + 0.3
    }

    return points;
}