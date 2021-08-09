import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import './filme.css'
import api from '../../services/api'

const Filme = () => {
  const { id } = useParams()
  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadFilme () {
      const response = await api.get(`r-api/?api=filmes/${id}`)
      setFilme(response.data)
      setLoading(false)
    }

    loadFilme()

  }, [ id ])

  if (loading) {
    return (
      <div className="filme-info">
        <h1>Carregando seu filme...</h1>
      </div>
    )
  }
  return (
    <div className="filme-info">
      <h1>Filme - { filme.id }</h1>
    </div>
  )
}

export default Filme