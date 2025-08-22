import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface FavoriteState {
  favorite: number[];
}

const initialState: FavoriteState = {
  favorite: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    toggleThis: (state, action: PayloadAction<number>) => {
      if (state.favorite.includes(action.payload)) {
        state.favorite = state.favorite.filter(
          (item) => item !== action.payload
        );
      } else {
        state.favorite.push(action.payload);
      }
    },
  },
});

export const { toggleThis } = favoriteSlice.actions;
export default favoriteSlice.reducer;
