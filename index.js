require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const Catalogo = require('./src/vinhosdb');
const port = process.env.PORT || 3000; // Const para armanezar a porta do servidor

(async () => {
	const database = require('./src/database');

	try {
		const result = await database.sync();
		console.log(result);
	} catch (err) {
		console.log(err);
	}
})();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());

app.get('/', async (req, res) => {
	const vinhos = await Catalogo.findAll();
	res.render('index', {
		vinhos,
	});
}); //passando a lista vinhos para o index.

app.get('/cadastro', (req, res) => {
	res.render('cadastro.ejs');
});

app.get('/detalhes/:id', async (req, res) => {
	//Selecionando qual dos itens do array ele vai utilizar para renderizar a pagina de detalhes.
	const vinho = await Catalogo.findByPk(req.params.id);

	res.render('detalhes', {
		vinho,
	});
});

app.post('/create', (req, res) => {
	// Criando um novo item para o catalogo e dando push para o array
	const {} = req.body;
	const vinho = req.body;
	vinho.id = vinhos.length;
	vinhos.push(vinho);
	message = 'O seu vinho foi cadastrado com sucesso';
	res.redirect('/');
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);

/* Variáveis dos vinhos
id
nome
pais
cor (Tipo de Vinho)
uva
teor (alcoolico)
classificacao
harmonizacao 
descricao
img */
