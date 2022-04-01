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

app.get('/detalhes/:id', async (req, res) => {
	//Selecionando qual dos itens do array ele vai utilizar para renderizar a pagina de detalhes.
	const vinho = await Catalogo.findByPk(req.params.id);

	res.render('detalhes', {
		vinho,
	});
});

app.get('/cadastro', (req, res) => {
	res.render('cadastro');
});

app.post('/create', async (req, res) => {
	// Criando um novo item para o catalogo e dando push para o array
	const {
		nome,
		pais,
		cor,
		uva,
		teor,
		classificacao,
		harmonizacao,
		descricao,
		img,
	} = req.body;

	if (!nome) {
		res.render('cadastro', {
			mensagem: 'Nome é obrigatório',
		});
	}

	if (!pais) {
		res.render('cadastro', {
			mensagem: 'País de origem é obrigatório',
		});
	}
	if (!cor) {
		res.render('cadastro', {
			mensagem: 'Cor do vinho é obrigatória',
		});
	}
	if (!uva) {
		res.render('cadastro', {
			mensagem: 'Tipo de uva é obrigatório',
		});
	}
	if (!teor) {
		res.render('cadastro', {
			mensagem: 'Teor alcoolico é obrigatório',
		});
	}
	if (!classificacao) {
		res.render('cadastro', {
			mensagem: 'Classificação do vinho é obrigatório',
		});
	}
	if (!img) {
		res.render('cadastro', {
			mensagem: 'Imagem é obrigatório',
		});
	}

	try {
		const vinho = await Catalogo.create({
			nome,
			pais,
			cor,
			uva,
			teor,
			classificacao,
			harmonizacao,
			descricao,
			img,
		});

		res.render('/cadastro', {
			vinho,
		});
	} catch (err) {
		console.log(err);

		res.render('/cadastro', {
			mensagem: 'Ocorreu um erro ao cadastrar o vinho!',
		});
	}
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
