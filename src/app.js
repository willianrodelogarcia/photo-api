const express = require('express');
const app = express();
const mongoose = require('mongoose');

var opctions = {
    useNewUrlParser:true,
    useUnifiedTopology: true
};

app.set('port',process.env.PORT || 1337);
app.use(express.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use(require('./routes/apiphotoserver'));

app.listen(app.get('port'), ()=>{
    console.log('server on port ', app.get('port'));
    mongoose.connect("mongodb://willianr:willian25@ds333248.mlab.com:33248/photo-app",opctions)
    .then(()=>{
        console.log("Conexion a mongoDB Exitosa");
    });
});







module.exports = app;