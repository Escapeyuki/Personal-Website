import Tile from './Tile.jsx'
import Button from './Button.jsx'
import './ProjectTile.css'

/*
 * One project as a full-bleed tile (the quant/front-end rooms are "stacks of
 * tiles" — grill.md). The cover image rests on the surface with the system
 * product-shadow (the only shadow in the design). The room passes the surface
 * `variant` so tiles alternate light ↔ dark down the page.
 */
export default function ProjectTile({ project, variant = 'light' }) {
  const { slug, title, summary, tags, repo, cover } = project
  return (
    <Tile variant={variant} className="project-tile">
      {cover && (
        <img className="project-tile__cover" src={cover} alt={`${title} cover`} loading="lazy" />
      )}
      {tags?.length > 0 && (
        <p className="project-tile__tags t-caption">{tags.join(' · ')}</p>
      )}
      <h2 className="t-display-lg">{title}</h2>
      <p className="t-lead">{summary}</p>
      <div className="project-tile__actions">
        <Button variant="primary" to={`/projects/${slug}`}>
          Read write-up →
        </Button>
        {repo && (
          <Button variant="secondary" href={repo} target="_blank" rel="noreferrer">
            GitHub
          </Button>
        )}
      </div>
    </Tile>
  )
}
