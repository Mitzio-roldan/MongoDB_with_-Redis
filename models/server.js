const express = require('express')
const cors = require('cors')
 

const dbConnection = require('../database/config')
class server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.middlwares()
        this.routes()
        this.conectarDB()
    }
    middlwares(){
        this.app.use(cors())
        this.app.use(express.json())
    }
    async conectarDB(){
        await dbConnection()
    }
    

    routes(){
        
        this.app.use('/api/usuarios', require('../routes/user'))
        
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
          })
    }
}
module.exports = server