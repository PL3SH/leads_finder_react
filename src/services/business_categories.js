import api from "@/services/api";

export const getBusinessCategories = async () => {
    const response = await api.get("/business-categories?limit=1000")
    return response.data.map(businessCategory => ({
        id: businessCategory.id,
        name: businessCategory.name,
    }))
}

export default getBusinessCategories