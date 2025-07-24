import api from "@/services/api";

export const getAllLeads = async () => {
    const response = await api.get("/search-results?limit=1000")

    return response.data.map(lead => ({
        id: lead.id,
        businessName: lead?.title,
        category: lead?.category_name,
        phones: lead?.phones,
        emails: lead?.emails,
        address: lead?.address,
        city: lead?.city,
        state: lead?.state,
        country: lead?.country,
        isInZoho: lead?.is_in_zoho || false,
        source: lead?.source,
        leadScore: lead?.evaluation_score,
        leadType: lead?.evaluation_qualitative,
        website: lead?.website
    }))
}


/*
{
    id: "1",
    businessName: "Sweet Dreams Bakery",
    category: "Bakery",
    phone: "(555) 123-4567",
    email: "info@sweetdreamsbakery.com",
    address: "123 Main St, Atlanta, GA 30309",
    leadScore: 95,
    leadType: "excellent",
    isInZoho: true,
    dateAdded: "2024-01-15",
    city: "Atlanta",
    state: "GA",
    source: "google-maps",
    googleMapsListing: true,
  }
*/