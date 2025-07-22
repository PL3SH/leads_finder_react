import Sidebar from "./Sidebar"

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-main">{children}</main>
    </div>
  )
}

export default Layout
