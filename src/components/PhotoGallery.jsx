import { Link } from 'react-router-dom'
import './PhotoGallery.css'

/*
 * The photography room is a "gallery" (grill.md), not a tile stack: a responsive
 * grid of covers, each linking to its write-up. Light surface, generous gutters.
 */
export default function PhotoGallery({ photos }) {
  if (!photos.length) {
    return (
      <section className="tile tile--light">
        <div className="tile__inner">
          <p className="t-lead">Photographs coming soon.</p>
        </div>
      </section>
    )
  }
  return (
    <section className="photo-gallery tile--light">
      <ul className="photo-gallery__grid">
        {photos.map((photo) => (
          <li key={photo.slug} className="photo-gallery__item">
            <Link className="photo-gallery__link" to={`/projects/${photo.slug}`}>
              <img
                className="photo-gallery__img"
                src={photo.cover}
                alt={photo.title}
                loading="lazy"
              />
              <span className="photo-gallery__caption t-caption">{photo.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
