export interface BusinessType {
  id: string
  name: string
  category: string
}

export interface City {
  id: string
  name: string
  state: string
}

export interface SearchSnippet {
  title: string
  description: string
  url: string
  displayUrl: string
}

export interface CompetitorAnalysis {
  totalCompetitors: number
  topCompetitors: Array<{
    name: string
    ranking: number
    hasWebsite: boolean
    estimatedTraffic?: string
  }>
  marketSaturation: "low" | "medium" | "high"
}

export interface SearchTrendData {
  searchVolume: number
  trend: "increasing" | "stable" | "decreasing"
  seasonality?: string
  competitionLevel: "low" | "medium" | "high"
}

export interface LocalSEOScore {
  overallScore: number
  factors: {
    googleMyBusiness: number
    localKeywords: number
    reviews: number
    citations: number
    websiteOptimization: number
  }
  recommendations: string[]
}

export interface Lead {
  id: string
  businessName: string
  category: string
  website?: string
  phone?: string
  email?: string
  address: string
  lighthouseScore?: number
  leadScore: number
  leadType: "excellent" | "good" | "medium" | "poor" | "research-needed"
  notes?: string
  source: "google-maps" | "google-search" | "both"
  googleMapsListing?: boolean
  googleSearchRanking?: number
  searchSnippet?: SearchSnippet
  localSEOScore?: LocalSEOScore
  competitorData?: CompetitorAnalysis
}

export interface SearchParams {
  businessType: string
  locations: string[]
  numberOfBusinesses: number
  includeGoogleSearch: boolean
  customSearchQuery?: string
  includeCompetitorAnalysis: boolean
  includeTrendAnalysis: boolean
}

export interface SearchResult {
  id: string
  searchParams: SearchParams
  leads: Lead[]
  date: string
  totalLeads: number
  trendData?: SearchTrendData
  competitorAnalysis?: CompetitorAnalysis
}

export type LeadType = {
  id: string
  label: string
  description: string
  color: string
}

export interface LeadTableItem extends Lead {
  isInZoho: boolean
  dateAdded: string
  city: string
  state: string
}
