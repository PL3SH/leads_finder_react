import api from "@/services/api";

export const getCities = async () => {
    const response = await api.get("/locations?limit=10000")
    return response.data.map(city => ({
        location_id: city.id,
        formatted_name: `${city.city}, ${city.state}, ${city.country}`
    }))
}

export default getCities
