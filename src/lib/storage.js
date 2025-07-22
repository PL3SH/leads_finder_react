// Local storage utilities for managing search results and lead data

class SearchStorage {
  constructor() {
    this.storageKey = "leadgen_searches"
    this.maxSearches = 50
  }

  // Save search result
  saveSearchResult(searchParams, leads) {
    const searchResult = {
      id: this.generateSearchId(),
      searchParams,
      leads,
      date: new Date().toISOString(),
      totalLeads: leads.length,
      trendData: searchParams.includeTrendAnalysis ? this.generateMockTrendData() : undefined,
      competitorAnalysis: searchParams.includeCompetitorAnalysis ? this.generateMockCompetitorData() : undefined,
    }

    const searches = this.getSearchHistory()
    searches.unshift(searchResult)

    // Keep only the last maxSearches
    if (searches.length > this.maxSearches) {
      searches.splice(this.maxSearches)
    }

    localStorage.setItem(this.storageKey, JSON.stringify(searches))
    return searchResult
  }

  // Get search history
  getSearchHistory() {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Error parsing search history:", error)
      return []
    }
  }

  // Get search by ID
  getSearchById(id) {
    const searches = this.getSearchHistory()
    return searches.find((search) => search.id === id)
  }

  // Delete search by ID
  deleteSearchById(id) {
    const searches = this.getSearchHistory()
    const filtered = searches.filter((search) => search.id !== id)
    localStorage.setItem(this.storageKey, JSON.stringify(filtered))
    return filtered.length < searches.length
  }

  // Clear all searches
  clearSearchHistory() {
    localStorage.removeItem(this.storageKey)
  }

  // Generate unique search ID
  generateSearchId() {
    return `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Generate mock trend data
  generateMockTrendData() {
    return {
      searchVolume: Math.floor(Math.random() * 20000) + 5000,
      trend: ["increasing", "stable", "decreasing"][Math.floor(Math.random() * 3)],
      seasonality: "Higher demand in Q4 (holiday season)",
      competitionLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
    }
  }

  // Generate mock competitor data
  generateMockCompetitorData() {
    return {
      totalCompetitors: Math.floor(Math.random() * 50) + 20,
      topCompetitors: [
        { name: "Top Competitor 1", ranking: 1, hasWebsite: true, estimatedTraffic: "2.5K/month" },
        { name: "Top Competitor 2", ranking: 2, hasWebsite: false },
        { name: "Top Competitor 3", ranking: 3, hasWebsite: true, estimatedTraffic: "1.8K/month" },
      ],
      marketSaturation: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
    }
  }
}

export const searchStorage = new SearchStorage()

// Lead storage utilities
class LeadStorage {
  constructor() {
    this.storageKey = "leadgen_leads"
  }

  // Get all leads
  getAllLeads() {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error("Error parsing leads:", error)
      return []
    }
  }

  // Save leads
  saveLeads(leads) {
    localStorage.setItem(this.storageKey, JSON.stringify(leads))
  }

  // Update lead
  updateLead(leadId, updateData) {
    const leads = this.getAllLeads()
    const index = leads.findIndex((lead) => lead.id === leadId)
    if (index !== -1) {
      leads[index] = { ...leads[index], ...updateData }
      this.saveLeads(leads)
      return leads[index]
    }
    return null
  }

  // Get lead by ID
  getLeadById(leadId) {
    const leads = this.getAllLeads()
    return leads.find((lead) => lead.id === leadId)
  }
}

export const leadStorage = new LeadStorage()
