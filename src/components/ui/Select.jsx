"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Search } from "lucide-react"

const Select = ({ children, value, onValueChange, ...props }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState(value)
  const [searchQuery, setSearchQuery] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const selectRef = useRef(null)
  const searchInputRef = useRef(null)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchQuery("")
        setHighlightedIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  const handleSelect = (newValue) => {
    setSelectedValue(newValue)
    setIsOpen(false)
    setSearchQuery("")
    setHighlightedIndex(-1)
    if (onValueChange) {
      onValueChange(newValue)
    }
  }

  const handleKeyDown = (event) => {
    if (!isOpen) return

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        setHighlightedIndex(prev => Math.min(prev + 1, getVisibleItems().length - 1))
        break
      case "ArrowUp":
        event.preventDefault()
        setHighlightedIndex(prev => Math.max(prev - 1, -1))
        break
      case "Enter":
        event.preventDefault()
        const visibleItems = getVisibleItems()
        if (highlightedIndex >= 0 && visibleItems[highlightedIndex]) {
          handleSelect(visibleItems[highlightedIndex].props.value)
        }
        break
      case "Escape":
        setIsOpen(false)
        setSearchQuery("")
        setHighlightedIndex(-1)
        break
    }
  }

  const getVisibleItems = () => {
    // This will be populated by SelectContent
    return []
  }

  return (
    <div ref={selectRef} className="relative" onKeyDown={handleKeyDown} {...props}>
      {React.Children.map(children, (child) => {
        if (child.type === SelectTrigger) {
          return React.cloneElement(child, {
            onClick: () => {
              setIsOpen(!isOpen)
              if (!isOpen) {
                setSearchQuery("")
                setHighlightedIndex(-1)
              }
            },
            isOpen,
            selectedValue,
          })
        }
        if (child.type === SelectContent) {
          return React.cloneElement(child, {
            isOpen,
            onSelect: handleSelect,
            selectedValue,
            searchQuery,
            setSearchQuery,
            highlightedIndex,
            setHighlightedIndex,
            searchInputRef,
            getVisibleItems,
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

const SelectContent = React.forwardRef(({
  className,
  children,
  isOpen,
  onSelect,
  selectedValue,
  searchQuery,
  setSearchQuery,
  highlightedIndex,
  setHighlightedIndex,
  searchInputRef,
  getVisibleItems,
  ...props
}, ref) => {
  const [visibleItems, setVisibleItems] = useState([])

  useEffect(() => {
    if (isOpen) {
      const items = React.Children.toArray(children).filter(child => child.type === SelectItem)
      const filtered = items.filter(item => {
        const itemText = item.props.children?.toLowerCase() || ""
        return itemText.includes(searchQuery.toLowerCase())
      })
      setVisibleItems(filtered)
    }
  }, [children, searchQuery, isOpen])

  useEffect(() => {
    // Update the getVisibleItems function reference
    if (typeof getVisibleItems === 'function') {
      getVisibleItems.current = () => visibleItems
    }
  }, [visibleItems, getVisibleItems])

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
      {/* Search Input */}
      <div className="sticky top-0 p-2 border-b bg-popover">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2 text-sm bg-transparent border-none outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Options */}
      <div className="max-h-48 overflow-auto">
        {visibleItems.length > 0 ? (
          visibleItems.map((child, index) => {
            return React.cloneElement(child, {
              onSelect,
              isSelected: child.props.value === selectedValue,
              isHighlighted: index === highlightedIndex,
            })
          })
        ) : (
          <div className="px-3 py-2 text-sm text-muted-foreground">
            No options found
          </div>
        )}
      </div>
    </div>
  )
})
SelectContent.displayName = "SelectContent"

const SelectItem = React.forwardRef(({ className, children, value, onSelect, isSelected, isHighlighted, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      isSelected && "bg-accent text-accent-foreground",
      isHighlighted && "bg-accent text-accent-foreground",
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
