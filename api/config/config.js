module.exports = {
	development: {
		username: process.env.DB_USERNAME_DEV,
		password: process.env.DB_PASSWORD_DEV,
		database: process.env.DB_NAME_DEV,
		host: '127.0.0.1',
		dialect: 'postgres',
	},
	test: {
		username: process.env.DB_USERNAME_TEST,
		password: process.env.DB_PASSWORD_TEST,
		database: process.env.DB_NAME_TEST,
		host: '127.0.0.1',
		dialect: 'postgres',
	},
	production: {
		use_env_variable: 'DATABASE_URL',
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
		host: process.env.DB_HOSTNAME,
		dialect: 'postgres',
	},
};
