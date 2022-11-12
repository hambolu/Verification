const express = require('express')
const app = express();
const path = require('path');
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080;
var jsonParser = bodyParser.json();
app.use('/static', express.static('public'));
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

app.engine('.js', engine());
app.set('views', path.join(__dirname, './apis'));
app.set('view engine', '.js');

app.get('/', function(req, res) {
    res.json('App is working');
});
app.listen(PORT, () => {
    console.log(`Listing ${PORT}`)
});


app.post('/verifyId', jsonParser, async(req, res, next) => {
    try {
        
        flw.Misc.bvn({bvn: req.body.bvn})
        .then(response => console.log(response));
        res.json(response);
    } catch (error) {
        res.json({"status":404,"message":"Error","data":error});
    }
});