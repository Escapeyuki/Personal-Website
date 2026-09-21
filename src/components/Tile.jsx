import './Tile.css'

/*
 * Full-bleed, edge-to-edge section. The color change between tiles IS the
 * divider — no borders, no shadows on the tile itself. Variants:
 *   "light" | "parchment" | "dark" | "dark-2" | "dark-3"
 * Content is centered in a max-980px column (DESIGN.md text-section width).
 */
export default function Tile({ variant = 'light', className = '', children, ...rest }) {
  return (
    <section className={`tile tile--${variant} ${className}`.trim()} {...rest}>
      <div className="tile__inner">{children}</div>
    </section>
  )
}
