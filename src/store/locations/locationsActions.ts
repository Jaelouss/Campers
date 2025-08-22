import campersApi from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "@store/store";

export const fetchLocations = createAsyncThunk<
  string[],
  void,
  { state: RootState; dispatch: AppDispatch }
>(
  "locations/fetchLocations",
  async (_, { dispatch }) => {
    const data = await campersApi.getAll();

    dispatch({ type: "campers/setCampers", payload: data });

    const uniqueLocations = Array.from(
      new Set(data.items.map((c) => c.location))
    ).map((loc) => loc.split(",").reverse().join(","));

    return uniqueLocations;
  },
  {
    condition: (_, { getState }) => {
      const state = getState();
      return !state.locations.locations.length;
    },
  }
);
