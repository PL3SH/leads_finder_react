import axios from "axios"

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("authToken")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

// API methods
export const searchAPI = {
  // Search for leads
  searchLeads: async (searchParams) => {
    try {
      const response = await api.post("/search/leads", searchParams)
      return response.data
    } catch (error) {
      console.error("Error searching leads:", error)
      throw error
    }
  },

  // Get search history
  getSearchHistory: async () => {
    try {
      const response = await api.get("/search/history")
      return response.data
    } catch (error) {
      console.error("Error fetching search history:", error)
      throw error
    }
  },

  // Get search by ID
  getSearchById: async (searchId) => {
    try {
      const response = await api.get(`/search/${searchId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching search:", error)
      throw error
    }
  },

  // Delete search
  deleteSearch: async (searchId) => {
    try {
      const response = await api.delete(`/search/${searchId}`)
      return response.data
    } catch (error) {
      console.error("Error deleting search:", error)
      throw error
    }
  },
}

export const leadsAPI = {
  // Get all leads
  getAllLeads: async (filters = {}) => {
    try {
      const response = await api.get("/leads", { params: filters })
      return response.data
    } catch (error) {
      console.error("Error fetching leads:", error)
      throw error
    }
  },

  // Get lead by ID
  getLeadById: async (leadId) => {
    try {
      const response = await api.get(`/leads/${leadId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching lead:", error)
      throw error
    }
  },

  // Update lead
  updateLead: async (leadId, updateData) => {
    try {
      const response = await api.put(`/leads/${leadId}`, updateData)
      return response.data
    } catch (error) {
      console.error("Error updating lead:", error)
      throw error
    }
  },

  // Export lead to Zoho
  exportToZoho: async (leadId) => {
    try {
      const response = await api.post(`/leads/${leadId}/export-zoho`)
      return response.data
    } catch (error) {
      console.error("Error exporting to Zoho:", error)
      throw error
    }
  },

  // Add notes to lead
  addNotes: async (leadId, notes) => {
    try {
      const response = await api.post(`/leads/${leadId}/notes`, { notes })
      return response.data
    } catch (error) {
      console.error("Error adding notes:", error)
      throw error
    }
  },
}

export const analyticsAPI = {
  // Get competitor analysis
  getCompetitorAnalysis: async (businessType, location) => {
    try {
      const response = await api.get("/analytics/competitors", {
        params: { businessType, location },
      })
      return response.data
    } catch (error) {
      console.error("Error fetching competitor analysis:", error)
      throw error
    }
  },

  // Get trend data
  getTrendData: async (businessType, location) => {
    try {
      const response = await api.get("/analytics/trends", {
        params: { businessType, location },
      })
      return response.data
    } catch (error) {
      console.error("Error fetching trend data:", error)
      throw error
    }
  },
}

export default api
