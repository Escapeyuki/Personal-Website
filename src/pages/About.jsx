import Tile from '../components/Tile.jsx'
import Button from '../components/Button.jsx'
import './About.css'

/*
 * About + contact (grill.md default: email link + social links). The intro copy
 * and the email address are placeholders for the user to personalize — the
 * GitHub link is the one known, public contact.
 */
const EMAIL = 'your-email@example.com' // TODO: user to replace with a real address
const GITHUB = 'https://github.com/Escapeyuki'

export default function About() {
  return (
    <>
      <Tile variant="light">
        <h1 className="t-display-lg">About</h1>
        <p className="t-lead">
          Quant developer, front-end engineer, and photographer.
        </p>
      </Tile>

      <Tile variant="parchment">
        <p className="t-body">
          I build trading and data systems, design and ship front-end interfaces,
          and photograph the city in between. This site collects that work in one
          place — each project links to its full write-up and its code.
        </p>
        <p className="t-body">
          I care about clarity: systems that are simple enough to reason about, and
          interfaces quiet enough to let the work speak.
        </p>
        <p className="t-tagline">Get in touch</p>
        <div className="about__contact">
          <Button variant="primary" href={`mailto:${EMAIL}`}>
            Email
          </Button>
          <Button variant="secondary" href={GITHUB} target="_blank" rel="noreferrer">
            GitHub
          </Button>
        </div>
      </Tile>
    </>
  )
}
