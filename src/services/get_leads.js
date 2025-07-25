import api from "@/services/api";

export const getAllLeads = async () => {
    const response = await api.get("/search-results?limit=1000")
    console.log("list all leads:", response.data)
    return response.data.map(lead => ({
        id: lead.id,
        businessName: lead?.title,
        category: lead?.category_name,
        phones: lead?.phones,
        emails: lead?.emails,
        address: lead?.address,
        city: lead?.loction_city,
        state: lead?.location_state,
        country: lead?.location_country,
        isInZoho: lead?.is_in_zoho || false,
        source: lead?.source,
        leadScore: lead?.evaluation_score,
        leadType: lead?.evaluation_qualitative,
        website: lead?.website
    }))
}


export const getLeadsDetails = async (id) => {
    const response = await api.get(`/search-results/${id}`);
    const lead = response.data; // object non an array
    console.log("lead:", response.data)
    return {
        id: lead.id,
        businessName: lead?.title,
        snippet: lead?.snippet,
        position: lead?.position,
        rating: lead?.rating,
        address: lead?.address,
        maps_directions_link: lead?.maps_directions_link,
        pagespeed: lead?.pagespeed_score,
        pagespeed_data: lead?.pagespeed_data,
        screenshot_path: lead?.screenshot_path,
        city: lead?.location_city,
        state: lead?.location_state,
        country: lead?.location_country,
        category: lead?.category_name,
        website: lead?.website,
        score: lead?.evaluation_score,
        qualitative: lead?.evaluation_qualitative, 
        analysis: lead?.evaluation_analysis,
        phones: lead?.phones,
        emails: lead?.emails,
        is_google_search: lead?.is_google_search,
        is_local_search: lead?.is_local_search,
        is_maps_search: true,
    };
}

/*
{
 

  [
{
  "title": "For Healthy Pets",
  "website": "no website found",
  "snippet": "",
  "position": 4,
  "rating": 5,
  "address": "5165 Atlanta Hwy, Montgomery, AL 36109",
  "maps_directions_link": "https://serpapi.com/search.json?engine=google_maps&google_domain=google.com&hl=en&place_id=ChIJVTP8hy4qjIgR4VQ7M3ERVA0",
  "pagespeed_score": 0,
  "pagespeed_data": {},
  "screenshot_path": "",
  "emails": [],
  "phones": [
    "(334) 245-3471"
  ],
  "evaluation_score": 100,
  "evaluation_qualitative": "alto",
  "evaluation_analysis": [
    "Sin sitio web + contactos disponibles - Oportunidad máxima",
    "Implementar estrategia SEO básica desde el inicio",
    "Diseñar sitio web optimizado para móviles y rendimiento"
  ],
  "company_website_classification": {},
  "is_google_search": false,
  "is_local_search": false,
  "is_maps_search": true,
  "location_city": "Montgomery",
  "location_state": "Alabama",
  "location_country": "United States",
  "category_name": "pet_supply_store"
}
*/