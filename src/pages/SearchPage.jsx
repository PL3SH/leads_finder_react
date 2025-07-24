"use client"
import api from "@/services/api"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Checkbox } from "@/components/ui/Checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Card, CardContent } from "@/components/ui/Card"
import { Search, MapPin, Building2, Hash, Target } from "lucide-react"
import { getBusinessCategories } from "@/services/business_categories"
import { getCities } from "@/services/cities"
import { searchStorage } from "@/lib/storage"
import { set } from "date-fns/set"

const SearchPage = () => {
  const navigate = useNavigate()
  const [selectedBusinessCategories, setSelectedBusinessCategories] = useState([])
  const [selectedCities, setSelectedCities] = useState([])
  const [numberOfBusinesses, setNumberOfBusinesses] = useState(50)
  const [includeGoogleSearch, setIncludeGoogleSearch] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [customSearchQuery, setCustomSearchQuery] = useState("")

  const [cities, setCities] = useState([])
  const [businessCategories, setBusinessCategories] = useState([])

  useEffect(() => {
    getCities().then(setCities)
  }, [])

  useEffect(() => {
    getBusinessCategories().then(setBusinessCategories)
  }, [])
  const businessCategoryName = businessCategories.find((bc) => bc.id === selectedBusinessCategories[0])?.name || "Select business type"
  const selectedCityName = cities.find(city => city.location_id === selectedCities[0])?.formatted_name || "Select location";

  const handleSearch = async () => {

    setIsSearching(true)

    // Create search parameters
    const searchParams = {
      location_id: selectedCities[0],
      max_results: numberOfBusinesses,
      query: customSearchQuery.trim(),
      search_google: includeGoogleSearch,
      search_local: false,
      search_maps: true,
    }
    const response = await api.post("/search/execute", searchParams)
    
    console.log('Response:  ' , response)
    setTimeout(() => {
      setIsSearching(false)
    }, 3000)
    return

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
                  <Select value={selectedBusinessCategories[0] || ""} onValueChange={(value) => setSelectedBusinessCategories([value])}>
                    <SelectTrigger className="h-12 bg-card border-gray-300 font-normal text-primary">
                      <SelectValue placeholder={businessCategoryName} />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {businessCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
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
                      <SelectValue placeholder={selectedCityName}/>
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      {cities.map((city) => (
                        <SelectItem key={city.location_id} value={city.location_id}>
                          {city.formatted_name}
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
                  disabled={!selectedBusinessCategories[0] || !selectedCities[0] || isSearching}
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
