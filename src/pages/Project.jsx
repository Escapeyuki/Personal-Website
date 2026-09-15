import { useParams, Link } from 'react-router-dom'
import Button from '../components/Button.jsx'
import NotFound from './NotFound.jsx'
import { getProject } from '../content/projects.js'
import './Project.css'

// A project's detail page: the rendered MDX write-up, framed by its title, tags,
// and repo link. Left-aligned reading column (not the centered Tile stack).
const ROOMS = { quant: '/quant', frontend: '/frontend', photography: '/photography' }

export default function Project() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFound />

  const { title, tags, repo, category, Component } = project
  return (
    <article className="project-article">
      <div className="project-article__inner">
        <Link className="project-article__back t-caption" to={ROOMS[category] ?? '/'}>
          ← Back to {category}
        </Link>
        {tags?.length > 0 && (
          <p className="project-article__tags t-caption">{tags.join(' · ')}</p>
        )}
        <h1 className="t-display-lg project-article__title">{title}</h1>
        {repo && (
          <p className="project-article__repo">
            <Button variant="secondary" href={repo} target="_blank" rel="noreferrer">
              View on GitHub
            </Button>
          </p>
        )}
        <div className="prose">
          <Component />
        </div>
      </div>
    </article>
  )
}
