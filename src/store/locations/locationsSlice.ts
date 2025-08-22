import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchLocations } from "./locationsActions";

const initialState: { locations: string[] } = {
  locations: [],
};

const filtersSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchLocations.fulfilled,
      (state, action: PayloadAction<string[]>) => {
        state.locations = action.payload;
      }
    );
  },
});

export default filtersSlice.reducer;
