// rotas da api
import { FastifyInstance } from "fastify"// tipo
import { prisma } from "./lib/prisma"

export async function appRoutes(app: FastifyInstance){
    app.get('/hello', ()=>{
        return 'Hello NLW!'
    })
    
    app.get('/habits', async ()=>{
        const habits = await prisma.habit.findMany()
        return habits
    })
}