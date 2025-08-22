import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CamperFilters } from "@type/camperApiTypes";
import { type RootState } from "@store/store";

interface FiltersState {
  current: CamperFilters;
}

const initialState: FiltersState = {
  current: {},
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<CamperFilters>) => {
      state.current = action.payload;
    },
    clearFilters: (state) => {
      state.current = {};
    },
  },
});

export const { setFilters, clearFilters } = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters.current;

export default filtersSlice.reducer;
