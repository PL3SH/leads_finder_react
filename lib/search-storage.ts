import type { SearchResult, SearchParams, Lead } from "./types"

// In-memory storage for search results (in a real app, this would be a database)
let searchHistory: SearchResult[] = []

export const saveSearchResult = (searchParams: SearchParams, leads: Lead[]): SearchResult => {
  const searchResult: SearchResult = {
    id: generateSearchId(),
    searchParams,
    leads,
    date: new Date().toISOString(),
    totalLeads: leads.length,
  }

  // Add to the beginning of the array (most recent first)
  searchHistory.unshift(searchResult)

  // Keep only the last 50 searches to prevent memory issues
  if (searchHistory.length > 50) {
    searchHistory = searchHistory.slice(0, 50)
  }

  return searchResult
}

export const getSearchHistory = (): SearchResult[] => {
  return [...searchHistory] // Return a copy to prevent external mutations
}

export const getSearchById = (id: string): SearchResult | undefined => {
  return searchHistory.find((search) => search.id === id)
}

export const deleteSearchById = (id: string): boolean => {
  const initialLength = searchHistory.length
  searchHistory = searchHistory.filter((search) => search.id !== id)
  return searchHistory.length < initialLength
}

export const clearSearchHistory = (): void => {
  searchHistory = []
}

// Generate a unique search ID
function generateSearchId(): string {
  return `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Initialize with some mock data for demonstration
if (searchHistory.length === 0) {
  // Add some initial mock search results
  const mockSearches: SearchResult[] = [
    {
      id: "search_1",
      searchParams: {
        businessType: "bakery",
        locations: ["atlanta", "austin"],
        numberOfBusinesses: 50,
        includeGoogleSearch: true,
        customSearchQuery: "artisan bakery",
      },
      leads: [],
      date: "2024-01-15T10:30:00.000Z",
      totalLeads: 25,
    },
    {
      id: "search_2",
      searchParams: {
        businessType: "dentist",
        locations: ["chicago", "denver"],
        numberOfBusinesses: 25,
        includeGoogleSearch: false,
      },
      leads: [],
      date: "2024-01-10T14:20:00.000Z",
      totalLeads: 18,
    },
  ]

  searchHistory = mockSearches
}
