/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx', // diz que todos os arquivos tsx terão estilização
    './index.html' // e o index.html tbm
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090A'// cor customizada no tailwind
      }
    },
    gridTemplateRows: {
      7: 'repeat(7, minmax(0, 1fr))'// por padrao o tailwind so deixa criar grid de ate 6 linhas. Essa configuração permite os 7 (para cada dia da semana)
    }
  },
  plugins: [],
}
