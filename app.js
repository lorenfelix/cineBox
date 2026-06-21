const express = require("express");
const path = require("path");

// Inicializa o banco SQLite
require("./config/db");

const filmeRouter = require("./routes/filmes");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", filmeRouter);
const PORT = process.env.PORT || 3000;

//app.listen(PORT, () => {
//console.log(`Servidor rodando na porta ${PORT}`);
//})

app.listen(3000, () => {
    console.log("Servidor rodando!");
});