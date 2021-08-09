import axios from 'axios'

// r-api/?api=filmes/ (ROTA PARA TODOS OS FILMES)
// r-api/?api=filmes/123 (ROTA PARA O FILME DO ID 123)

const api = axios.create({
  baseURL: 'https://sujeitoprogramador.com'
})

export default api