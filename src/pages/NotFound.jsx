import Tile from '../components/Tile.jsx'
import Button from '../components/Button.jsx'

// Shown for any unknown route.
export default function NotFound() {
  return (
    <Tile variant="light">
      <h1 className="t-display-lg">Page not found</h1>
      <p className="t-lead">That page doesn’t exist.</p>
      <Button variant="primary" to="/">
        Back home
      </Button>
    </Tile>
  )
}
