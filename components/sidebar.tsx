"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Search, BarChart3, History, Settings, User } from "lucide-react"

const navigation = [
  { name: "Search", href: "/", icon: Search },
  { name: "Leads", href: "/results", icon: BarChart3 },
  { name: "History", href: "/history", icon: History },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar">
      {/* Logo */}
      <div className="px-6 py-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 flex items-center justify-center relative lead-icon-container">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Background glass effect */}
              <defs>
                <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(139, 92, 246, 0.9)" />
                  <stop offset="50%" stopColor="rgba(59, 130, 246, 0.8)" />
                  <stop offset="100%" stopColor="rgba(139, 92, 246, 0.6)" />
                </linearGradient>
                <linearGradient id="innerGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
                </linearGradient>
              </defs>
              
              {/* Main glass container */}
              <rect width="36" height="36" x="2" y="2" rx="12" fill="url(#glassGradient)"/>
              <rect width="36" height="36" x="2" y="2" rx="12" fill="url(#innerGlow)" opacity="0.3"/>
              <rect width="36" height="36" x="2" y="2" rx="12" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" fill="none"/>
              
              {/* Lead generation icon - stylized funnel with particles */}
              <g transform="translate(8, 8)">
                {/* Funnel shape */}
                <path d="M6 4 L18 4 L16 8 L15 12 L13 16 L11 16 L9 12 L8 8 Z" 
                      fill="rgba(255, 255, 255, 0.95)" 
                      stroke="rgba(255, 255, 255, 0.8)" 
                      strokeWidth="0.8"/>
                
                {/* Input particles */}
                <circle cx="8" cy="2" r="1" fill="rgba(255, 255, 255, 0.9)"/>
                <circle cx="12" cy="1.5" r="0.8" fill="rgba(255, 255, 255, 0.85)"/>
                <circle cx="16" cy="2.2" r="0.6" fill="rgba(255, 255, 255, 0.8)"/>
                
                {/* Output leads */}
                <circle cx="11" cy="18" r="1.2" fill="rgba(255, 255, 255, 0.9)"/>
                <circle cx="13" cy="19" r="1" fill="rgba(255, 255, 255, 0.85)"/>
                
                {/* Flow lines */}
                <path d="M8 2 L9 6" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1"/>
                <path d="M12 1.5 L12 6" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1"/>
                <path d="M16 2.2 L15 6" stroke="rgba(255, 255, 255, 0.7)" strokeWidth="1"/>
              </g>
              
              {/* Outer glow effect */}
              <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" className="lead-icon-glow"/>
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
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
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

      {/* User Profile */}
      <div className="p-4">
        <div className="flex items-center space-x-3 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 flex-shrink-0">
            <User className="h-4 w-4 text-purple-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-normal text-primary truncate">John Doe</p>
            <p className="text-xs text-secondary truncate">john@company.com</p>
          </div>
          <Settings className="h-4 w-4 text-secondary flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}
