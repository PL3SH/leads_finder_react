"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { MapPin, Building2, Users, Download, RefreshCw, Eye, Trash2, History, Check, X, Search, Clock, Play, Filter, ChevronLeft, ChevronRight } from "lucide-react"
import { getSearchHistory } from "@/services/search_history"
import { getBusinessCategories } from "@/services/business_categories"
import { getLocations } from "@/services/locations"
import api from "@/services/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"

const HistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([])
  const [filteredHistory, setFilteredHistory] = useState([])
  const [businessCategories, setBusinessCategories] = useState([])
  const [locations, setLocations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filter states
  const [queryFilter, setQueryFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [isReRunning, setIsReRunning] = useState(false)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isLoadingPage, setIsLoadingPage] = useState(false)

  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const loadHistoryData = async (page = 1, limit = itemsPerPage) => {
    try {
      setIsLoadingPage(true)
      const skip = (page - 1) * limit
      const historyData = await getSearchHistory(skip, limit)

      setSearchHistory(historyData)
      setFilteredHistory(historyData)
      setTotalItems(historyData.length + (page - 1) * limit) // Estimate total
      setCurrentPage(page)
    } catch (err) {
      console.error('Error loading history:', err)
      setError('Failed to load search history')
    } finally {
      setIsLoadingPage(false)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const [categoriesData, locationsData] = await Promise.all([
          getBusinessCategories(),
          getLocations()
        ])

        setBusinessCategories(categoriesData)
        setLocations(locationsData)

        // Load first page of history
        await loadHistoryData(1, itemsPerPage)
      } catch (err) {
        console.error('Error loading data:', err)
        setError('Failed to load data')
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Filter history based on query and date
  useEffect(() => {
    let filtered = searchHistory

    if (queryFilter) {
      filtered = filtered.filter(search =>
        search.query.toLowerCase().includes(queryFilter.toLowerCase())
      )
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter)
      filtered = filtered.filter(search => {
        const searchDate = new Date(search.created_at)
        return searchDate.toDateString() === filterDate.toDateString()
      })
    }

    setFilteredHistory(filtered)
  }, [searchHistory, queryFilter, dateFilter])

  const getBusinessCategoryName = (categoryId) => {
    const category = businessCategories.find(cat => cat.id === categoryId)
    return category ? category.name : `Category ${categoryId}`
  }

  const getLocationName = (locationId) => {
    const location = locations.find(loc => loc.id === locationId)
    return location ? location.name : `Location ${locationId}`
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'RUNNING': { color: 'bg-blue-100 text-blue-800', icon: Play },
      'COMPLETED': { color: 'bg-green-100 text-green-800', icon: Check },
      'FAILED': { color: 'bg-red-100 text-red-800', icon: X },
      'PENDING': { color: 'bg-yellow-100 text-yellow-800', icon: Clock }
    }

    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', icon: Clock }
    const Icon = config.icon

    return (
      <Badge className={`${config.color} px-3 py-1 font-normal rounded-none flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    )
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleReRunSearch = async (searchParams) => {
    try {
      setIsReRunning(true)

      // Create search parameters like SearchPage
      const searchConfig = {
        location_id: searchParams.location_id,
        max_results: searchParams.max_results,
        query: searchParams.query.trim(),
        search_google: searchParams.search_google,
        search_local: searchParams.search_local,
        search_maps: searchParams.search_maps,
      }

      // Call the same API as SearchPage
      const response = await api.post("/search/execute", searchConfig)
      console.log('Re-run search response:', response)

      // Show success message or redirect
      alert('Search re-executed successfully!')

    } catch (error) {
      console.error('Error re-running search:', error)
      alert('Failed to re-run search. Please try again.')
    } finally {
      setIsReRunning(false)
    }
  }

  const handleExportHistory = () => {
    const headers = [
      "Query",
      "Location",
      "Max Results",
      "Search Google",
      "Search Local",
      "Search Maps",
      "Category",
      "Status",
      "Created At"
    ]

    const csvContent = [
      headers.join(","),
      ...filteredHistory.map((search) =>
        [
          `"${search.query}"`,
          `"${getLocationName(search.location_id)}"`,
          search.max_results,
          search.search_google ? "Yes" : "No",
          search.search_local ? "Yes" : "No",
          search.search_maps ? "Yes" : "No",
          `"${getBusinessCategoryName(search.category_id)}"`,
          `"${search.status}"`,
          `"${formatDate(search.created_at)}"`
        ].join(",")
      )
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `search-history-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const clearFilters = () => {
    setQueryFilter("")
    setDateFilter("")
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      loadHistoryData(newPage, itemsPerPage)
    }
  }

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1)
    loadHistoryData(1, newItemsPerPage)
  }

  // Shows intelligent pagination with ellipsis
  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 3) {
        // Near start: 1, 2, 3, 4, ..., 15
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Near end: 1, ..., 12, 13, 14, 15
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // Middle: 1, ..., 7, 8, 9, ..., 15
        pages.push(1)
        pages.push('...')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-main">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-secondary">Loading search history...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-main">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="text-center">
            <History className="mx-auto h-16 w-16 text-secondary mb-6" />
            <h3 className="text-2xl font-normal text-primary mb-4">Error loading history</h3>
            <p className="text-secondary font-normal mb-6">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-black hover:bg-gray-800 text-white font-normal rounded-none"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-main">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-normal text-primary mb-6 leading-tight">Search History</h1>
              <p className="text-lg text-secondary font-normal leading-relaxed max-w-4xl">
                View and manage your previous lead searches. Re-run searches or export results to continue your lead
                generation workflow.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <History className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-3xl font-normal text-primary">{totalItems}</div>
                  <div className="text-sm text-secondary font-normal">Total Searches</div>
                </div>
              </div>
              <Button
                onClick={handleExportHistory}
                className="bg-black hover:bg-gray-800 text-white font-normal rounded-none"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-0 shadow-none bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full accent-green">
                <Filter className="h-4 w-4 text-black" />
              </div>
              <h2 className="text-xl font-normal text-primary">Filter History</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-normal text-primary">Search by query</label>
                <Input
                  placeholder="Filter by search query..."
                  value={queryFilter}
                  onChange={(e) => setQueryFilter(e.target.value)}
                  className="h-12 bg-card border-gray-300 font-normal text-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-normal text-primary">Filter by date</label>
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-1/2 h-12 bg-card border-gray-300 font-normal text-primary"
                />
              </div>

              <div className="flex items-end">
                <Button
                  onClick={clearFilters}
                  className="bg-card border border-gray-300 text-primary hover:bg-gray-50 font-normal rounded-none h-12 px-6"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Items per page selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-normal text-primary">Items per page:</label>
            <Select value={itemsPerPage.toString()} onValueChange={(value) => handleItemsPerPageChange(Number(value))}>
              <SelectTrigger className="w-20 h-8 bg-card border-gray-300 font-normal text-primary">
                <SelectValue placeholder={itemsPerPage.toString()} />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-secondary font-normal">
            Showing {startItem}-{endItem} of {totalItems} results
          </div>
        </div>

        {filteredHistory.length === 0 ? (
          <Card className="border-0 shadow-none bg-card">
            <CardContent className="text-center py-16">
              <History className="mx-auto h-16 w-16 text-secondary mb-6" />
              <h3 className="text-2xl font-normal text-primary mb-4">
                {searchHistory.length === 0 ? "No search history" : "No results found"}
              </h3>
              <p className="text-secondary font-normal mb-6 text-lg">
                {searchHistory.length === 0
                  ? "You haven't performed any searches yet. Start your first search to begin building your lead database."
                  : "Try adjusting your filters to find what you're looking for."
                }
              </p>
              {searchHistory.length === 0 && (
                <Link to="/">
                  <Button className="bg-black hover:bg-gray-800 text-white font-normal rounded-none px-8 py-3">
                    Start Your First Search
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="border-0 shadow-none bg-card mb-6">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-gray-200">
                        <TableHead className="font-medium text-primary p-6">Query</TableHead>
                        <TableHead className="font-medium text-primary p-6">Location</TableHead>
                        <TableHead className="font-medium text-primary p-6">Category</TableHead>
                        <TableHead className="font-medium text-primary p-6">Max Results</TableHead>
                        <TableHead className="font-medium text-primary p-6">Search Options</TableHead>
                        <TableHead className="font-medium text-primary p-6">Status</TableHead>
                        <TableHead className="font-medium text-primary p-6">Created At</TableHead>
                        <TableHead className="font-medium text-primary p-6">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHistory.map((search, index) => {
                        const isRunning = search.status === "RUNNING"
                        return (
                          <TableRow
                            key={index}
                            className={`border-b border-gray-200 hover:bg-gray-50 transition-all duration-200 ${
                              isRunning ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                            }`}
                          >
                            <TableCell className="p-6">
                              <div className="font-medium text-primary">{search.query}</div>
                            </TableCell>
                            <TableCell className="p-6">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-secondary" />
                                <span className="text-primary font-normal">
                                  {getLocationName(search.location_id)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="p-6">
                              <div className="flex items-center gap-2">
                                <Building2 className="h-4 w-4 text-secondary" />
                                <span className="text-primary font-normal">
                                  {getBusinessCategoryName(search.category_id)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="p-6">
                              <div className="text-primary font-normal">{search.max_results}</div>
                            </TableCell>
                            <TableCell className="p-6">
                              <div className="flex items-center gap-2">
                                {search.search_google ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <X className="h-4 w-4 text-red-600" />
                                )}
                                <span className="text-sm text-secondary">Google</span>

                                {search.search_local ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <X className="h-4 w-4 text-red-600" />
                                )}
                                <span className="text-sm text-secondary">Local</span>

                                {search.search_maps ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <X className="h-4 w-4 text-red-600" />
                                )}
                                <span className="text-sm text-secondary">Maps</span>
                              </div>
                            </TableCell>
                            <TableCell className="p-6">
                              {getStatusBadge(search.status)}
                            </TableCell>
                            <TableCell className="p-6">
                              <div className="text-secondary font-normal text-sm">
                                {formatDate(search.created_at)}
                              </div>
                            </TableCell>
                            <TableCell className="p-6">
                              <div className="flex gap-2">
                                {search.status !== "RUNNING" && (
                                  <Button
                                    onClick={() => handleReRunSearch(search)}
                                    disabled={isReRunning}
                                    className="bg-green-100 hover:bg-green-200 text-green-800 font-normal rounded-none text-sm px-3 py-2 disabled:opacity-50"
                                  >
                                    {isReRunning ? (
                                      <div className="flex items-center">
                                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-green-800 mr-1" />
                                        <span>Running...</span>
                                      </div>
                                    ) : (
                                      <>
                                        <RefreshCw className="mr-1 h-3 w-3" />
                                        Re-run
                                      </>
                                    )}
                                  </Button>
                                )}
                                {search.status === "RUNNING" && (
                                  <Badge className="bg-blue-100 text-blue-800 px-3 py-1 font-normal rounded-none">
                                    In Progress
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <Card className="border-0 shadow-none bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-card border border-gray-300 text-primary hover:bg-gray-50 font-normal rounded-none px-3 py-2 disabled:opacity-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-1">
                        {getPageNumbers().map((page, index) => (
                          <div key={index}>
                            {page === '...' ? (
                              <span className="px-3 py-2 text-secondary">...</span>
                            ) : (
                              <Button
                                onClick={() => handlePageChange(page)}
                                className={`px-3 py-2 font-normal rounded-none ${
                                  currentPage === page
                                    ? 'bg-black text-white'
                                    : 'bg-card border border-gray-300 text-primary hover:bg-gray-50'
                                }`}
                              >
                                {page}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-card border border-gray-300 text-primary hover:bg-gray-50 font-normal rounded-none px-3 py-2 disabled:opacity-50"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-sm text-secondary font-normal">
                      Page {currentPage} of {totalPages}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default HistoryPage
