import { app } from './app'
import { env } from './env/setup'

app
	.listen({
		port: env.PORT,
		host: '0.0.0.0'
	})
	.then(() => {
		console.log('HTTP Server Running...')
		console.log(`Env: ${env.NODE_ENV} | PORT: ${env.PORT}`)
	})
	.catch(err => {
		console.error(err)
	})
