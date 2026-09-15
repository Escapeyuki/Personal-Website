import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Landing from './pages/Landing.jsx'
import Quant from './pages/Quant.jsx'
import Frontend from './pages/Frontend.jsx'
import Photography from './pages/Photography.jsx'
import Project from './pages/Project.jsx'
import About from './pages/About.jsx'
import NotFound from './pages/NotFound.jsx'

// Route table. Every page shares Layout (nav + footer); the "*" route catches
// anything unknown and shows the not-found page.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="quant" element={<Quant />} />
        <Route path="frontend" element={<Frontend />} />
        <Route path="photography" element={<Photography />} />
        <Route path="projects/:slug" element={<Project />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
