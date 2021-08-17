require('dotenv').config()

module.exports={
	PORT:process.env.PORT||8080,
	NODE_ENV: process.env.NODE_ENV,
	CSQLITE3: process.env.CSQLITE3,
}