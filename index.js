require('dotenv').config()
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000; // Const para armanezar a porta do servidor

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/create", (req,res) => {
  const vinho = req.body;
  //inserir aqui codigo para enviar para o banco
  message = 'O seu vinho foi cadastrado com sucesso';
  res.redirect("/")
})

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

/* Variáveis dos vinhos
id
nome
cor
tipo
img
barril_tempo
barril_tipo
descriçao */