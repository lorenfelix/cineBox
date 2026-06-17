const mongoose = require("mongoose");

//async function conectar() {
//await mongoose.connect(
// "mongodb+srv://lorenfelix09:OdaYf7T5C4K4HOBw@cluster0.ikjoss9.mongodb.net/"
//);

//console.log("Mongo conectado");
//}

//module.exports = conectar;const mongoose = require("mongoose");

async function conectar() {
    try {
        await mongoose.connect("mongodb+srv://lorenfelix09:OdaYf7T5C4K4HOBw@cluster0.ikjoss9.mongodb.net/cineBox?retryWrites=true&w=majority");
        console.log("✅ Mongo conectado");
    } catch (erro) {
        console.error("❌ Erro ao conectar no Mongo:");
        console.error(erro);
    }
}

module.exports = conectar;