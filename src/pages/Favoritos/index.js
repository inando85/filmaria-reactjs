import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import './favoritos.css'

const Favoritos = () => {

  const [filmes, setFilmes] = useState([])

  useEffect(() => {
    const minhaLista = localStorage.getItem('filmes')

    setFilmes(JSON.parse(minhaLista) || [])


  }, [])

  function handleDelete (id) {
    let filtroFilmes = filmes.filter(filme => {
      return (filme.id !== id)
    })

    setFilmes(filtroFilmes)
    localStorage.setItem('filmes', JSON.stringify(filtroFilmes))
    toast.success('Filme excluído com sucesso.')
  }

  return (
    <div className="meus-filmes">
      <h1>Meus Filmes Favoritos</h1>

      {
        filmes.length === 0 &&
          <span>Você não possui filmes listados</span>
      }

      <ul>
        {
          filmes.map(filme => {
            return (
              <li key={filme.id}>
                <span>{filme.nome}</span>

                <div>
                  <Link to={`/filme/${filme.id}`}>Detalhes</Link>
                  {/* Como a função handleDelete vai passar parametro, devemos usar uma função anonima pra nao executar automaticamente ela mas sim, somente no click */}
                  <button onClick={ () => handleDelete(filme.id) }>Remover</button>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Favoritos