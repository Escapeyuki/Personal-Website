import { Link } from 'react-router-dom'
import './Footer.css'

/*
 * Site footer. Parchment surface, muted ink. Link columns use dense-link
 * typography (the relaxed 2.41 leading is what keeps the columns scannable);
 * headings use caption-strong; the legal row uses fine-print. DESIGN.md → Footer.
 * Internal links use the router; external links (http...) use a plain anchor.
 */
const COLUMNS = [
  {
    heading: 'Work',
    links: [
      { label: 'Quant', href: '/quant' },
      { label: 'Front-end', href: '/frontend' },
      { label: 'Photography', href: '/photography' },
    ],
  },
  {
    heading: 'More',
    links: [
      { label: 'About', href: '/about' },
      { label: 'GitHub', href: 'https://github.com/Escapeyuki' },
    ],
  },
]

function FooterLink({ href, label }) {
  const isExternal = href.startsWith('http')
  if (isExternal) {
    return (
      <a
        className="footer__link t-dense-link"
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {label}
      </a>
    )
  }
  return (
    <Link className="footer__link t-dense-link" to={href}>
      {label}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__columns">
          {COLUMNS.map((col) => (
            <div className="footer__column" key={col.heading}>
              <h3 className="footer__heading t-caption-strong">{col.heading}</h3>
              <ul className="footer__links">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="footer__legal t-fine-print">
          © 2026 Escape Yuki. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
