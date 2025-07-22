"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  MapPin,
  Building2,
  Hash,
  Phone,
  Mail,
  Globe,
  Star,
  Eye,
  Download,
  Map,
  SearchIcon,
  TrendingUp,
  Users,
  Target,
} from "lucide-react"
import { businessTypes, cities, leadTypes } from "@/lib/data"
import { saveSearchResult } from "@/lib/search-storage"
import Link from "next/link"
import type { Lead, SearchParams } from "@/lib/types"

export default function SearchPage() {
  const router = useRouter()
  const [selectedBusinessType, setSelectedBusinessType] = useState("")
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [numberOfBusinesses, setNumberOfBusinesses] = useState(50)
  const [includeGoogleSearch, setIncludeGoogleSearch] = useState(false)
  const [citySearch, setCitySearch] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Lead[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [customSearchQuery, setCustomSearchQuery] = useState("")
  const [includeCompetitorAnalysis, setIncludeCompetitorAnalysis] = useState(false)
  const [includeTrendAnalysis, setIncludeTrendAnalysis] = useState(false)
  const [currentSearchId, setCurrentSearchId] = useState<string | null>(null)

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(citySearch.toLowerCase()) ||
      city.state.toLowerCase().includes(citySearch.toLowerCase()),
  )

  const handleSearch = async () => {
    if (!selectedBusinessType || selectedCities.length === 0) {
      return
    }

    setIsSearching(true)
    setHasSearched(false)

    // Create search parameters
    const searchParams: SearchParams = {
      businessType: selectedBusinessType,
      locations: selectedCities,
      numberOfBusinesses,
      includeGoogleSearch,
      customSearchQuery: customSearchQuery.trim() || undefined,
      includeCompetitorAnalysis,
      includeTrendAnalysis,
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock results based on selected business type
    const businessTypeName = businessTypes.find((bt) => bt.id === selectedBusinessType)?.name || selectedBusinessType
    const selectedCityName = cities.find((city) => city.id === selectedCities[0])?.name || "Atlanta"
    const selectedState = cities.find((city) => city.id === selectedCities[0])?.state || "GA"

    // Create realistic leads based on the selected business type
    const generateLeadsForBusinessType = (businessType: string, count = 8): Lead[] => {
      const baseLeads = {
        "hair-salon": [
          {
            id: "salon-1",
            businessName: "Elite Hair Studio",
            category: "Hair Salon",
            website: "https://elitehairstudio.com",
            phone: "(555) 321-0987",
            address: `321 Elm St, ${selectedCityName}, ${selectedState} 30306`,
            lighthouseScore: 88,
            leadScore: 45,
            leadType: "poor" as const,
            source: "google-maps" as const,
            googleMapsListing: true,
          },
          {
            id: "salon-2",
            businessName: "Glamour Hair Lounge",
            category: "Hair Salon",
            phone: "(555) 456-7890",
            email: "info@glamourhair.com",
            address: `789 Beauty Ave, ${selectedCityName}, ${selectedState} 30307`,
            leadScore: 92,
            leadType: "excellent" as const,
            source: "google-maps" as const,
            googleMapsListing: true,
          },
          {
            id: "salon-3",
            businessName: "Trendy Cuts & Color",
            category: "Hair Salon",
            website: "https://trendycuts.com",
            phone: "(555) 234-5678",
            address: `456 Style St, ${selectedCityName}, ${selectedState} 30308`,
            lighthouseScore: 42,
            leadScore: 78,
            leadType: "good" as const,
            source: "both" as const,
            googleMapsListing: true,
            googleSearchRanking: 2,
          },
          {
            id: "salon-4",
            businessName: "Classic Hair Design",
            category: "Hair Salon",
            website: "https://classichairdesign.com",
            address: `123 Main St, ${selectedCityName}, ${selectedState} 30309`,
            lighthouseScore: 65,
            leadScore: 68,
            leadType: "medium" as const,
            source: "google-search" as const,
            googleSearchRanking: 4,
          },
          {
            id: "salon-5",
            businessName: "Salon Bella Vista",
            category: "Hair Salon",
            phone: "(555) 567-8901",
            email: "hello@salonbellavista.com",
            address: `987 Fashion Blvd, ${selectedCityName}, ${selectedState} 30310`,
            leadScore: 85,
            leadType: "excellent" as const,
            source: "google-maps" as const,
            googleMapsListing: true,
          },
          {
            id: "salon-6",
            businessName: "Hair Haven Spa",
            category: "Hair Salon",
            website: "https://hairhavenspa.com",
            phone: "(555) 678-9012",
            address: `654 Wellness Way, ${selectedCityName}, ${selectedState} 30311`,
            lighthouseScore: 35,
            leadScore: 82,
            leadType: "good" as const,
            source: "both" as const,
            googleMapsListing: true,
            googleSearchRanking: 1,
          },
          {
            id: "salon-7",
            businessName: "Modern Hair Studio",
            category: "Hair Salon",
            address: `321 Contemporary Ct, ${selectedCityName}, ${selectedState} 30312`,
            leadScore: 28,
            leadType: "research-needed" as const,
            source: "google-maps" as const,
            googleMapsListing: true,
          },
          {
            id: "salon-8",
            businessName: "Luxury Hair Boutique",
            category: "Hair Salon",
            website: "https://luxuryhairboutique.com",
            phone: "(555) 789-0123",
            email: "contact@luxuryhair.com",
            address: `555 Upscale Ave, ${selectedCityName}, ${selectedState} 30313`,
            lighthouseScore: 72,
            leadScore: 75,
            leadType: "medium" as const,
            source: "google-search" as const,
            googleSearchRanking: 3,
          },
        ],
        bakery: [
          {
            id: "bakery-1",
            businessName: "Sweet Dreams Bakery",
            category: "Bakery",
            phone: "(555) 123-4567",
            email: "info@sweetdreamsbakery.com",
            address: `123 Main St, ${selectedCityName}, ${selectedState} 30309`,
            leadScore: 95,
            leadType: "excellent" as const,
            source: "google-maps" as const,
            googleMapsListing: true,
          },
          {
            id: "bakery-2",
            businessName: "Artisan Bread Co",
            category: "Bakery",
            website: "https://artisanbread.com",
            phone: "(555) 234-5678",
            address: `456 Flour St, ${selectedCityName}, ${selectedState} 30308`,
            lighthouseScore: 45,
            leadScore: 82,
            leadType: "good" as const,
            source: "both" as const,
            googleMapsListing: true,
            googleSearchRanking: 2,
          },
          // Add more bakery leads...
        ],
        dentist: [
          {
            id: "dentist-1",
            businessName: "Downtown Dental Care",
            category: "Dentist",
            website: "https://downtowndental.com",
            phone: "(555) 987-6543",
            address: `456 Oak Ave, ${selectedCityName}, ${selectedState} 30308`,
            lighthouseScore: 35,
            leadScore: 82,
            leadType: "good" as const,
            source: "both" as const,
            googleMapsListing: true,
            googleSearchRanking: 3,
          },
          {
            id: "dentist-2",
            businessName: "Smile Bright Dental",
            category: "Dentist",
            phone: "(555) 345-6789",
            email: "info@smilebright.com",
            address: `789 Tooth Lane, ${selectedCityName}, ${selectedState} 30307`,
            leadScore: 88,
            leadType: "excellent" as const,
            source: "google-maps" as const,
            googleMapsListing: true,
          },
          // Add more dentist leads...
        ],
        restaurant: [
          {
            id: "restaurant-1",
            businessName: "Bella Vista Restaurant",
            category: "Restaurant",
            website: "https://bellavista.com",
            phone: "(555) 456-7890",
            email: "contact@bellavista.com",
            address: `789 Pine St, ${selectedCityName}, ${selectedState} 30307`,
            lighthouseScore: 65,
            leadScore: 71,
            leadType: "medium" as const,
            source: "both" as const,
            googleMapsListing: true,
            googleSearchRanking: 1,
          },
          {
            id: "restaurant-2",
            businessName: "The Local Bistro",
            category: "Restaurant",
            phone: "(555) 567-8901",
            address: `321 Food Court, ${selectedCityName}, ${selectedState} 30306`,
            leadScore: 90,
            leadType: "excellent" as const,
            source: "google-maps" as const,
            googleMapsListing: true,
          },
          // Add more restaurant leads...
        ],
        gym: [
          {
            id: "gym-1",
            businessName: "City Fitness Center",
            category: "Gym",
            address: `654 Maple Ave, ${selectedCityName}, ${selectedState} 30305`,
            leadScore: 25,
            leadType: "research-needed" as const,
            source: "google-maps" as const,
            googleMapsListing: true,
          },
          {
            id: "gym-2",
            businessName: "PowerHouse Gym",
            category: "Gym",
            website: "https://powerhousegym.com",
            phone: "(555) 678-9012",
            address: `987 Strength St, ${selectedCityName}, ${selectedState} 30304`,
            lighthouseScore: 55,
            leadScore: 72,
            leadType: "medium" as const,
            source: "both" as const,
            googleMapsListing: true,
            googleSearchRanking: 2,
          },
          // Add more gym leads...
        ],
        plumber: [
          {
            id: "plumber-1",
            businessName: "Perfect Plumbing Solutions",
            category: "Plumber",
            phone: "(555) 789-0123",
            address: `987 Water St, ${selectedCityName}, ${selectedState} 30304`,
            leadScore: 88,
            leadType: "excellent" as const,
            source: "google-maps" as const,
            googleMapsListing: true,
          },
          {
            id: "plumber-2",
            businessName: "Quick Fix Plumbing",
            category: "Plumber",
            website: "https://quickfixplumbing.com",
            phone: "(555) 890-1234",
            email: "service@quickfix.com",
            address: `123 Pipe Ave, ${selectedCityName}, ${selectedState} 30303`,
            lighthouseScore: 38,
            leadScore: 85,
            leadType: "good" as const,
            source: "both" as const,
            googleMapsListing: true,
            googleSearchRanking: 1,
          },
          // Add more plumber leads...
        ],
      }

      // Get leads for the selected business type, or use a default set
      const selectedLeads = baseLeads[selectedBusinessType as keyof typeof baseLeads] || baseLeads["hair-salon"]

      // Add search snippets and local SEO scores to leads that have websites
      const enhancedLeads = selectedLeads.map((lead) => ({
        ...lead,
        searchSnippet: lead.website
          ? {
              title: `${lead.businessName} - Professional ${businessTypeName} Services`,
              description: `Quality ${businessTypeName.toLowerCase()} services in ${selectedCityName}. ${lead.phone ? "Call today for appointment." : "Visit us for consultation."}`,
              url: lead.website,
              displayUrl: lead.website.replace("https://", ""),
            }
          : undefined,
        localSEOScore: {
          overallScore: lead.website
            ? lead.lighthouseScore
              ? Math.min(85, lead.lighthouseScore + 15)
              : 65
            : Math.max(25, lead.leadScore - 20),
          factors: {
            googleMyBusiness: lead.googleMapsListing ? 85 : 20,
            localKeywords: lead.website ? 70 : 30,
            reviews: Math.min(90, lead.leadScore + 10),
            citations: lead.phone ? 65 : 25,
            websiteOptimization: lead.website ? lead.lighthouseScore || 50 : 0,
          },
          recommendations: lead.website
            ? ["Improve website loading speed", "Add more local service pages", "Optimize for mobile users"]
            : [
                "Create a professional website",
                "Set up Google My Business properly",
                "Start collecting customer reviews",
                "Build local citations",
              ],
        },
      }))

      // Filter based on includeGoogleSearch setting
      let results = enhancedLeads
      if (!includeGoogleSearch) {
        results = enhancedLeads.filter((lead) => lead.source === "google-maps" || lead.source === "both")
      }

      return results.slice(0, Math.min(count, numberOfBusinesses))
    }

    const results = generateLeadsForBusinessType(selectedBusinessType, numberOfBusinesses)

    // Save the search result to storage
    const savedSearch = saveSearchResult(searchParams, results)
    setCurrentSearchId(savedSearch.id)

    setSearchResults(results)
    setHasSearched(true)
    setIsSearching(false)

    // Navigate to results page with the search ID
    const params = new URLSearchParams({
      searchId: savedSearch.id,
      businessType: selectedBusinessType,
      locations: selectedCities.join(","),
      numberOfBusinesses: numberOfBusinesses.toString(),
    })
    router.push(`/results?${params.toString()}`)
  }

  const selectedCityNames = selectedCities.map((id) => cities.find((city) => city.id === id)?.name).filter(Boolean)
  const businessTypeName = businessTypes.find((bt) => bt.id === selectedBusinessType)?.name || selectedBusinessType

  const getLeadTypeInfo = (leadType: string) => {
    return leadTypes.find((lt) => lt.id === leadType) || leadTypes[0]
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "google-maps":
        return <Map className="h-4 w-4" />
      case "google-search":
        return <SearchIcon className="h-4 w-4" />
      case "both":
        return (
          <div className="flex gap-1">
            <Map className="h-3 w-3" />
            <SearchIcon className="h-3 w-3" />
          </div>
        )
      default:
        return null
    }
  }

  const getSourceLabel = (source: string) => {
    switch (source) {
      case "google-maps":
        return "Google Maps"
      case "google-search":
        return "Google Search"
      case "both":
        return "Maps + Search"
      default:
        return "Unknown"
    }
  }

  const exportToCSV = () => {
    const headers = [
      "Business Name",
      "Category",
      "Phone",
      "Email",
      "Website",
      "Address",
      "Lead Score",
      "Lead Type",
      "Lighthouse Score",
      "Source",
      "Google Search Ranking",
    ]
    const csvContent = [
      headers.join(","),
      ...searchResults.map((lead) =>
        [
          `"${lead.businessName}"`,
          `"${lead.category}"`,
          `"${lead.phone || ""}"`,
          `"${lead.email || ""}"`,
          `"${lead.website || ""}"`,
          `"${lead.address}"`,
          lead.leadScore,
          `"${getLeadTypeInfo(lead.leadType).label}"`,
          lead.lighthouseScore || "",
          `"${getSourceLabel(lead.source)}"`,
          lead.googleSearchRanking || "",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `leads-${businessTypeName}-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-main">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-normal text-primary mb-6 leading-tight">Find Your Next Business Leads</h1>
          <p className="text-lg text-secondary font-normal leading-relaxed max-w-4xl">
            Discover and analyze local businesses with our advanced lead scoring system. Get contact information,
            website performance metrics, and actionable insights.
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-12 border-0 shadow-none bg-card">
          <CardContent className="p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full accent-green">
                  <Search className="h-4 w-4 text-black" />
                </div>
                <h2 className="text-2xl font-normal text-primary">Lead Search Parameters</h2>
              </div>
              <p className="text-secondary font-normal">
                Configure your search criteria to find the most relevant business leads
              </p>
            </div>

            <div className="space-y-8">
              {/* Form Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Business Type Selector */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-primary font-normal text-sm">
                    <Building2 className="h-4 w-4" />
                    Business Type
                  </Label>
                  <Select value={selectedBusinessType} onValueChange={setSelectedBusinessType}>
                    <SelectTrigger className="h-12 bg-card border-gray-300 font-normal text-primary">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {businessTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id} className="font-normal">
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Selector */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-primary font-normal text-sm">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <Select value={selectedCities[0] || ""} onValueChange={(value) => setSelectedCities([value])}>
                    <SelectTrigger className="h-12 bg-card border-gray-300 font-normal text-primary">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id} className="font-normal">
                          {city.name}, {city.state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Number of Businesses */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2 text-primary font-normal text-sm">
                    <Hash className="h-4 w-4" />
                    Businesses to Crawl
                  </Label>
                  <Input
                    type="number"
                    min="1"
                    max="500"
                    value={numberOfBusinesses}
                    onChange={(e) => setNumberOfBusinesses(Number.parseInt(e.target.value) || 50)}
                    className="h-12 bg-card border-gray-300 font-normal text-primary"
                    placeholder="50"
                  />
                </div>
              </div>

              {/* Advanced Options */}
              <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-medium text-primary flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Advanced Search Options
                </h3>

                <div className="space-y-4">
                  {/* Custom Search Query */}
                  <div className="space-y-3">
                    <Label className="text-primary font-normal text-sm">Custom Google Search Query (Optional)</Label>
                    <Input
                      value={customSearchQuery}
                      onChange={(e) => setCustomSearchQuery(e.target.value)}
                      placeholder="e.g., 'artisan bakery atlanta' or 'emergency plumber'"
                      className="h-12 bg-card border-gray-300 font-normal text-primary"
                    />
                    <p className="text-xs text-secondary">
                      Refine your search with specific keywords beyond the business type
                    </p>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="includeGoogleSearch"
                        checked={includeGoogleSearch}
                        onCheckedChange={setIncludeGoogleSearch}
                        className="border-gray-300"
                      />
                      <Label htmlFor="includeGoogleSearch" className="text-primary font-normal text-sm cursor-pointer">
                        Include Google Search results - Also crawl businesses that may not be under the business type
                        according to Google Maps, but are present in Google Search results
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="includeCompetitorAnalysis"
                        checked={includeCompetitorAnalysis}
                        onCheckedChange={setIncludeCompetitorAnalysis}
                        className="border-gray-300"
                      />
                      <Label
                        htmlFor="includeCompetitorAnalysis"
                        className="text-primary font-normal text-sm cursor-pointer"
                      >
                        Include competitor analysis - Analyze market saturation and top competing businesses
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="includeTrendAnalysis"
                        checked={includeTrendAnalysis}
                        onCheckedChange={setIncludeTrendAnalysis}
                        className="border-gray-300"
                      />
                      <Label htmlFor="includeTrendAnalysis" className="text-primary font-normal text-sm cursor-pointer">
                        Include search trend insights - Get search volume data and market trends
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Button - Right aligned like in Figma */}
              <div className="flex justify-end">
                <Button
                  onClick={handleSearch}
                  disabled={!selectedBusinessType || selectedCities.length === 0 || isSearching}
                  className="bg-black hover:bg-gray-800 text-white font-normal h-12 px-6 rounded-none"
                >
                  {isSearching ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-3" />
                      <span>Searching...</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Search className="mr-2 h-4 w-4" />
                      <span>Start Lead Search</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {hasSearched && (
          <>
            {/* Results Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-normal text-primary">Search Results</h2>
                <Button
                  onClick={exportToCSV}
                  className="bg-black hover:bg-gray-800 text-white font-normal rounded-none"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-8 text-sm font-normal">
                    <div className="text-primary">
                      <span className="font-medium">Business Type:</span> {businessTypeName}
                    </div>
                    <div className="text-primary">
                      <span className="font-medium">Location:</span> {selectedCityNames.join(", ")}
                    </div>
                    <div className="text-primary">
                      <span className="font-medium">Found:</span> {searchResults.length} leads
                    </div>
                    <div className="text-primary">
                      <span className="font-medium">Google Search:</span>{" "}
                      {includeGoogleSearch ? "Included" : "Maps Only"}
                    </div>
                    {currentSearchId && (
                      <div className="text-primary">
                        <span className="font-medium">Search ID:</span> {currentSearchId}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trend Analysis & Competitor Insights */}
            {(includeTrendAnalysis || includeCompetitorAnalysis) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Search Trend Insights */}
                {includeTrendAnalysis && (
                  <Card className="border-0 shadow-none bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-primary">Search Trends</h3>
                          <p className="text-sm text-secondary">Market insights for {businessTypeName}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-secondary">Monthly Search Volume</span>
                          <span className="font-medium text-primary">12,500</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-secondary">Trend Direction</span>
                          <Badge className="bg-green-100 text-green-800">Increasing</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-secondary">Competition Level</span>
                          <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="text-xs text-secondary">
                            <strong>Seasonality:</strong> Higher demand in Q4 (holiday season)
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Competitor Analysis */}
                {includeCompetitorAnalysis && (
                  <Card className="border-0 shadow-none bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                          <Users className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-primary">Market Analysis</h3>
                          <p className="text-sm text-secondary">Competitive landscape overview</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-secondary">Total Competitors</span>
                          <span className="font-medium text-primary">47</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-secondary">Market Saturation</span>
                          <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="text-xs text-secondary mb-2">
                            <strong>Top Competitors:</strong>
                          </p>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-secondary">1. Sweet Treats Bakery</span>
                              <span className="text-primary">2.5K/month</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-secondary">2. Corner Bakehouse</span>
                              <span className="text-red-600">No website</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-secondary">3. Artisan Bread Co</span>
                              <span className="text-primary">1.8K/month</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Results Grid */}
            <div className="space-y-6">
              {searchResults.map((lead) => {
                const leadTypeInfo = getLeadTypeInfo(lead.leadType)
                return (
                  <Card
                    key={lead.id}
                    className="border-0 shadow-none bg-card hover:shadow-sm transition-all duration-200"
                  >
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-6">
                            <div>
                              <h3 className="text-2xl font-normal text-primary mb-2">{lead.businessName}</h3>
                              <p className="text-secondary font-normal mb-3">{lead.category}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className={`${leadTypeInfo.color} px-3 py-1 font-normal rounded-none`}>
                                {leadTypeInfo.label}
                              </Badge>
                              <div className="flex items-center gap-2 bg-yellow-100 px-3 py-2 rounded-none">
                                <Star className="h-4 w-4 text-yellow-600" />
                                <span className="font-medium text-primary">{lead.leadScore}</span>
                              </div>
                              <div className="flex items-center gap-2 bg-blue-100 px-3 py-2 rounded-none">
                                {getSourceIcon(lead.source)}
                                <span className="text-xs font-medium text-blue-800">{getSourceLabel(lead.source)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-3">
                              {lead.phone && (
                                <div className="flex items-center gap-3">
                                  <Phone className="h-4 w-4 text-secondary" />
                                  <span className="text-primary font-normal">{lead.phone}</span>
                                </div>
                              )}
                              {lead.email && (
                                <div className="flex items-center gap-3">
                                  <Mail className="h-4 w-4 text-secondary" />
                                  <span className="text-primary font-normal">{lead.email}</span>
                                </div>
                              )}
                              {lead.website && (
                                <div className="flex items-center gap-3">
                                  <Globe className="h-4 w-4 text-secondary" />
                                  <a
                                    href={lead.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline font-normal"
                                  >
                                    {lead.website}
                                  </a>
                                </div>
                              )}
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 text-secondary mt-0.5" />
                                <span className="text-primary font-normal">{lead.address}</span>
                              </div>
                              {lead.lighthouseScore && (
                                <div>
                                  <span className="text-secondary font-normal">Lighthouse Score: </span>
                                  <span
                                    className={`font-medium ${
                                      lead.lighthouseScore >= 80
                                        ? "text-green-600"
                                        : lead.lighthouseScore >= 40
                                          ? "text-yellow-600"
                                          : "text-red-600"
                                    }`}
                                  >
                                    {lead.lighthouseScore}/100
                                  </span>
                                </div>
                              )}
                              {lead.localSEOScore && (
                                <div>
                                  <span className="text-secondary font-normal">Local SEO Score: </span>
                                  <span
                                    className={`font-medium ${
                                      lead.localSEOScore.overallScore >= 70
                                        ? "text-green-600"
                                        : lead.localSEOScore.overallScore >= 40
                                          ? "text-yellow-600"
                                          : "text-red-600"
                                    }`}
                                  >
                                    {lead.localSEOScore.overallScore}/100
                                  </span>
                                </div>
                              )}
                              {lead.googleSearchRanking && (
                                <div>
                                  <span className="text-secondary font-normal">Search Ranking: </span>
                                  <span className="font-medium text-primary">#{lead.googleSearchRanking}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Search Snippet */}
                          {lead.searchSnippet && (
                            <div className="mb-4 p-4 bg-blue-50 rounded-xl">
                              <h4 className="font-medium text-primary text-sm mb-1">Google Search Result:</h4>
                              <div className="text-sm">
                                <div className="text-blue-600 font-medium mb-1">{lead.searchSnippet.title}</div>
                                <div className="text-secondary mb-1">{lead.searchSnippet.description}</div>
                                <div className="text-green-600 text-xs">{lead.searchSnippet.displayUrl}</div>
                              </div>
                            </div>
                          )}

                          <p className="text-secondary font-normal">{leadTypeInfo.description}</p>
                        </div>

                        <div className="flex flex-col gap-3 lg:ml-6">
                          <Link href={`/lead/${lead.id}`}>
                            <Button className="w-full bg-card border border-black text-primary hover:bg-gray-50 font-normal rounded-none">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Button>
                          </Link>
                          <Button className="w-full bg-black hover:bg-gray-800 text-white font-normal rounded-none">
                            Export to Zoho
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {searchResults.length === 0 && (
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="text-center py-16">
                  <p className="text-secondary text-xl font-normal mb-2">No leads found matching your criteria.</p>
                  <p className="text-secondary font-normal">Try adjusting your search parameters.</p>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}
