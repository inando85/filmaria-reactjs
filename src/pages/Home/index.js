import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from "react-js-loader"

import './home.css'

import api from '../../services/api'

const Home = () => {
  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilmes () {
      const response = await api.get('/r-api/?api=filmes')
      setFilmes(response.data)
      setLoading(false)
    }
    
    loadFilmes()

  }, [])

  if (loading) {
    return (
      <div className="container">
      <div className="lista-filmes-loading">
        <Loader type="spinner-default" bgColor={"#84e"} size={100} />
      </div>
    </div>
    )
  }

  return (
    <div className="container">
      <div className="lista-filmes">
        {
          filmes.map(filme => {
            return (
              <article key={filme.id}>
                <strong> {filme.nome} </strong>
                <img src={filme.foto} alt={filme.nome}/>
                <Link to={`/filme/${filme.id}`}>Acessar</Link>
              </article>
            )
          })
        }
      </div>
    </div>
  )
}

export default Home