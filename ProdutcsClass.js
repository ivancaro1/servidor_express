const fs = require('fs')      
const Math = require('mathjs')                                  // import file system module
// Star of class Contenedor
module.exports = class ContenedorArchivo {

    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo;
    }

    async save(producto){   
        let contenidoArchivo;                                   // creates contenidoArchivo variable
        contenidoArchivo = await this.getAll();
        contenidoArchivo.push(producto) ;
        await this.writeFile(contenidoArchivo);
    }

    async getById(id_producto){
        let contenidoArchivo;                                   // creates contenidoArchivo variable

        function encontroId(objeto) {                           // declares a function to find the id_producto selected
            return objeto.id === id_producto;
        }
        
        contenidoArchivo = await this.getAll();

        let resultado = contenidoArchivo.find(encontroId);  // callback encontroId function to extract the object with the id selected
            if(resultado === undefined){                        // if does not find a value returns null
                resultado = null;
            }   
        return resultado;
    }

    async getAll(){
        let contenidoArchivo;                                   // creates contenidoArchivo variable
            try{
                contenidoArchivo = await fs.promises.readFile(this.nombreArchivo,'utf-8')
                return JSON.parse(contenidoArchivo) 
            }catch(err){
                throw err;
            }
    }
    
    async deleteById(id_producto){                                    
        let contenidoArchivo;                                   // creates contenidoArchivo variable

        function encontroId(objeto) {                           // starts of leerArchivo async function to read products in the file
            return objeto.id === id_producto;
        }

        contenidoArchivo = await this.getAll()
            let resultado = contenidoArchivo.find(encontroId);  // callback encontroId function to extract the object with the id selected
            let indice = contenidoArchivo.indexOf(resultado);    // finds the index in the array of the id selected
                contenidoArchivo.splice(indice,1)   

        await this.writeFile(contenidoArchivo);
    }

    async deleteAll(){
        let contenidoArchivo;                                   // creates contenidoArchivo variable
        contenidoArchivo = await this.getAll()
        contenidoArchivo = [];
        await this.writeFile(contenidoArchivo);
    }

    async writeFile(objeto){
        try{
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(objeto,null,2))
        }catch(err){
            throw err;              // if there is an error print a error message
        }
    }

    async getRandom(){
        let contenidoArchivo;
        contenidoArchivo = await this.getAll() 
        let keys = Object.keys(contenidoArchivo);
        return contenidoArchivo[keys[ keys.length * Math.random() << 0]];
    }
 }