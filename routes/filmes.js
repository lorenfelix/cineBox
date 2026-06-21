const express = require("express");
const router = express.Router();
const db = require("../config/db");
const axios = require("axios");

const API_KEY = "9d057cda8e19ffb22683cb916de2a50c";

// Página inicial
router.get("/", (req, res) => {

    const filmes = db.prepare(
        "SELECT * FROM filmes"
    ).all();

    res.render("index", { filmes });

});

// Tela de pesquisa
router.get("/pesquisar", (req, res) => {
    res.render("pesquisar", { resultados: [] });
});

// Buscar filmes na API
router.post("/pesquisar", async(req, res) => {

    try {

        const titulo = req.body.titulo;

        const resposta = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(titulo)}&language=pt-BR`
        );

        res.render("pesquisar", {
            resultados: resposta.data.results
        });

    } catch (erro) {

        console.error(erro);

        res.render("pesquisar", {
            resultados: []
        });

    }

});

// Adicionar filme da API à biblioteca
router.post("/adicionar", (req, res) => {

    const { titulo, ano, poster, sinopse } = req.body;

    db.prepare(`
        INSERT INTO filmes
        (titulo, ano, poster, sinopse)
        VALUES (?, ?, ?, ?)
    `).run(
        titulo,
        ano,
        poster,
        sinopse
    );

    res.redirect("/");

});

// Avaliar filme
router.get("/avaliar/:id", (req, res) => {

    const filme = db.prepare(
        "SELECT * FROM filmes WHERE id = ?"
    ).get(req.params.id);

    if (!filme) {
        return res.redirect("/");
    }

    res.render("avaliar", {
        filme,
        id: req.params.id
    });

});

// Salvar avaliação
router.post("/avaliar/:id", (req, res) => {

    const { nota, comentario } = req.body;

    db.prepare(`
        CREATE TABLE IF NOT EXISTS avaliacoes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filme_id INTEGER,
            nota INTEGER,
            comentario TEXT
        )
    `).run();

    db.prepare(`
        INSERT INTO avaliacoes
        (filme_id, nota, comentario)
        VALUES (?, ?, ?)
    `).run(
        req.params.id,
        nota,
        comentario
    );

    res.redirect(`/filme/${req.params.id}`);

});

// Detalhes do filme
router.get("/filme/:id", (req, res) => {

    const filme = db.prepare(
        "SELECT * FROM filmes WHERE id = ?"
    ).get(req.params.id);

    if (!filme) {
        return res.redirect("/");
    }

    const avaliacoes = db.prepare(
        "SELECT * FROM avaliacoes WHERE filme_id = ?"
    ).all(req.params.id);

    res.render("filme", {
        filme,
        avaliacoes,
        id: req.params.id
    });

});

module.exports = router;