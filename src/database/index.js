const Sequelize = require("sequelize");

const sequelize = new Sequelize(
	process.env.DB_BASE,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_HOST,
		port: 5432,
		dialect: 'postgres',
		logging: true,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	}
);

async function conectado() {
	try {
		await sequelize.authenticate();
		console.log('\nConnection has been established successfully.\n');
	} catch (error) {
		console.error('\nUnable to connect to the database:\n', error);
	}
}

conectado();

module.exports = sequelize;