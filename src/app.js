const express = require ('express')
const morgan = require ('morgan')
const mongoose = require ('mongoose')
const cors = require ('cors')
require('dotenv').config()
const app = express()
const auhtRoutes = require('./routes/auth.routes')

// Configuraciones
app.set('port', process.env.PORT || 3000)
mongoose.connect(proces.env.DB_STRING)
.then(db => console.log('Connected to Mongo'))
.catch(err => console.log(err))

//Middlewares
app.use(morgan('dev'))
app.use(cors())

// Rutas
app.use('/auth', authRoutes)

// Inicio del servidor
app.listen(app.get('port'), () => {
    console.log('Server Running')
})