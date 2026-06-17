const express = require("express");
const router = express.Router();

const filme = require("../models/filme");

const axios = require("axios");

router.get("/", async(req, res) => {

    const filmes = await filme.find();

    res.render("index", {
        filmes
    });

});

router.get("/novo", (req, res) => {

    res.render("adicionar");

});

router.post("/novo", async(req, res) => {

    const titulo = req.body.titulo;

    const resposta = await axios.get(
        `https://www.omdbapi.com/?apikey=2204fd37&t=${titulo}`
    );

    const dados = resposta.data;

    await filme.create({

        titulo: dados.Title,
        ano: dados.Year,
        poster: dados.Poster,
        sinopse: dados.Plot

    });

    res.redirect("/");

});

module.exports = router;