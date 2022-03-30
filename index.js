require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000; // Const para armanezar a porta do servidor

//Teste: criar lista de vinhos na memoria para testar no index.ejs
function Vinho(imagem, nome, pais, cor) {
  this.imagem = imagem;
  this.nome = nome;
  this.pais = pais;
  this.cor = cor;
}
const vinhos = [];
for (let i = 0; i < 10; i++)
  vinhos.push(new Vinho("Imagem Link", "Nome", "Pais", "Cor"));
//----------------------------------------------------------------

(async () => {
  const database = require("./src/database");
  const Catalogo = require("./src/vinhosdb");

  try {
    const result = await database.sync();
    console.log(result, Catalogo);
  } catch (err) {
    console.log(err);
  }
})();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.render("index.ejs", { vinhos }); //passando a lista vinhos para o index.ejs
});

app.post("/create", (req, res) => {
  const vinho = req.body;
  //inserir aqui codigo para enviar para o banco
  message = "O seu vinho foi cadastrado com sucesso";
  res.redirect("/");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

/* Variáveis dos vinhos
id
nome
pais
cor (Tipo de Vinho)
teor (alcoolico)
classificacao
harmonizacao 
descricao
img */
