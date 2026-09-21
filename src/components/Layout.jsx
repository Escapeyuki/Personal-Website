import { Outlet } from 'react-router-dom'
import GlobalNav from './GlobalNav.jsx'
import Footer from './Footer.jsx'

/*
 * Shared shell for every page: the global nav on top, the routed page in the
 * middle, the footer at the bottom. Pages render into <Outlet />.
 */
export default function Layout() {
  return (
    <>
      <GlobalNav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
