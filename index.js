const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const fs = require('fs');

var options = {
    key: fs.readFileSync(__dirname + '/ssl/localtesting.lan.key'),
    cert: fs.readFileSync(__dirname + '/ssl/localtesting.lan.crt')
};

https.createServer(options, app).listen('9000', function(){
    console.log('server on SSL running');
});

app.get('*', function(req, res){
  res.sendFile(process.cwd() + req.url);
});