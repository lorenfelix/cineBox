const express = require("express");
const path = require("path");

const conectar = require("./config/db");
const filmeRouter = require("./routes/filmes");

const app = express();

conectar();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", filmeRouter);

app.listen(3000, () => {
    console.log("Servidor rodando!");
});