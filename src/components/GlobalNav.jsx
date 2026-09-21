import { Link } from 'react-router-dom'
import './GlobalNav.css'

/*
 * Persistent, ultra-thin black nav bar pinned to the top of every page.
 * 44px tall, nav-link typography. Uses router links for client-side navigation.
 */
const LINKS = [
  { label: 'Quant', to: '/quant' },
  { label: 'Front-end', to: '/frontend' },
  { label: 'Photography', to: '/photography' },
  { label: 'About', to: '/about' },
]

export default function GlobalNav() {
  return (
    <nav className="global-nav">
      <div className="global-nav__inner">
        <Link className="global-nav__brand t-nav-link" to="/">
          Escape Yuki
        </Link>
        <ul className="global-nav__links">
          {LINKS.map((link) => (
            <li key={link.to}>
              <Link className="global-nav__link t-nav-link" to={link.to}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
