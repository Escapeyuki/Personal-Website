import { Link } from 'react-router-dom'
import './Button.css'

/*
 * The signature pill button. Two variants:
 *   - "primary"   → Action Blue fill (the main CTA)
 *   - "secondary" → ghost pill: transparent with a blue outline
 * Renders a router <Link> when `to` is given (internal navigation), an <a> when
 * `href` is given (external), otherwise a <button>.
 */
export default function Button({ variant = 'primary', to, href, children, ...rest }) {
  const className = `btn btn--${variant} t-body`
  if (to) {
    return (
      <Link className={className} to={to} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a className={className} href={href} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  )
}
