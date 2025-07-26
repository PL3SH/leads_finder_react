"use client"

import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { Input } from "@/components/ui/Input"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import {
  Eye,
  Globe,
  Star,
  Check,
  X,
  Filter,
  Download,
  Users,
  Database,
  LayoutGrid,
  List,
  Phone,
  Mail,
  MapPin,
  Building2,
} from "lucide-react"
import { leadTypes } from "@/lib/data"
import { getAllLeads } from "@/services/get_leads"
import { getBusinessCategories } from "@/services/business_categories"
import { getLocations } from "@/services/locations"

const LeadsPage = () => {
  const [leads, setLeads] = useState([]) // Keep for possible future use
  const [filteredLeads, setFilteredLeads] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterByType, setFilterByType] = useState("all")
  const [selectedBusinessCategories, setSelectedBusinessCategories] = useState(["all"])
  const [filterByLocation, setFilterByLocation] = useState("all")
  const [filterByZoho, setFilterByZoho] = useState("all")
  const [sortBy, setSortBy] = useState("dateAdded")
  const [sortOrder, setSortOrder] = useState("desc")
  const [viewMode, setViewMode] = useState("table")
  const [businessCategories, setBusinessCategories] = useState([])
  const [locations, setLocations] = useState([])
  const [page, setPage] = useState(1)
  const leadsPerPage = 50

  // Get the display name for business category
  const businessCategoryName = businessCategories.find((bc) => bc.id === selectedBusinessCategories[0])?.name || "All Business Types"

  useEffect(() => {
    getLocations().then(setLocations)
  }, [])

  useEffect(() => {
    getBusinessCategories().then(setBusinessCategories)
  }, [])

  // Helper: Map sort UI to API
  const getApiSortBy = () => {
    if (sortBy === "dateAdded" && sortOrder === "desc") return "created_at_desc"
    if (sortBy === "dateAdded" && sortOrder === "asc") return "created_at_asc"
    if (sortBy === "leadScore" && sortOrder === "desc") return "score_desc"
    if (sortBy === "leadScore" && sortOrder === "asc") return "score_asc"
    if (sortBy === "businessName" && sortOrder === "asc") return "title_asc"
    if (sortBy === "businessName" && sortOrder === "desc") return "title_desc"
    return "created_at_desc"
  }

  // Build API params from UI state
  const buildApiParams = useCallback(() => {
    const params = {
      skip: (page - 1) * leadsPerPage,
      limit: leadsPerPage,
      sort_by: getApiSortBy(),
    }

    if (searchTerm) params.words = searchTerm
    if (filterByType !== "all") params.evaluation_qualitative = filterByType

    // Handle business category filtering
    if (selectedBusinessCategories[0] && selectedBusinessCategories[0] !== "all") {
      params.category_id = selectedBusinessCategories[0]
    }

    // Handle location filtering
    if (filterByLocation && filterByLocation !== "all") {
      // Find the location by name and get its ID
      const location = locations.find(loc => loc.name === filterByLocation)
      if (location) {
        params.location_id = location.id
      }
    }

    if (filterByZoho === "in-zoho") params.in_zoho_crm = true
    if (filterByZoho === "not-in-zoho") params.in_zoho_crm = false

    return params
  }, [page, searchTerm, filterByType, selectedBusinessCategories, filterByLocation, filterByZoho, sortBy, sortOrder, locations])

  // Fetch leads when filters/sort/page change
  useEffect(() => {
    // Call API when any filter changes
    getAllLeads(buildApiParams()).then(setFilteredLeads)
  }, [searchTerm, filterByType, selectedBusinessCategories, filterByLocation, filterByZoho, sortBy, sortOrder, page, buildApiParams])

  // Get unique locations for filters
  const uniqueLocations = locations.map((l) => l.name)

  const getLeadTypeInfo = (leadType) => {
    return leadTypes.find((lt) => lt.id === leadType) || leadTypes[0]
  }

  const handleExportToZoho = (leadId) => {
    setFilteredLeads((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, isInZoho: true } : lead)))
  }

  const exportAllToCSV = () => {
    const headers = [
      "Business Name",
      "Category",
      "Location",
      "Phone",
      "Email",
      "Website",
      "Lead Score",
      "Lead Type",
      "Lighthouse Score",
      "In Zoho",
      "Date Added",
    ]
    const csvContent = [
      headers.join(","),
      ...filteredLeads.map((lead) =>
        [
          `"${lead.businessName}"`,
          `"${lead.category}"`,
          `"${lead.city}, ${lead.state}"`,
          `"${lead.phone || ""}"`,
          `"${lead.email || ""}"`,
          `"${lead.website || ""}"`,
          lead.leadScore,
          `"${getLeadTypeInfo(lead.leadType).label}"`,
          lead.lighthouseScore || "",
          lead.isInZoho ? "Yes" : "No",
          lead.dateAdded,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `all-leads-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setFilterByType("all")
    setSelectedBusinessCategories(["all"])
    setFilterByLocation("all")
    setFilterByZoho("all")
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-main">
      <div className="max-w-10xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-normal text-primary mb-6 leading-tight">All Leads</h1>
              <p className="text-lg text-secondary font-normal leading-relaxed max-w-4xl">
                Manage and organize all your business leads in one centralized location.
              </p>
              <p className="text-lg text-secondary font-normal leading-relaxed max-w-4xl">
                Filter, sort, and export your lead database.
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-normal text-primary">{filteredLeads.length}</div>
                <div className="text-sm text-secondary font-normal">Total Leads</div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
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
        </div>

        {/* Filters */}
        <Card className="mb-12 border-0 shadow-none bg-card">
          <CardContent className="p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full accent-green">
                  <Filter className="h-4 w-4 text-black" />
                </div>
                <h2 className="text-2xl font-normal text-primary">Filter & Search Leads</h2>
              </div>
              <p className="text-secondary font-normal">
                Use the filters below to find specific leads or narrow down your results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-primary font-normal text-sm">
                  <Filter className="h-4 w-4" />
                  Search leads
                </Label>
                <Input
                  placeholder="Search by name, category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="h-12 bg-card border-gray-300 font-normal text-primary"
                />
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-primary font-normal text-sm">
                  <Star className="h-4 w-4" />
                  Lead Type
                </Label>
                <Select value={filterByType} onValueChange={setFilterByType}>
                  <SelectTrigger className="h-12 bg-card border-gray-300 font-normal text-primary">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="all">All Types</SelectItem>
                    {leadTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-primary font-normal text-sm">
                  <Building2 className="h-4 w-4" />
                  Business Type
                </Label>
                <Select value={selectedBusinessCategories[0] || "all"} onValueChange={(value) => setSelectedBusinessCategories([value])}>
                  <SelectTrigger className="h-12 bg-card border-gray-300 font-normal text-primary">
                    <SelectValue placeholder={businessCategoryName} />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="all">All Business Types</SelectItem>
                    {businessCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-primary font-normal text-sm">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Select value={filterByLocation} onValueChange={setFilterByLocation}>
                  <SelectTrigger className="h-12 bg-card border-gray-300 font-normal text-primary">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="all">All Locations</SelectItem>
                    {uniqueLocations.map((location, index) => (
                      <SelectItem key={`${location}-${index}`} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-primary font-normal text-sm">
                  <Database className="h-4 w-4" />
                    Zoho Status
                </Label>
                <Select value={filterByZoho} onValueChange={setFilterByZoho}>
                  <SelectTrigger className="h-12 bg-card border-gray-300 font-normal text-primary">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="in-zoho">In Zoho</SelectItem>
                    <SelectItem value="not-in-zoho">Not in Zoho</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-primary font-normal text-sm">
                  <Eye className="h-4 w-4" />
                  Sort by
                </Label>
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
                    <SelectItem value="dateAdded-desc">Newest First</SelectItem>
                    <SelectItem value="dateAdded-asc">Oldest First</SelectItem>
                    <SelectItem value="leadScore-desc">Highest Score</SelectItem>
                    <SelectItem value="leadScore-asc">Lowest Score</SelectItem>
                    <SelectItem value="businessName-asc">Name A-Z</SelectItem>
                    <SelectItem value="businessName-desc">Name Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={clearAllFilters}
                className="bg-card border border-gray-300 text-primary hover:bg-gray-50 font-normal rounded-none"
              >
                Clear Filters
              </Button>
              <Button
                onClick={exportAllToCSV}
                className="bg-black hover:bg-gray-800 text-white font-normal rounded-none"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pagination Controls */}
        <div className="flex justify-end items-center gap-4 mb-6">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="bg-card border border-gray-300 text-primary hover:bg-gray-50 font-normal rounded-none"
          >
            Previous
          </Button>
          <span className="text-primary font-normal">Page {page}</span>
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={filteredLeads.length < leadsPerPage}
            className="bg-card border border-gray-300 text-primary hover:bg-gray-50 font-normal rounded-none"
          >
            Next
          </Button>
        </div>

        {/* Leads Display */}
        {viewMode === "table" ? (
          <Card className="border-0 shadow-none bg-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-gray-200">
                      <TableHead className="font-medium text-primary p-6">Business Name</TableHead>
                      <TableHead className="font-medium text-primary p-6">Type</TableHead>
                      <TableHead className="font-medium text-primary p-6">Location</TableHead>
                      <TableHead className="font-medium text-primary p-6">Rating</TableHead>
                      <TableHead className="font-medium text-primary p-6">Website</TableHead>
                      <TableHead className="font-medium text-primary p-6">Zoho Status</TableHead>
                      <TableHead className="font-medium text-primary p-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => {
                      const leadTypeInfo = getLeadTypeInfo(lead.leadType)
                      return (
                        <TableRow key={lead.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <TableCell className="p-6">
                            <div>
                              <div className="font-medium text-primary mb-1">{lead.businessName}</div>
                              <div className="text-sm text-secondary font-normal">{lead.category}</div>
                            </div>
                          </TableCell>
                          <TableCell className="p-6">
                            <Badge className={`${leadTypeInfo.color} px-3 py-1 font-normal rounded-none`}>
                              {leadTypeInfo.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="p-6">
                            <div className="text-primary font-normal">{lead.city}</div>
                            <div className="text-sm text-secondary font-normal">{lead.state}</div>
                          </TableCell>
                          <TableCell className="p-6">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-600 fill-current" />
                              <span className="font-medium text-primary">{lead.leadScore || "NA"}</span>
                            </div>
                          </TableCell>
                          <TableCell className="p-6">
                            {lead.website != "no website found" ? (
                              <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-secondary" />
                                <a
                                  href={lead.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline text-sm font-bold">
                                  View Site
                                </a>
                              </div>
                            ) : (
                              <span className="text-secondary text-sm font-normal">No website</span>
                            )}
                          </TableCell>
                          <TableCell className="p-6">
                            <div className="flex items-center">
                              {lead.isInZoho ? (
                                <>
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                                    <Check className="h-3 w-3 text-green-600" />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100">
                                    <X className="h-3 w-3 text-gray-600" />
                                  </div>
                                </>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="p-6">
                            <div className="flex gap-2">
                              <Link to={`/lead/${lead.id}`}>
                                <Button className="bg-card border border-black text-primary hover:bg-gray-50 font-normal rounded-none text-sm px-3 py-2">
                                  <Eye className="mr-1 h-3 w-3" />
                                  Details
                                </Button>
                              </Link>
                              {!lead.isInZoho && (
                                <Button
                                  onClick={() => handleExportToZoho(lead.id)}
                                  className="bg-green-100 hover:bg-green-200 text-green-800 font-normal rounded-none text-sm px-3 py-2"
                                >
                                  Add to Zoho
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>

              {filteredLeads.length === 0 && (
                <div className="text-center py-16">
                  <Users className="mx-auto h-16 w-16 text-secondary mb-6" />
                  <h3 className="text-2xl font-normal text-primary mb-4">No leads found</h3>
                  <p className="text-secondary font-normal mb-6 text-lg">
                    No leads match your current filter criteria.
                  </p>
                  <Button
                    onClick={clearAllFilters}
                    className="bg-green-100 hover:bg-green-200 text-green-800 font-normal rounded-none"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          /* Cards View */
          <div className="space-y-6">
            {filteredLeads.map((lead) => {
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
                              <span className="font-medium text-primary">{lead.leadScore || "NA"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {lead.isInZoho ? (
                                <div className="flex items-center gap-1 bg-green-100 px-3 py-2 rounded-none">
                                  <Check className="h-4 w-4 text-green-600" />
                                  <span className="text-green-800 text-sm font-medium">In Zoho</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1 bg-gray-100 px-3 py-2 rounded-none">
                                  <X className="h-4 w-4 text-gray-600" />
                                  <span className="text-gray-800 text-sm font-medium">Not in Zoho</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-3">
                            {lead.phones && (
                              <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-secondary" />
                                <span className="text-primary font-normal">{lead.phones[0]}</span>
                              </div>
                            )}
                            {lead.emails && (
                              <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-secondary" />
                                <span className="text-primary font-normal">
                                  {lead.emails[0]  || "No email found"}
                                </span>
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
                            {lead.leadScore && (
                              <div>
                                <span className="text-secondary font-normal">Lighthouse Score: </span>
                                <span
                                  className={`font-medium ${
                                    lead.leadScore >= 80
                                      ? "text-green-600"
                                      : lead.leadScore >= 40
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                  }`}
                                >
                                  {lead.leadScore}/100
                                </span>
                              </div>
                            )}
                            <div>
                              <span className="text-secondary font-normal">Date Added: </span>
                              <span className="text-primary font-normal">
                                {new Date(Date.now()).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-secondary font-normal">{lead.source}</p>
                      </div>

                      <div className="flex flex-col gap-3 lg:ml-6">
                        <Link to={`/lead/${lead.id}`}>
                          <Button className="w-full bg-card border border-black text-primary hover:bg-gray-50 font-normal rounded-none">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </Link>
                        {!lead.isInZoho ? (
                          <Button
                            onClick={() => handleExportToZoho(lead.id)}
                            className="w-full bg-green-100 hover:bg-green-200 text-green-800 font-normal rounded-none"
                          >
                            Add to Zoho
                          </Button>
                        ) : (
                          <Button
                            disabled
                            className="w-full bg-gray-100 text-gray-500 font-normal rounded-none cursor-not-allowed"
                          >
                            <Check className="mr-2 h-4 w-4" />
                            In Zoho
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

            {filteredLeads.length === 0 && (
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="text-center py-16">
                  <Users className="mx-auto h-16 w-16 text-secondary mb-6" />
                  <h3 className="text-2xl font-normal text-primary mb-4">No leads found</h3>
                  <p className="text-secondary font-normal mb-6 text-lg">
                    No leads match your current filter criteria.
                  </p>
                  <Button
                    onClick={clearAllFilters}
                    className="bg-green-100 hover:bg-green-200 text-green-800 font-normal rounded-none"
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default LeadsPage
