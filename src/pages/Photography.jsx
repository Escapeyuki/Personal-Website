import Tile from '../components/Tile.jsx'
import PhotoGallery from '../components/PhotoGallery.jsx'
import { projectsByCategory } from '../content/projects.js'

export default function Photography() {
  const photos = projectsByCategory('photography')
  return (
    <>
      <Tile variant="dark">
        <h1 className="t-display-lg">Photography</h1>
        <p className="t-lead">A gallery of selected frames.</p>
      </Tile>
      <PhotoGallery photos={photos} />
    </>
  )
}
