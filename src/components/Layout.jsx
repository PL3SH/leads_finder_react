import { useState } from "react"
import Sidebar from "./Sidebar"
import { Menu, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-0' : 'w-64'}`}>
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-main relative">
        {/* Toggle Button */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="sm"
            className="bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white shadow-sm"
          >
            {isSidebarCollapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <ArrowLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Content */}
        <div className="pt-4">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout
