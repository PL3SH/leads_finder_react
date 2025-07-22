"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building2, Users, Download, RefreshCw, Eye, Trash2, History } from "lucide-react"
import { getSearchHistory, deleteSearchById } from "@/lib/search-storage"
import { businessTypes, cities } from "@/lib/data"
import type { SearchResult } from "@/lib/types"

export default function HistoryPage() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])

  useEffect(() => {
    // Load search history from storage
    setSearchResults(getSearchHistory())
  }, [])

  const getBusinessTypeName = (id: string) => {
    return businessTypes.find((bt) => bt.id === id)?.name || id
  }

  const getLocationNames = (locationIds: string[]) => {
    return locationIds.map((id) => cities.find((c) => c.id === id)?.name).filter(Boolean)
  }

  const handleDuplicateSearch = (searchId: string) => {
    const search = searchResults.find((s) => s.id === searchId)
    if (search) {
      const params = new URLSearchParams({
        searchId: searchId,
        businessType: search.searchParams.businessType,
        locations: search.searchParams.locations.join(","),
        numberOfBusinesses: search.searchParams.numberOfBusinesses.toString(),
      })
      window.location.href = `/results?${params.toString()}`
    }
  }

  const handleExportSearch = (searchId: string) => {
    const search = searchResults.find((s) => s.id === searchId)
    if (search) {
      const headers = ["Business Name", "Category", "Phone", "Email", "Website", "Address", "Lead Score", "Lead Type"]
      const csvContent = [
        headers.join(","),
        ...search.leads.map((lead) =>
          [
            `"${lead.businessName}"`,
            `"${lead.category}"`,
            `"${lead.phone || ""}"`,
            `"${lead.email || ""}"`,
            `"${lead.website || ""}"`,
            `"${lead.address}"`,
            lead.leadScore,
            `"${lead.leadType}"`,
          ].join(","),
        ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `search-${searchId}-${search.date.split("T")[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  const handleDeleteSearch = (searchId: string) => {
    if (deleteSearchById(searchId)) {
      setSearchResults(getSearchHistory())
    }
  }

  return (
    <div className="min-h-screen bg-main">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-normal text-primary mb-6 leading-tight">Search History</h1>
          <p className="text-lg text-secondary font-normal leading-relaxed max-w-4xl">
            View and manage your previous lead searches. Re-run searches or export results to continue your lead
            generation workflow.
          </p>
        </div>

        {searchResults.length === 0 ? (
          <Card className="border-0 shadow-none bg-card">
            <CardContent className="text-center py-16">
              <History className="mx-auto h-16 w-16 text-secondary mb-6" />
              <h3 className="text-2xl font-normal text-primary mb-4">No search history</h3>
              <p className="text-secondary font-normal mb-6 text-lg">
                You haven't performed any searches yet. Start your first search to begin building your lead database.
              </p>
              <Link href="/">
                <Button className="bg-black hover:bg-gray-800 text-white font-normal rounded-none px-8 py-3">
                  Start Your First Search
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {searchResults.map((search) => {
              const businessTypeName = getBusinessTypeName(search.searchParams.businessType)
              const locationNames = getLocationNames(search.searchParams.locations)

              return (
                <Card
                  key={search.id}
                  className="border-0 shadow-none bg-card hover:shadow-sm transition-all duration-200"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <Building2 className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-normal text-primary">{businessTypeName} Search</h3>
                            <p className="text-secondary font-normal">
                              {new Date(search.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-secondary" />
                            <div>
                              <p className="text-sm text-secondary font-normal">Locations</p>
                              <p className="text-primary font-normal">{locationNames.join(", ")}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Users className="h-4 w-4 text-secondary" />
                            <div>
                              <p className="text-sm text-secondary font-normal">Leads Found</p>
                              <p className="text-primary font-normal">{search.totalLeads} businesses</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Building2 className="h-4 w-4 text-secondary" />
                            <div>
                              <p className="text-sm text-secondary font-normal">Requested</p>
                              <p className="text-primary font-normal">
                                {search.searchParams.numberOfBusinesses} businesses
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Search Parameters */}
                        <div className="pt-6 border-t border-gray-200">
                          <h4 className="font-medium text-primary mb-3">Search Parameters:</h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-blue-100 text-blue-800 px-3 py-1 font-normal rounded-none">
                              {search.searchParams.includeGoogleSearch ? "Google Search: Yes" : "Google Search: No"}
                            </Badge>
                            {search.searchParams.customSearchQuery && (
                              <Badge className="bg-purple-100 text-purple-800 px-3 py-1 font-normal rounded-none">
                                Custom Query: {search.searchParams.customSearchQuery}
                              </Badge>
                            )}
                            {search.searchParams.includeCompetitorAnalysis && (
                              <Badge className="bg-green-100 text-green-800 px-3 py-1 font-normal rounded-none">
                                Competitor Analysis
                              </Badge>
                            )}
                            {search.searchParams.includeTrendAnalysis && (
                              <Badge className="bg-yellow-100 text-yellow-800 px-3 py-1 font-normal rounded-none">
                                Trend Analysis
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Lead Type Summary */}
                        {search.leads.length > 0 && (
                          <div className="pt-4 border-t border-gray-200">
                            <h4 className="font-medium text-primary mb-3">Lead Type Breakdown:</h4>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(
                                search.leads.reduce(
                                  (acc, lead) => {
                                    acc[lead.leadType] = (acc[lead.leadType] || 0) + 1
                                    return acc
                                  },
                                  {} as Record<string, number>,
                                ),
                              ).map(([type, count]) => (
                                <Badge
                                  key={type}
                                  className="bg-gray-100 text-gray-800 px-3 py-1 font-normal rounded-none"
                                >
                                  {type}: {count}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <Badge className="bg-yellow-100 text-yellow-800 px-3 py-1 font-normal rounded-none">
                          ID: {search.id.split("_")[1]}
                        </Badge>
                        <Badge className="bg-gray-100 text-gray-800 px-3 py-1 font-normal rounded-none">
                          {search.searchParams.numberOfBusinesses} requested
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/results?searchId=${search.id}&businessType=${search.searchParams.businessType}&locations=${search.searchParams.locations.join(",")}&numberOfBusinesses=${search.searchParams.numberOfBusinesses}`}
                      >
                        <Button className="bg-card border border-black text-primary hover:bg-gray-50 font-normal rounded-none">
                          <Eye className="mr-2 h-4 w-4" />
                          View Results
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDuplicateSearch(search.id)}
                        className="bg-green-100 hover:bg-green-200 text-green-800 font-normal rounded-none"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Re-run Search
                      </Button>
                      <Button
                        onClick={() => handleExportSearch(search.id)}
                        className="bg-black hover:bg-gray-800 text-white font-normal rounded-none"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export CSV
                      </Button>
                      <Button
                        onClick={() => handleDeleteSearch(search.id)}
                        className="bg-card border border-gray-300 text-secondary hover:bg-red-50 hover:text-red-600 hover:border-red-200 font-normal rounded-none"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
