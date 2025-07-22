"use client"

import { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Phone, Mail, Globe, MapPin, Star, Download, Eye, Filter, Search, LayoutGrid, List } from "lucide-react"
import { mockLeads, leadTypes, businessTypes, cities } from "@/lib/data"
import { searchStorage } from "@/lib/storage"

const ResultsPage = () => {
  const [searchParams] = useSearchParams()
  const [leads, setLeads] = useState(mockLeads)
  const [filteredLeads, setFilteredLeads] = useState(mockLeads)
  const [sortBy, setSortBy] = useState("leadScore")
  const [sortOrder, setSortOrder] = useState("desc")
  const [filterByType, setFilterByType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("cards")

  const searchId = searchParams.get("searchId")

  useEffect(() => {
    // If we have a searchId, load the search from storage
    if (searchId) {
      const savedSearch = searchStorage.getSearchById(searchId)
      if (savedSearch) {
        setLeads(savedSearch.leads)
        setFilteredLeads(savedSearch.leads)
      }
    }
  }, [searchId])

  const businessType = searchParams.get("businessType") || ""
  const locations = searchParams.get("locations")?.split(",") || []
  const numberOfBusinesses = Number.parseInt(searchParams.get("numberOfBusinesses") || "50")

  // If we have a searchId, get data from saved search
  const savedSearch = searchId ? searchStorage.getSearchById(searchId) : null
  const actualBusinessType = savedSearch?.searchParams.businessType || businessType
  const actualLocations = savedSearch?.searchParams.locations || locations
  const actualNumberOfBusinesses = savedSearch?.searchParams.numberOfBusinesses || numberOfBusinesses

  const businessTypeName = businessTypes.find((bt) => bt.id === actualBusinessType)?.name || actualBusinessType
  const locationNames = actualLocations.map((id) => cities.find((c) => c.id === id)?.name).filter(Boolean)

  const uniqueCategories = Array.from(new Set(leads.map((lead) => lead.category)))

  useEffect(() => {
    let filtered = leads

    // Filter by lead type
    if (filterByType !== "all") {
      filtered = filtered.filter((lead) => lead.leadType === filterByType)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (lead) =>
          lead.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.address.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "leadScore":
          aValue = a.leadScore
          bValue = b.leadScore
          break
        case "businessName":
          aValue = a.businessName.toLowerCase()
          bValue = b.businessName.toLowerCase()
          break
        case "leadType":
          aValue = a.leadType
          bValue = b.leadType
          break
        default:
          aValue = a.leadScore
          bValue = b.leadScore
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredLeads(filtered)
  }, [leads, sortBy, sortOrder, filterByType, searchTerm])

  const getLeadTypeInfo = (leadType) => {
    return leadTypes.find((lt) => lt.id === leadType) || leadTypes[0]
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
    ]
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map((lead) =>
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

  const clearAllFilters = () => {
    setSearchTerm("")
    setFilterByType("all")
  }

  return (
    <div className="min-h-screen bg-main">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div>
            <h1 className="text-5xl font-normal text-primary mb-6 leading-tight">Leads Results</h1>
            <p className="text-secondary font-normal">
              Here are the leads we found for <span className="font-medium text-primary">{businessTypeName}</span> in{" "}
              <span className="font-medium text-primary">{locationNames.join(", ")}</span>. We've gathered{" "}
              <span className="font-medium text-primary">{actualNumberOfBusinesses}</span> businesses for you.
            </p>
          </div>
        </div>

        {/* Controls */}
        <Card className="mb-12 border-0 shadow-none bg-card">
          <CardContent className="p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full accent-green">
                  <Filter className="h-4 w-4 text-black" />
                </div>
                <h2 className="text-2xl font-normal text-primary">Filter & Sort Results</h2>
              </div>
              <p className="text-secondary font-normal">
                Refine your results to find the most relevant leads for your business
              </p>
            </div>

            {/* Filter Controls */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-normal text-primary">Search leads</label>
                  <Input
                    placeholder="Search by name, category, or address..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 bg-card border-gray-300 font-normal text-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-normal text-primary">Lead Type</label>
                  <Select value={filterByType} onValueChange={setFilterByType}>
                    <SelectTrigger className="h-12 bg-card border-gray-300 font-normal text-primary">
                      <SelectValue placeholder="All Lead Types" />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      <SelectItem value="all">All Lead Types</SelectItem>
                      {leadTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-normal text-primary">Sort by</label>
                  <Select
                    value={`${sortBy}-${sortOrder}`}
                    onValueChange={(value) => {
                      const [field, order] = value.split("-")
                      setSortBy(field)
                      setSortOrder(order)
                    }}
                  >
                    <SelectTrigger className="h-12 bg-card border-gray-300 font-normal text-primary">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-card">
                      <SelectItem value="leadScore-desc">Lead Score (High to Low)</SelectItem>
                      <SelectItem value="leadScore-asc">Lead Score (Low to High)</SelectItem>
                      <SelectItem value="businessName-asc">Business Name (A-Z)</SelectItem>
                      <SelectItem value="businessName-desc">Business Name (Z-A)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  className="bg-card border-gray-300 text-primary hover:bg-gray-50 font-normal rounded-none"
                >
                  Clear All Filters
                </Button>
                <Button
                  onClick={exportToCSV}
                  className="bg-black hover:bg-gray-800 text-white font-normal rounded-none"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>

                {/* View Toggle */}
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1 ml-auto">
                  <Button
                    onClick={() => setViewMode("table")}
                    variant="ghost"
                    size="sm"
                    className={`px-3 py-2 rounded-md transition-all ${
                      viewMode === "table" ? "bg-white shadow-sm text-primary" : "text-secondary hover:text-primary"
                    }`}
                  >
                    <List className="h-4 w-4 mr-2" />
                    Table
                  </Button>
                  <Button
                    onClick={() => setViewMode("cards")}
                    variant="ghost"
                    size="sm"
                    className={`px-3 py-2 rounded-md transition-all ${
                      viewMode === "cards" ? "bg-white shadow-sm text-primary" : "text-secondary hover:text-primary"
                    }`}
                  >
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    Cards
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <Card className="mb-8 border-0 shadow-none bg-card">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-8 text-sm font-normal">
              <div className="text-primary">
                <span className="font-medium">Business Type:</span> {businessTypeName}
              </div>
              <div className="text-primary">
                <span className="font-medium">Locations:</span> {locationNames.join(", ")}
              </div>
              <div className="text-primary">
                <span className="font-medium">Requested:</span> {actualNumberOfBusinesses} businesses
              </div>
              <div className="text-primary">
                <span className="font-medium">Showing:</span> {filteredLeads.length} leads
              </div>
              {searchId && (
                <div className="text-primary">
                  <span className="font-medium">Search ID:</span> {searchId.split("_")[1]}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Display */}
        <div className="space-y-6">
          {filteredLeads.map((lead) => {
            const leadTypeInfo = getLeadTypeInfo(lead.leadType)
            return (
              <Card key={lead.id} className="border-0 shadow-none bg-card hover:shadow-sm transition-all duration-200">
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
                        </div>
                      </div>

                      <p className="text-secondary font-normal">{leadTypeInfo.description}</p>
                    </div>

                    <div className="flex flex-col gap-3 lg:ml-6">
                      <Link to={`/lead/${lead.id}`}>
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

          {filteredLeads.length === 0 && (
            <Card className="border-0 shadow-none bg-card">
              <CardContent className="text-center py-16">
                <Search className="mx-auto h-16 w-16 text-secondary mb-6" />
                <h3 className="text-2xl font-normal text-primary mb-4">No leads found</h3>
                <p className="text-secondary font-normal mb-6 text-lg">No leads match your current search criteria.</p>
                <p className="text-secondary font-normal">Try adjusting your filters or search terms.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
