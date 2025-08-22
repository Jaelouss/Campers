import type {
  Camper,
  CamperFilters,
  CampersResponse,
} from "@type/camperApiTypes";
import api from "./axiosInstance";

const campersApi = {
  getAll: async (filters: CamperFilters = {}): Promise<CampersResponse> => {
    const params = new URLSearchParams(
      filters as Record<string, string>
    ).toString();
    const response = await api.get<CampersResponse>(`/campers?${params}`);
    return response.data;
  },

  getById: async (id: string): Promise<Camper> => {
    const response = await api.get<Camper>(`/campers/${id}`);
    return response.data;
  },
};

export default campersApi;
