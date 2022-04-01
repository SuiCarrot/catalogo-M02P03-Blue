require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000; // Const para armanezar a porta do servidor

//Teste: criar lista de vinhos na memoria para testar no index.ejs
function Vinho(imagem, nome, pais, cor,id) {
  this.imagem = imagem;
  this.nome = nome;
  this.pais = pais;
  this.cor = cor;
  this.id = id;
}
const vinhos = [];
for (let i = 0; i < 10; i++)
  vinhos.push(new Vinho("Imagem Link", "Nome", "Pais", "Cor",vinhos.length));
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

app.get("/cadastro", (req, res) => {
	res.render("cadastro.ejs");
  });

  app.post("/create", async (req, res) => {
    const { nome, pais, cor, uva, teor, classificacao, harmonizacao, descricao, img } = req.body;
  
    if (!nome) {
      res.render("criar", {
        mensagem: "Nome é obrigatório",
      });
    }
  
    if (!pais) {
      res.render("criar", {
        mensagem: "País de origem é obrigatório",
      });
    }
    if (!cor) {
        res.render("criar", {
          mensagem: "Cor do vinho é obrigatória",
        });
      }
      if (!uva) {
        res.render("criar", {
          mensagem: "Tipo de uva é obrigatório",
        });
      }
      if (!teor) {
        res.render("criar", {
          mensagem: "Teor alcoolico é obrigatório",
        });
      }
      if (!classificacao) {
        res.render("criar", {
          mensagem: "Classificação do vinho é obrigatório",
        });
      }
      if (!img) {
        res.render("criar", {
          mensagem: "Imagem é obrigatório",
        });
      }
  
    try {
      const vinho = await Vinho.create({  /////verificar nome para utilizar aqui
        nome, 
        pais, 
        cor, 
        uva, 
        teor, 
        classificacao, 
        harmonizacao, 
        descricao, 
        img 
      });
  
      res.render("/create", {
        Vinho,
      });
    } catch (err) {
      console.log(err);
  
      res.render("criar", {
        mensagem: "Ocorreu um erro ao cadastrar o Filme!",
      });
    }
  });

app.get("/detalhes/:id", (req,res) => { //Selecionando qual dos itens do array ele vai utilizar para renderizar a pagina de detalhes.
	const id = req.params.id;
	const vinho = vinhos[id];
	res.render("detalhes", {vinho});
})

app.post("/create", (req, res) => {// Criando um novo item para o catalogo e dando push para o array
  const vinho = req.body;
  vinho.id = vinhos.length;
  vinhos.push(vinho)
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