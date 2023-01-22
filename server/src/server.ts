import Fastify from 'fastify'

import cors from '@fastify/cors'
import { appRoutes } from './routes'
import { env } from 'node:process'

const app = Fastify()
app.register(cors)
app.register(appRoutes)




app.listen({
    port: 3333,
    host: env.HOST_IP
}).then(()=>{
    console.log('servidor rodando de boa no localhost:3333')
})
