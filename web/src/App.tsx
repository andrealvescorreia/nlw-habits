import './styles/global.css'
import './lib/dayjs'
import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import { api } from './lib/axios'

navigator.serviceWorker.register('service-worker.js')// como o 'register' é uma promise, podemos usar o 'then'
   .then(async serviceWorker => {
      // subscription: é a assinatura do usuario que quer receber notificações
      // pushManager é a API experimental
      let subscription = await serviceWorker.pushManager.getSubscription()

      if(!subscription){// se ele ainda não tem uma inscrição...
         const publicKeyResponse =await api.get('/push/public_key')
         
         // .. cria uma nova!
         subscription = await serviceWorker.pushManager.subscribe({
            // public key lá do back:
            applicationServerKey: publicKeyResponse.data.publicKey,
            userVisibleOnly: true
         })
      }
      await api.post('/push/register', {
         subscription,
      })

      await api.post('/push/send', {
         subscription,
      })
   })

export function App() {
   return (
      <div className='w-screen h-screen flex justify-center items-center'>
         <div className='w-full max-w-5xl px-6 flex flex-col gap-16' >
            <Header />
            <SummaryTable />
         </div>
      </div>
   )
}


