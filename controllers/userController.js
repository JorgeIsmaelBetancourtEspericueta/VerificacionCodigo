// Importa el modelo que contiene la lógica para interactuar con la base de datos o Firebase
const userModel = require('../models/userModelFB');

// Define los resolvers de GraphQL para las mutaciones
const resolvers = {
    Mutation: {
        /**
         * Crea un nuevo usuario no verificado, genera un código de verificación,
         * lo envía por correo y lo guarda en el arreglo.
         */
        registerUser: (_, { email, phone, via }) => userModel.create(email, phone, via),

        /**
         * Verifica si el código ingresado es correcto. Si lo es, marca al usuario como verificado
         * y devuelve un objeto con el token de sesión y los datos del usuario.
         */
        verifyCode: (_, { email, code }) => userModel.update(email, code),

        /**
         * Permite el inicio de sesión si el usuario ya está verificado.
         * Si no lo está, vuelve a generar y enviar un código de verificación.
         */
        login: (_, { email }) => userModel.remove(email),
    },
}

// Exporta los resolvers para usarlos en el servidor de Apollo
module.exports = resolvers;
