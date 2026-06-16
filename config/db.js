const mongoose = require("mongoose");

async function conectar() {
    await mongoose.connect(
        "mongodb+srv://lorenfelix09:<OdaYf7T5C4K4HOBw>@cluster0.ikjoss9.mongodb.net/"
    );

    console.log("Mongo conectado");
}

module.exports = conectar;