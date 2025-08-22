import campersApi from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  CampersResponse,
  CamperFilters,
  Camper,
} from "@type/camperApiTypes";
import type { RootState } from "@store/store";
import { setFilters } from "@store/filtersSlice/filtersSlice";

interface FetchCampersArgs {
  params?: Record<string, string>;
  reset?: boolean;
}

export const fetchCampers = createAsyncThunk<
  CampersResponse,
  FetchCampersArgs,
  { state: RootState }
>(
  "campers/fetchCampers",
  async ({ params }, { dispatch }) => {
    const data = await campersApi.getAll(params);
    dispatch(setFilters((params || {}) as CamperFilters));
    return data;
  },
  {
    condition: ({ params, reset }, { getState }) => {
      if (reset) return true;

      const { filters } = getState();
      const currentFilters = filters.current;

      if (!params || Object.keys(params).length === 0) {
        if (Object.keys(currentFilters).length === 0) return false;
        return true;
      }

      return JSON.stringify(params) !== JSON.stringify(currentFilters);
    },
  }
);

export const fetchCamperById = createAsyncThunk<
  Camper,
  string,
  { state: RootState }
>(
  "campers/fetchCamperById",
  async (id) => {
    const data = await campersApi.getById(id);
    return data;
  },
  {
    condition: (id, { getState }) => {
      const { campers } = getState();

      if (campers.selected?.id === id) {
        return false;
      }
      return true;
    },
  }
);
