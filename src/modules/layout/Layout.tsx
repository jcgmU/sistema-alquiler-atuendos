import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
export default function Layout() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <div className="flex gap-6">
          <Sidebar/>
          <main className="flex-1">
            <Topbar/>
            <div className="grid gap-6 p-2">
              <Outlet/>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
