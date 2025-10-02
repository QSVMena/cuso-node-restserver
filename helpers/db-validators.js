const Role = require('../models/role');
const Usuario = require('../models/usuario')

const esRolValido = async (rol = '') => {
    const existRol = await Role.findOne({ rol });

    if (!existRol) {
        throw new Error(`El ${rol} no esta registrado en la base de datos`)
    }
};

const existeEmail = async (correo = '') => {

    const emailExist = await Usuario.findOne({ correo });
    if (emailExist) {
        throw new Error (`El ${correo} ya existe en el registro`)
    };

};

const existeUsuarioPorId = async (id) => {

    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error (`El ${id} No existe en el registro`)
    };

}



module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}