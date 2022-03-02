var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.sendFile('/Users/apieceofchalk/Documents/ВЕБка/Навигатор Yandex/index.html');
});

app.listen(8089);

console.log('Сервер стартовал');