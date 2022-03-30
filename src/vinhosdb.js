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
		pais: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		cor: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		uva: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		teor: {
			type: Sequelize.DECIMAL,
			allowNull: false,
		},
		classificacao: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		harmonizacao: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		descricao: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		img: {
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

module.exports = Catalogo;
