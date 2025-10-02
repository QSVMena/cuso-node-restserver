const mongoose = require('mongoose');

const dbConection = async() => {
try {
    await mongoose.connect(process.env.MONGODB, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true,
        useFindAndModify:false
    });
    console.log('Base de Datos Online');
} catch (error) {
    console.log(error);
    throw('Error a la hora de iniciar base de datos')
}
};

module.exports = {
    dbConection
}