import Tile from '../components/Tile.jsx'
import ProjectTile from '../components/ProjectTile.jsx'
import { projectsByCategory } from '../content/projects.js'

const VARIANTS = ['light', 'dark', 'parchment', 'dark-3']

export default function Frontend() {
  const projects = projectsByCategory('frontend')
  return (
    <>
      <Tile variant="parchment">
        <h1 className="t-display-lg">Front-end</h1>
        <p className="t-lead">Interfaces built with care and precision.</p>
      </Tile>
      {projects.length === 0 ? (
        <Tile variant="light">
          <p className="t-lead">Projects coming soon.</p>
        </Tile>
      ) : (
        projects.map((project, i) => (
          <ProjectTile key={project.slug} project={project} variant={VARIANTS[i % VARIANTS.length]} />
        ))
      )}
    </>
  )
}
