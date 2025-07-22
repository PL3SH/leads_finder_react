"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const Select = ({ children, value, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)
  const selectRef = useRef(null)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSelect = (newValue) => {
    setSelectedValue(newValue)
    setIsOpen(false)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  return (
    <div ref={selectRef} className="relative" {...props}>
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => setIsOpen(!isOpen),
            isOpen,
            selectedValue,
          })
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, {
            isOpen,
            onSelect: handleSelect,
            selectedValue,
          })
        }
        return child
      })}
    </div>
  )
}

const SelectTrigger = React.forwardRef(({ className, children, onClick, isOpen, selectedValue, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    onClick={onClick}
    {...props}
  >
    {children}
    <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
  </button>
))
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder, selectedValue, children }) => {
  return <span className="block truncate">{selectedValue || placeholder}</span>
}

const SelectContent = React.forwardRef(({ className, children, isOpen, onSelect, selectedValue, ...props }, ref) => {
  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-full z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md",
        className,
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (child.type === SelectItem) {
          return React.cloneElement(child, {
            onSelect,
            isSelected: child.props.value === selectedValue,
          })
        }
        return child
      })}
    </div>
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef(({ className, children, value, onSelect, isSelected, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      isSelected && "bg-accent text-accent-foreground",
      className,
    )}
    onClick={() => onSelect && onSelect(value)}
    {...props}
  >
    {children}
  </div>
))
SelectItem.displayName = "SelectItem"

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }
