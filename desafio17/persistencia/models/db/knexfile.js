require('dotenv').config()
module.exports={
	development:{
		client:"mysql",
		connection:{
			host:process.env.HOST ||'127.0.0.1',
			user: process.env.USER_DB||'root',
			password:"",
			database:process.env.DATABASE,
		},
	},
	conexionSQLite:{
		client: 'sqlite3',
		connection: {
		  filename: __dirname+"./mensajes.sqlite"
		},
		useNullAsDefault:true
	  },
};