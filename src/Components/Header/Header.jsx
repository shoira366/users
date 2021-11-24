import './Header.scss'
import { NavLink } from 'react-router-dom'
import useLang from '../../Hook/useLang'
function Header() {
    let [lang, setLang] = useLang()
    return (
        <header className="header">
            <div className="container">
                <nav>
                    <NavLink className="header_nav-link" to="/">Home</NavLink>
                    <NavLink className="header_nav-link" to="/users">Users</NavLink>
                    <NavLink className="header_nav-link" to="/posts">Posts</NavLink>
                </nav>
                <select className="select" onChange={(e) => {
                    setLang(e.target.value)
                }} defaultValue={lang}>
                    <option value="uz">UZ</option>
                    <option value="ru">RU</option>
                    <option value="eng">ENG</option>
                </select>
            </div>
        </header>
    )
}

export default Header