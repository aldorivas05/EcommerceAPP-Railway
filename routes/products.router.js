const express = require('express');

const ProductsService = require('./../services/product.service');

const validatorHandler = require('./../middleware/validator.handler');

const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/product.schema.js');


const router = express.Router();

   const service = new ProductsService();

router.get('/', async (req, res) => {
    const products = await service.find();
    res.json(products);
})

// Hay algo interesante y escuando dos rutas chocan, el /products/:id
// y el /products/filter.
// Esto se soluciona colocando de primero el estatico en vez del dinamico.

router.get('/filter', (req, res) => {
    res.send('Yo soy un filter')
});

router.get('/:id',
    validatorHandler(getProductSchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);
            res.json(product);
        } catch (error) {
            next(error)
        }
    // if (id === '999') {
    //     res.status(404).json({
    //         message: 'Not found'
    //     });  
    // } else {
    //     res.status(200).json({
    //         id,
    //         name: 'Producto 2',
    //         price: 2000
    //     });
    // };
});

// Para aceptar post en requires

router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async (req, res) => {
        const body = req.body;
        newProduct = await service.create(body);
        res.status(201).json(newProduct);
    });

//Para editar parcialmente un producto.
// parch para editar parcialmente, put para editar todos los elementos.
router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body =  req.body;
            const product = await service.update(id, body);
            res.json(product);
        } catch (error){
            next(error)
        };
    });

//Para eliminar un producto.

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const rta = await service.delete(id);
    res.json(rta);
});

module.exports = router;