import { Suspense, lazy } from 'react'
import Tile from '../components/Tile.jsx'
import Button from '../components/Button.jsx'
import './Landing.css'

// Lazy-loaded so the three.js bundle doesn't block the hero text's first paint.
const HeroCanvas = lazy(() => import('../components/HeroCanvas.jsx'))

/*
 * The landing gallery. A hero fills the first screen (the three.js accent lands
 * here in Phase 6), then one signature tile per category. Surfaces alternate
 * light ↔ dark like the DESIGN.md pulse — the color change is the divider.
 */
const CATEGORIES = [
  {
    variant: 'dark',
    title: 'Quant',
    tagline: 'Trading systems, backtests, and market-data work.',
    cta: 'Explore quant',
    to: '/quant',
  },
  {
    variant: 'parchment',
    title: 'Front-end',
    tagline: 'Interfaces built with care and precision.',
    cta: 'Explore front-end',
    to: '/frontend',
  },
  {
    variant: 'dark-3',
    title: 'Photography',
    tagline: 'A gallery of selected frames.',
    cta: 'View photography',
    to: '/photography',
  },
]

export default function Landing() {
  return (
    <>
      <Tile variant="light" className="landing-hero">
        <Suspense fallback={null}>
          <HeroCanvas />
        </Suspense>
        <div className="landing-hero__content">
          <h1 className="t-hero">Escape Yuki</h1>
          <p className="t-lead">
            Quantitative development, front-end engineering, and photography.
          </p>
        </div>
      </Tile>

      {CATEGORIES.map((category) => (
        <Tile key={category.to} variant={category.variant} className="landing-tile">
          <h2 className="t-display-lg">{category.title}</h2>
          <p className="t-lead">{category.tagline}</p>
          <Button variant="primary" to={category.to}>
            {category.cta} →
          </Button>
        </Tile>
      ))}
    </>
  )
}
