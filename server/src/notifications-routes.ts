// rotas de notificações push

import WebPush from 'web-push'
import { FastifyInstance } from "fastify"// tipo
import { prisma } from "./lib/prisma"
import { z } from 'zod'// para validação
import dayjs from 'dayjs'// utilitario de datas


// estas chaves foram geradas por meio do comando WebPush.generateVAPIDKeys(), o qual um simples console.log() já mostra para vc copiar e colar.
const publicKey = 'BH0YCm3nzua91sKTfRqoqjStpCohI6Qbz6TIqMns8CDMQixSwOQBMi3na7YOkW1jjRB6mECDEbOO5adpi0aMOjE'
const privateKey = 'ykWGHF9kqpizRjWa9s-kV4BHAH9H9rRbMiZoPiJmajg'

WebPush.setVapidDetails(
   'https://localhost:3333',
   publicKey,
   privateKey
)

export async function notificationsRoutes(app: FastifyInstance) {
   app.get('/push/public_key', () => {
      return {
         // simplesmente retorna a chave publica para vizualizar-la
         publicKey
      }
   })

   app.post('/push/register', (request, reply) => {
      // 
      console.log(request.body)

      return reply.status(201).send()
   })

   app.post('/push/send', async (request, reply) => {
      // essa rota servirá para o envio de notificação push
      console.log(request.body)
      const sendPushBody = z.object({
         subscription: z.object({
            endpoint: z.string(),
            keys: z.object({
               p256dh: z.string(),
               auth: z.string()
            })
         })
      })

      const { subscription } = sendPushBody.parse(request.body)

      WebPush.sendNotification(subscription, 'backend falando!')
      return reply.status(201).send()
   })
}