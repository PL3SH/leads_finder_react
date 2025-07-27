import api from "@/services/api";

export const getLocations = async () => {
    const response = await api.get("/locations?limit=10000")
    console.log("list all locations:", response.data)
    return response.data.map(location => ({
        id: location.id,
        name: location.formatted,
    }))
}

export default getLocations
