const { response, query } = require('express')
const Usuario = require('../models/usuario')
var bcrypt = require('bcryptjs');
const { Promise } = require('mongoose');
const redis = require('redis')



const client = redis.createClient({
    port: 6379,
    host: "127.0.0.1"
});
const conectar_cliente = async ()=>{
    await client.connect();
    const data = await Usuario.find()
    const correos = []
    for (const iterator of data) {
        correos.push(iterator.data.correo)
    }
    client.set("correos", JSON.stringify(correos))

}
conectar_cliente()
    client.on('connect', function() {
        console.log('Connected!');
    });
    


const controller = {
    usuariosGet: async (req, res = response) => {
        const {limit = 5, desde = 0} = req.query
        const query = {estado: true}
        

        const [total, usuarios] = await Promise.all([
             Usuario.count(query),
             Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limit))
        ])

        res.status('200').json({
            total, 
            usuarios
        })

    },

    usuariosPost: async (req, res) => {
        
        const { nombre, correo, password, dni, numero} = req.body
        

        let datass = await client.get('correos')
        if (datass.includes(correo)) {
            return res.json({
                msg:'correo ya existe'
            })
        }
        else{
            datass = JSON.parse(datass)
            datass.push(correo)
            client.set("correos", JSON.stringify(datass))
        }


        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const data = {
            nombre,
            correo,
            password,
            dni,
            numero,
            fecha: date
        }

        let salt = bcrypt.genSaltSync(10);
        data.password = bcrypt.hashSync(req.body.password, salt);
    
        const resultado_usuario= await Usuario.create({estado: "Activo", data:data})
        res.json({
            resultado_usuario
        })
        


    },

    
}

module.exports = controller;