import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'

// Project write-ups are MDX (grill.md Q9): Markdown + optional live components,
// with a frontmatter block exported as `frontmatter`, KaTeX math, and code
// syntax highlighting. The MDX plugin must run BEFORE the React plugin, and the
// React plugin must also process .mdx so Fast Refresh works on write-ups.
export default defineConfig({
  base: '/', // GitHub Pages user site serves from the domain root (Q5)
  plugins: [
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkMath],
        rehypePlugins: [rehypeKatex, rehypeHighlight],
      }),
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
})
