const mongoose = require("mongoose");

const filmeSchema = new mongoose.Schema({

    titulo: String,

    ano: String,

    poster: String,

    sinopse: String

});

module.exports = mongoose.model(
    "Filme",
    filmeSchema
);