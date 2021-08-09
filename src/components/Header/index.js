import './header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <Link className="logo" to="/">Filmaria</Link>
      <Link className="favoritos" to="/">Favoritos</Link>
    </header>
  )
}

export default Header