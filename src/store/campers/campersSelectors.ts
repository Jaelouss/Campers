import type { RootState } from "@store/store";

export const selectCampers = (state: RootState) => state.campers.items;
export const selectCampersLoading = (state: RootState) =>
  state.campers.status === "loading";
export const selectCampersError = (state: RootState) => state.campers.error;
export const selectSelectedCamper = (state: RootState) =>
  state.campers.selected;
