import campersApi from "@api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async () => {
    const data = await campersApi.getAll();
    const uniqueLocations = Array.from(
      new Set(data?.items.map((c) => c.location))
    );
    return uniqueLocations.map((loc) => loc.split(",").reverse().join(", "));
  }
);
