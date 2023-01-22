// Diego: "Crio uma pasta lib pois nela eu deixo integrações com outras bibliotecas"

import axios from 'axios'

export const api = axios.create({
   baseURL: 'http://localhost:3333'
})