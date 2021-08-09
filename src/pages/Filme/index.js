import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Loader from "react-js-loader"
import { toast } from 'react-toastify'

import './filme.css'
import api from '../../services/api'


const Filme = () => {
  const { id } = useParams()

  const history = useHistory()

  const [filme, setFilme] = useState({})

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadFilme () {
      const response = await api.get(`r-api/?api=filmes/${id}`)

      if (response.data.length === 0) {
        // Tentou acessar com ID que não existe, será navegado imperativamente para a home usando o useHistory
        history.replace('/')
        return
      }
      setFilme(response.data)
      setLoading(false)
    }

    loadFilme()

    // Quando o componente for desmontado, encerrando o ciclo de vida dele e parar de ficar olhando a requisição
    return () => {
      console.log('Componente Desmontado!')
    }

  }, [ history, id ])

  function salvaFilme () {
    const minhaLista = localStorage.getItem('filmes')

    let filmesSalvos = JSON.parse(minhaLista) || []

    // Se tiver um filme já salvo com o mesmo ID, precisamos ignorar
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

    if (hasFilme) {
      toast.error('Esse filme já está salvo na sua lista.')
      return
    }

    filmesSalvos.push(filme)
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos))
    toast.success('Filme salvo na sua lista de favoritos.')
  }

  if (loading) {
    return (
      <div className="filme-info-loading">
        <Loader type="spinner-default" bgColor={"#84e"} size={100} />
      </div>
    )
  }
  return (
    <div className="filme-info">
      <h1>{filme.nome}</h1>
      <img src={filme.foto} alt={filme.nome}/>
      <div className="sinopse">
        <h3>Sinopse</h3>
        <p>{filme.sinopse}</p>
      </div>
      <div className="botoes">
        <button onClick={ salvaFilme }>Add Favoritos</button>
        <button>
          <a href={`https://youtube.com/results?search_query=${filme.nome} trailer`} target="blank">
            Trailer
          </a>
        </button>
      </div>
    </div>
  )
}

export default Filme