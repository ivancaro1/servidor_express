const express = require('express');
const clase = require('./ProdutcsClass.js')

const productos = new clase('./productos_resultado.txt')

const app = express();
const PORT = 8080

const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
});
server.on('error',error => console.log(`Error en el servidor ${error}`))

const productsController = {
    async getAll (req,res) {
        const allProducts = await productos.getAll();
        await res.json(allProducts)
    },
    async getRandom (req,res) {
        const randomProduct = await productos.getRandom();
        await res.json(randomProduct)
    }
}

app.get('/', (req,res)=>{
    res.send({mensaje_1:'http://localhost:8080/productos', 
              mensaje_2:'http://localhost:8080/productosRandom'})
})

app.get('/productos', productsController.getAll)

app.get('/productosRandom', productsController.getRandom)