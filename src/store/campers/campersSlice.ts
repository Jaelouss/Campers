import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Camper, CampersResponse } from "@type/camperApiTypes";
import { fetchCamperById, fetchCampers } from "./campersActions";

interface CampersState {
  items: CampersResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: boolean;
  selected?: Camper;
}

const initialState: CampersState = {
  items: {
    total: 0,
    items: [],
  },
  selected: undefined,
  status: "idle",
  error: false,
};

export const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    setCampers(state, action: PayloadAction<CampersResponse>) {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
        state.error = false;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchCampers.rejected, (state) => {
        state.status = "failed";
        state.error = true;
      })
      .addCase(fetchCamperById.pending, (state) => {
        state.status = "loading";
        state.error = false;
        state.selected = undefined;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selected = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state) => {
        state.status = "failed";
        state.error = true;
        state.selected = undefined;
      });
  },
});
export const { setCampers } = campersSlice.actions;

export default campersSlice.reducer;
