import Tile from '../components/Tile.jsx'
import ProjectTile from '../components/ProjectTile.jsx'
import { projectsByCategory } from '../content/projects.js'

// Surfaces cycle down the stack so the color change is the divider (DESIGN.md).
const VARIANTS = ['light', 'dark', 'parchment', 'dark-3']

export default function Quant() {
  const projects = projectsByCategory('quant')
  return (
    <>
      <Tile variant="dark">
        <h1 className="t-display-lg">Quant</h1>
        <p className="t-lead">Trading systems, backtests, and market-data work.</p>
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
