const express = require('express')

const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoryRouter = require('./category.router');


function routerApi(app) {
    // Ruta maestra 
    const router = express.Router();
    app.use('/api/v1', router);
    //De aqui para abajo tenemos un /api/v1 anter de cada ruta  usando la var router
    router.use('/products', productsRouter);
    router.use('/users', usersRouter);
    router.use('/category', categoryRouter);
};

module.exports = routerApi;