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
    // Add trend data and competitor analysis if requested
    trendData: searchParams.includeTrendAnalysis
      ? {
          searchVolume: Math.floor(Math.random() * 20000) + 5000,
          trend: ["increasing", "stable", "decreasing"][Math.floor(Math.random() * 3)] as any,
          seasonality: "Higher demand in Q4 (holiday season)",
          competitionLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as any,
        }
      : undefined,
    competitorAnalysis: searchParams.includeCompetitorAnalysis
      ? {
          totalCompetitors: Math.floor(Math.random() * 50) + 20,
          topCompetitors: [
            { name: "Top Competitor 1", ranking: 1, hasWebsite: true, estimatedTraffic: "2.5K/month" },
            { name: "Top Competitor 2", ranking: 2, hasWebsite: false },
            { name: "Top Competitor 3", ranking: 3, hasWebsite: true, estimatedTraffic: "1.8K/month" },
          ],
          marketSaturation: ["low", "medium", "high"][Math.floor(Math.random() * 3)] as any,
        }
      : undefined,
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
        includeCompetitorAnalysis: true,
        includeTrendAnalysis: true,
      },
      leads: [],
      date: "2024-01-15T10:30:00.000Z",
      totalLeads: 25,
      trendData: {
        searchVolume: 12500,
        trend: "increasing",
        seasonality: "Higher demand in Q4 (holiday season)",
        competitionLevel: "medium",
      },
      competitorAnalysis: {
        totalCompetitors: 47,
        topCompetitors: [
          { name: "Sweet Treats Bakery", ranking: 1, hasWebsite: true, estimatedTraffic: "2.5K/month" },
          { name: "Corner Bakehouse", ranking: 2, hasWebsite: false },
          { name: "Artisan Bread Co", ranking: 3, hasWebsite: true, estimatedTraffic: "1.8K/month" },
        ],
        marketSaturation: "medium",
      },
    },
    {
      id: "search_2",
      searchParams: {
        businessType: "dentist",
        locations: ["chicago", "denver"],
        numberOfBusinesses: 25,
        includeGoogleSearch: false,
        includeCompetitorAnalysis: false,
        includeTrendAnalysis: false,
      },
      leads: [],
      date: "2024-01-10T14:20:00.000Z",
      totalLeads: 18,
    },
  ]

  searchHistory = mockSearches
}
