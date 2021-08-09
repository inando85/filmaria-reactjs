import { Link } from 'react-router-dom'
import './footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <p>Crated by Fernando Junior</p>
      <Link to="https://github.com/inando85/filmaria-reactjs">Github Project</Link>
    </div>
  )
}

export default Footer