import Fastify from 'fastify'
import {PrismaClient} from '@prisma/client'
import cors from '@fastify/cors'

const app = Fastify()
app.register(cors, {
    
})
const prisma = new PrismaClient()

app.get('/hello', ()=>{
    return 'Hello NLW!'
})

app.get('/habits', async ()=>{
    const habits = await prisma.habit.findMany()
    return habits
})

app.listen({
    port: 3333,
}).then(()=>{
    console.log('servidor rodando de boa')
})
