const faker = require('faker');
const boom = require('@hapi/boom');



class ProductsService {

    constructor() {
        this.products = [];
        this.generate();
    }

    generate() {
       // Para generar una cantidad de productos de un lote.
        // const { size } = req.query;
        // const limit = size || 10;
        const limit = 100;
        for (let index = 0; index < limit; index++) {
                this.products.push({
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                id: faker.datatype.uuid(),
                isblock: faker.datatype.boolean(),
            });
         }
    }
    async create(data) {
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.products.push(newProduct);
        return newProduct;
    }
    async find() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(this.products); 
            }, 3000);
        })
    }
    async findOne(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) {
            throw boom.notFound('Produt not found');
        } 
        if (product.isblock) {
            throw boom.conflict('Produt is block');
        }
        return product;
    }
    async update(id, changes) {
        const index = this.products.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('Produt not found')
        }
        const product= this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        };
        return this.products[index]
    }
    async delete(id) {
        const index = this.products.findIndex(item => item.id === id)
        if (index === -1) {
            throw boom.notFound('Produt not found')
        }
        this.products.splice(index, 1);
        return { id };
    }

}


module.exports = ProductsService;