const Sequelize = require('sequelize');
const database = require('./database');

const Catalogo = database.define(
	'catalogo',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		nome: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		cor: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		tipo: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		barril_tempo: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		barril_tipo: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		descricao: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		imagem: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
);

module.exports = Filme;

/* Variáveis dos vinhos
id
nome
cor
tipo
barril_tempo
barril_tipo
descriçao */
