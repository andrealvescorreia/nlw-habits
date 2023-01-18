// rotas da api
import { FastifyInstance } from "fastify"// tipo
import { prisma } from "./lib/prisma"
import {z} from 'zod'// para validação
import dayjs from 'dayjs'// utilitario de datas
export async function appRoutes(app: FastifyInstance){
    app.get('/hello', ()=>{
        return 'Hello NLW!'
    })
    
    app.get('/habits', async ()=>{
        const habits = await prisma.habit.findMany()
        return habits
    })

    app.post('/habits', async (request)=>{
        const createHabitBody = z.object({// serve para validar o body passado pela request
            title: z.string(),
            weekDays:z.array(z.number().min(0).max(6))// array de numeros que vai de 0(Domingo) a 6(Sabado) 
        })
        
        const {title, weekDays} = createHabitBody.parse(request.body)// se aqui a validacao falhar, o codigo abaixo nao executa.

        const today = dayjs().startOf('day').toDate()// zera as horas minutos e segundos: 00:00:00

        await prisma.habit.create({
            data: {
                title,
                created_at: today,
                weekDays: {
                    create : weekDays.map(weekDay =>{// map serve para percorrer todos os elementos em weekDays.
                        return {
                            week_day: weekDay
                        }
                    })
                }
            }
        })
    })
}