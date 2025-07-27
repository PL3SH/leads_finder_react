import api from "@/services/api";

export const getSearchHistory = async (skip = 0, limit = 10) => {
    const response = await api.get(`/search/params?skip=${skip}&limit=${limit}`);
    return response.data;
};

export default getSearchHistory;
