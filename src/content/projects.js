/*
 * Project index — the single source the rooms and detail pages read.
 *
 * Loads every write-up in src/content/*.mdx eagerly (so frontmatter is available
 * synchronously when a room renders), and normalizes each one to the shape the
 * UI expects. The exported functions are unchanged from the Phase 7 seam; each
 * project now also carries `Component` (the MDX body) for the detail page.
 * Frontmatter fields per file: title, category, summary, tags, repo, cover, date.
 */
const modules = import.meta.glob('./*.mdx', { eager: true })

// YAML may hand back a Date for an unquoted `date:`; normalize to a sortable
// YYYY-MM-DD string so ordering never depends on how the field was written.
function toISODate(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value ?? '')
}

const projects = Object.entries(modules).map(([path, mod]) => {
  const frontmatter = mod.frontmatter ?? {}
  const slug = path.split('/').pop().replace(/\.mdx$/, '')
  return {
    slug,
    title: frontmatter.title ?? slug,
    category: frontmatter.category ?? 'uncategorized',
    summary: frontmatter.summary ?? '',
    tags: frontmatter.tags ?? [],
    repo: frontmatter.repo ?? '',
    cover: frontmatter.cover ?? '',
    date: toISODate(frontmatter.date),
    Component: mod.default,
  }
})

// Newest first.
export const allProjects = [...projects].sort((a, b) => b.date.localeCompare(a.date))

export function projectsByCategory(category) {
  return allProjects.filter((project) => project.category === category)
}

export function getProject(slug) {
  return allProjects.find((project) => project.slug === slug)
}
