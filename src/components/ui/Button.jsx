import React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  const variants = {
    default: "btn-glass-primary",
    destructive: "bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-600/90 hover:to-red-700/90 text-white border border-red-500/30 backdrop-filter backdrop-blur-lg",
    outline: "btn-glass-secondary",
    secondary: "glass-bg-secondary glass-text-primary border glass-border hover:glass-shadow-light",
    ghost: "bg-transparent hover:glass-bg-accent glass-text-primary border-0 backdrop-filter backdrop-blur-sm",
    link: "bg-transparent text-blue-600 hover:text-blue-700 underline border-0 p-0",
  }

  const sizes = {
    default: "px-5 py-3",
    sm: "px-4 py-2 text-sm",
    lg: "px-8 py-4 text-base",
    icon: "w-12 h-12 p-0",
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
        variants[variant],
        sizes[size],
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button }
