// rotas da api
import { FastifyInstance } from "fastify"// tipo
import { prisma } from "./lib/prisma"
import {z} from 'zod'// para validação
import dayjs from 'dayjs'// utilitario de datas
export async function appRoutes(app: FastifyInstance){
    app.get('/hello', ()=>{
        return 'Hello NLW!'
    })


    app.get('/day', async (request)=>{
        const getDayParams = z.object({
            date: z.coerce.date()
        })

        const { date } = getDayParams.parse(request.query)
        
        const parsedDate = dayjs(date).startOf('day')
        const weekDay = dayjs(date).get('day')

        // t0dos os habitos possiveis (que existiam desde aquele dia)
        // habitos que foram completados (naquele dia)

        const possibleHabits = await prisma.habit.findMany({
            where: {
                created_at:{
                    lte: date
                },
                weekDays: {
                    some: {
                        week_day: weekDay
                    }
                }
            }
        })


        const day = await prisma.day.findUnique({
            where: {
                date: parsedDate.toDate()
            },
            include: {
                dayHabits: true// inclui os habitos 
            }
        })

        // o operador "?" verifica antes se o 'day' é nulo. Se não, pega os 'dayHabits'
        const completedHabits = day?.dayHabits.map(dayHabit => {
            return dayHabit.habit_id
        }) ?? []

        return {
            possibleHabits,
            completedHabits
        }

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

    app.patch('/habits/:id/toggle', async (request) =>{
        const toggleHabitParams = z.object({
            id: z.string().uuid()// verfifica se o id passado é do formato uuid
        })


        const {id} = toggleHabitParams.parse(request.params)

        const today = dayjs().startOf('day').toDate()// data de hj com horas, minutos e seg zerados

        let day = await prisma.day.findUnique({
            where: {
                date: today
            }
        })

        if(!day){// se day for nulo: nao existia nenhum habito completado naquele dia,
            // entao cria esse dia!
            day = await prisma.day.create({
                data: {
                    date: today
                }
            })
        }

        const dayHabit = await prisma.dayHabit.findUnique({
            where: {
                day_id_habit_id: {
                    day_id: day.id,
                    habit_id: id
                }
            }
        })

        if (dayHabit) {
            // toggle: desmarca o habito como completo
            await prisma.dayHabit.delete({
                where: {
                    id: dayHabit.id
                }
            })
        } else{
            // toggle: marca o habito como completo
            await prisma.dayHabit.create({
                data: {
                    day_id: day.id,
                    habit_id: id
                }
            })
        }


    })

    app.get('/summary', async () =>{
        const summary = await prisma.$queryRaw`
            SELECT
                D.id,
                D.date,
                (
                    SELECT
                        cast(count(*) as float)
                    FROM day_habits DH
                    WHERE DH.day_id = D.id
                ) as completed
                ,
                (
                    SELECT
                        cast(count(*) as float)
                    FROM habit_week_days HWD
                    JOIN habits H
                        ON H.id = HWD.habit_id
                    WHERE 
                        HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int) 
                        AND H.created_at <= D.date
                ) as amount
            FROM day D
        `
        return summary
    })
}