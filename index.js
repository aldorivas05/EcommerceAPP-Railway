const express = require('express');
const cors = require('cors')
const routerApi = require('./routes')


const app = express();
const port = 3000;
const { logErrors, errorHandler, boomErrorHandler } = require('./middleware/error.handler.js');
//const { options } = require('joi');
// Para recibir data app.use(express.json());
app.use(express.json());
//Los domios que pueden consultar la APi
const whitelist = ['http://localhost:8080', 'https://myapp.co'];

const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido'));
        };
    } 
}
app.use(cors(options));

app.get('/', (req, res) => {
    res.send('Hola mundo')
})

app.get('/nueva-ruta', (req, res) => {
    res.send('Hola mundo')
})

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
 
app.listen(port, () => {
    console.log('Mi port ' + port);
});


