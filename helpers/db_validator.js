const Correo = require('../models/correo')
const Numero = require('../models/numero')
const Dni = require('../models/dni')
const { Promise } = require('mongoose');



const validator = async(req, res, next) =>{
    const {correo, dni, numero} = req.body
    
//     const [validar_correo, validar_numero, validar_dni] = await Promise.all([
//         Correo.findById(correo),
//         Numero.findById(numero),
//         Dni.findById(dni),
//    ])
   const correo_validar = await Correo.findById(correo)
    

    // if(validar_correo || validar_numero || validar_dni){
    //     return res.json({
    //         msg: 'Campo existente'
    //     })
    // }
    if (correo_validar) {
        return res.json({
            msg: 'Campo existente'
        })
    }
    else{

        await Correo.create({_id:correo})
        // await Dni.create({_id:dni})
        // await Numero.create({_id:numero})
    }
    
    
    next()

}


module.exports = validator;