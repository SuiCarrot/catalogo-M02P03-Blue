require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const Catalogo = require('./src/vinhosdb');
const database = require('./src/database');
const port = process.env.PORT || 3000; // Const para armanezar a porta do servidor

let message = '';

(async () => {
	try {
		await database.sync();
		console.log('\nSync database successfully\n');
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
		message,
	});
}); //passando a lista vinhos para o index.

// ************ CADASTRO ****************

app.get('/cadastro', (req, res) => {
	res.render('cadastro', { message: '' });
});

app.post('/cadastro', async (req, res) => {
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

	console.log(req.body);

	if (!nome) {
		res.render('cadastro', {
			message: 'Nome é obrigatório',
		});
	}

	if (!pais) {
		res.render('cadastro', {
			message: 'País de origem é obrigatório',
		});
	}
	if (!cor) {
		res.render('cadastro', {
			message: 'Cor do vinho é obrigatória',
		});
	}
	if (!uva) {
		res.render('cadastro', {
			message: 'Tipo de uva é obrigatório',
		});
	}
	if (!teor) {
		res.render('cadastro', {
			message: 'Teor alcoolico é obrigatório',
		});
	}
	if (!classificacao) {
		res.render('cadastro', {
			message: 'Classificação do vinho é obrigatório',
		});
	}
	if (!img) {
		res.render('cadastro', {
			message: 'Imagem é obrigatório',
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

		console.log(vinho);

		res.render('cadastro', {
			vinho,
			message: 'Cadastro realizado com sucesso',
		});
	} catch (err) {
		console.log(err);

		res.render('cadastro', {
			message: 'Ocorreu um erro ao cadastrar o vinho!',
		});
	}

	/* res.redirect('/'); */
});

// **************************************

// ************ DETALHES ****************

app.get('/detalhes/:id', async (req, res) => {
	//Selecionando qual dos itens do array ele vai utilizar para renderizar a pagina de detalhes.
	const vinho = await Catalogo.findByPk(req.params.id);

	res.render('detalhes', {
		vinho,
		message: '',
	});
});

// **************************************

// ************ EDITAR ******************

app.get('/editar/:id', async (req, res) => {
	const vinho = await Catalogo.findByPk(req.params.id);

	if (!vinho) {
		res.render('editar', {
			message: 'Vinho não encontrado!',
		});
	}

	res.render('editar', {
		vinho,
		message: '',
	});
});

app.post('/editar/:id', async (req, res) => {
	const vinho = await Catalogo.findByPk(req.params.id);

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

	vinho.nome = nome;
	vinho.pais = pais;
	vinho.cor = cor;
	vinho.uva = uva;
	vinho.teor = teor;
	vinho.classificacao = classificacao;
	vinho.harmonizacao = harmonizacao;
	vinho.descricao = descricao;
	vinho.img = img;

	const ItemEditado = await vinho.save();

	res.render('editar', {
		vinho: ItemEditado,
		message: 'Item editado com sucesso!',
	});
});

// **************************************

// ************ DELETAR *****************

app.get('/deletar/:id', async (req, res) => {
	const vinho = await Catalogo.findByPk(req.params.id);

	if (!vinho) {
		res.render('deletar', {
			message: 'Vinho não encontrado!',
		});
	}

	res.render('deletar', {
		vinho,
		message: '',
	});
});

app.post('/deletar/:id', async (req, res) => {
	const vinho = await Catalogo.findByPk(req.params.id);

	if (!vinho) {
		res.render('deletar', {
			message: 'Vinho não encontrado!',
		});
	}

	await vinho.destroy();

	res.redirect('/');
});

// **************************************


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
