const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { check } = require('express-validator')

/**
 * @api {get} /profile Perfil del usuario
 * @apiName Perfil
 * @apiDescrption Perfil del usuario logueado
 * @apiGroup Data
 */
 router.get('/profile', authController.profile)


/**
 * @api {post} /register Registro de usuarios
 * @apiName Registro
 * @apiGroup AUTH
 * @apiDescription registro de usuarios usando los campos nombre, email, password
 * @apiParam {string} name Nombre del usuario que se registra
 * @apiParam {string} email E-mail del usuario que se registra
 * @apiParam {string} password Contraseña del usuario
 * @apiParamExample {json} Request-Example:
 *          {
 *              "name": "Pepito Perez"
 *              "email": "pepitoperez@email.com"
 *              "password": "contraseña123"
 *           }
 * @apiPermission none
 * @apiSuccess {json} token Token de acceso del usuario
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 ok
 *  {
 *      "token": {
 *              "userData": {
 *                  "name": "Pepito Perez",
 *                  "email": "pepitoperez@email.com",
 *                  "password": "contaseña123",
 *                  "_id": "892342hin3298f9we8fbhne",
 *                  "__v": 0
 *              }
 *              "code": 200,
 *              "token": "dmfsodmnfosmkno1nn1kmnk3n454k3kn1nmnljnjn1lnl/fd/fjkn3jn3ojn"
 *          }
 *  }
 * @apiError (200) Error El Email debe ser unico
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 200 ok
 *  {
 *      "token": {
 *           "index": 0,
 *           "code": 11000,
 *           "keyPattern": {
 *              "email": 1
 *              },
 *          "keyValue": {
 *              "email": "email@email.com"
 *              }
 *         }      
 *    }
 * @apiError (422) (Data Error) error en la validación de los datos
 * @apiErrorExample {json} Data-Error-Example
 * HTTP 1.1 422 unprocessable entry
 */

router.post('/register', [
        check('name', 'Nombre no valido, minimo 2 caracteres').isLength({min: 2, max: 40}),
        check('email', 'Email no valido').isEmail(),
        check('password', 'Contraseña debil').isStrongPassword()
    ],

    authController.register
)

router.post('/login', authController.login)

module.exports = router