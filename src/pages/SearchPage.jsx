"use client"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Card, CardContent } from "@/components/ui/Card"
import { Search, MapPin, Building2, Hash, Target } from "lucide-react"
import { businessTypes, cities } from "@/lib/data"
import { searchStorage } from "@/lib/storage"

const SearchPage = () => {
  const navigate = useNavigate()
  const [selectedBusinessType, setSelectedBusinessType] = useState("")
  const [selectedCities, setSelectedCities] = useState([])
  const [numberOfBusinesses, setNumberOfBusinesses] = useState(50)
  const [includeGoogleSearch, setIncludeGoogleSearch] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [customSearchQuery, setCustomSearchQuery] = useState("")

  const handleSearch = async () => {
    if (!selectedBusinessType || selectedCities.length === 0) {
      
    }

    setIsSearching(true)

    // Create search parameters
    const searchParams = {
      businessType: selectedBusinessType,
      locations: selectedCities,
      numberOfBusinesses,
      includeGoogleSearch,
      customSearchQuery: customSearchQuery.trim() || undefined,
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate mock results
    const businessTypeName = businessTypes.find((bt) => bt.id === selectedBusinessType)?.name || selectedBusinessType
    const selectedCityName = cities.find((city) => city.id === selectedCities[0])?.name || "Atlanta"
    const selectedState = cities.find((city) => city.id === selectedCities[0])?.state || "GA"

    const results = generateLeadsForBusinessType(
      selectedBusinessType,
      selectedCityName,
      selectedState,
      numberOfBusinesses,
    )

    // Save the search result to storage
    const savedSearch = searchStorage.saveSearchResult(searchParams, results)

    setIsSearching(false)

    // Navigate to results page with the search ID
    const params = new URLSearchParams({
      searchId: savedSearch.id,
      businessType: selectedBusinessType,
      locations: selectedCities.join(","),
      numberOfBusinesses: numberOfBusinesses.toString(),
    })
    navigate(`/results?${params.toString()}`)
  }

  const generateLeadsForBusinessType = (businessType, cityName, state, count = 8) => {
    // Mock lead generation logic
    const baseLeads = [
      {
        id: "1",
        businessName: `${cityName} ${businessTypes.find((bt) => bt.id === businessType)?.name || "Business"}`,
        category: businessTypes.find((bt) => bt.id === businessType)?.name || "Business",
        phone: "(555) 123-4567",
        email: "info@business.com",
        address: `123 Main St, ${cityName}, ${state} 30309`,
        leadScore: 95,
        leadType: "excellent",
        source: "google-maps",
        googleMapsListing: true,
      },
      {
        id: "2",
        businessName: `Premium ${businessTypes.find((bt) => bt.id === businessType)?.name || "Business"}`,
        category: businessTypes.find((bt) => bt.id === businessType)?.name || "Business",
        website: "https://premium-business.com",
        phone: "(555) 987-6543",
        address: `456 Oak Ave, ${cityName}, ${state} 30308`,
        lighthouseScore: 35,
        leadScore: 82,
        leadType: "good",
        source: "both",
        googleMapsListing: true,
        googleSearchRanking: 3,
      },
    ]

    return baseLeads.slice(0, Math.min(count, numberOfBusinesses))
  }

  const selectedCityNames = selectedCities.map((id) => cities.find((city) => city.id === id)?.name).filter(Boolean)
  const businessTypeName = businessTypes.find((bt) => bt.id === selectedBusinessType)?.name || selectedBusinessType

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
                        <SelectItem key={type.id} value={type.id}>
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
                        <SelectItem key={city.id} value={city.id}>
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
                      />
                      <Label htmlFor="includeGoogleSearch" className="text-primary font-normal text-sm cursor-pointer">
                        Include Google Search results - Also crawl businesses that may not be under the business type
                        according to Google Maps, but are present in Google Search results
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search Button */}
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
      </div>
    </div>
  )
}

export default SearchPage
