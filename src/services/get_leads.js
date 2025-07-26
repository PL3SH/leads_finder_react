import api from "@/services/api";
import { ka } from "date-fns/locale/ka";

export const getAllLeads = async (params={}) => {
    // I want to join params in the shape key=value&key2=value2
    const queryString = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
        
    const response = await api.get(`/search-results?${queryString}`);

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
        is_maps_search: lead?.is_maps_search,
        metrics: lead?.performance_metrics,
        in_zoho_crm: lead?.in_zoho_crm,
    };
}

/*
{
 

  [
{
  
  "id": 14,
  "title": "Kat Smart Aesthetics",
  "website": "http://www.katsmartaesthetic.com/",
  "evaluation_score": 100,
  "evaluation_qualitative": "alto",
  "has_contacts": true,
  "contact_count": 94,
  "pagespeed_score": 0,
  "screenshot_path": "screenshots/http_www.katsmartaesthetic.com_.png",
  "emails": [
    "Katsmart@atelieraesthetic.com"
  ],
  "phones": [
    "",
    "+1 646-244-8993",
    "+1 646-249-6852",
    "+1 646-244-8995"
  ],
  "performance_metrics": {
    "cls": 0,
    "fcp": 0,
    "lcp": 0,
    "tbt": 0,
    "tti": 0,
    "seo_score": 0,
    "performance_score": 0,
    "loading_experience": {},
    "accessibility_score": 0,
    "best_practices_score": 0
  },
  "evaluation_analysis": [
    "El sitio web no está disponible, lo que representa una oportunidad máxima para desarrollar un sitio funcional que mejore la visibilidad y accesibilidad del negocio.",
    "Implementar un nuevo sitio web optimizado para Core Web Vitals, asegurando tiempos de carga rápidos y una experiencia de usuario fluida para mejorar el rendimiento.",
    "Desarrollar una estructura SEO sólida desde cero para mejorar la posición en los resultados de búsqueda y aumentar el tráfico orgánico al sitio."
  ],
  "company_website_classification": {
    "url": "http://www.katsmartaesthetic.com/",
    "domain": "katsmartaesthetic.com",
    "reason": "gpt_classification",
    "gpt_used": true,
    "heuristic_score": 20
  },
  "in_zoho_crm": false,
  "is_google_search": true,
  "is_local_search": false,
  "is_maps_search": true,
  "location_city": "Fairbanks",
  "location_state": "Alaska",
  "location_country": "United States",
  "category_name": "Facial Spa"
}
*/