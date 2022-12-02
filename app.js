import bodyParser from 'body-parser'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import mongoose from 'mongoose'
import graphQlResolvers from './graphql/resolvers/index'
import graphQlSchema from './graphql/schema/index'
import isAuth from './middleware/is-auth'
import chalk from 'chalk'

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	if (req.method === 'OPTIONS') {
		return res.sendStatus(200)
	}
	next()
})

app.use(isAuth)

app.use(
	'/graphql',
	graphqlHTTP({
		schema: graphQlSchema,
		rootValue: graphQlResolvers,
		graphiql: true,
	})
)

console.log(chalk.cyan('[app]	🍃 Connecting to MongoDB...'))

mongoose
	.connect(
		`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.5yxabkm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
	)
	.then(() => {
		app.listen(process.env.BE_PORT, '127.0.0.1', null, () => {
			console.log(chalk.green(`[app]	🌍 Server listening on port ${process.env.BE_PORT}`))
		})
	})
	.catch((err) => {
		console.log(chalk.red(`[app]	❌ ${err}`))
	})
