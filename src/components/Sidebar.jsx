import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Search, BarChart3, History, Settings, User } from "lucide-react"

const navigation = [
  { name: "Search", href: "/", icon: Search },
  { name: "Leads", href: "/leads", icon: BarChart3 },
  { name: "History", href: "/history", icon: History },
]

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar">
      {/* Logo */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg width="30" height="30" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="4" fill="#000000" />
              <text x="14" y="18" textAnchor="middle" fill="white" fontSize="12" fontFamily="system-ui">
                SL
              </text>
            </svg>
          </div>
        </div>
        <p className="text-sm text-secondary font-normal">Lead Generator</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive =
              location.pathname === item.href || (item.href !== "/" && location.pathname.startsWith(item.href))

            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-4 py-3 text-sm font-normal transition-all duration-200 ease-in-out rounded-none",
                    isActive ? "bg-black text-white" : "text-secondary hover:bg-gray-200/50 hover:text-primary",
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
