// service workers são scripts que ficam rodando de background no browser mesmo após o app ser fechado.

self.addEventListener('push', function (event){
   const body =event.data?.text() ?? ''

   event.waitUntil(
      self.registration.showNotification('Habits', {
         body,
      })
   )
})