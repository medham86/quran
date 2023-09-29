import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notifyError } from "../../config/notify";
import Api from "../../config/api";

export const fetchLanguages =  createAsyncThunk(
  "quran/fetchLanguages",
  async(_, thunkapi) => {
    try {
      const response = await Api.get("/languages");
     
      return response.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error?.response?.data?.error;
      notifyError(errorMsg);
      return thunkapi.rejectWithValue(errorMsg);
    }
  }
);
export const fetchsuwar =  createAsyncThunk(
  "quran/fetchsuwar",
  async(_, thunkapi) => {
    try {
      const response = await Api.get(`/suwar?language=ar`);
     
      return response.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error?.response?.data?.error;
      notifyError(errorMsg);
      return thunkapi.rejectWithValue(errorMsg);
    }
  }
);
export const fetchRiwayat =  createAsyncThunk(
  "quran/fetchRiwayat",
  async(_, thunkapi) => {
    try {
      const response = await Api.get(`/riwayat?language=ar`);
     
      return response.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error?.response?.data?.error;
      notifyError(errorMsg);
      return thunkapi.rejectWithValue(errorMsg);
    }
  }
);
export const fetchMoshaf =  createAsyncThunk(
  "quran/fetchMoshaf",
  async(_, thunkapi) => {
    try {
      const response = await Api.get(`/moshaf?language=ar`);
     
      return response.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error?.response?.data?.error;
      notifyError(errorMsg);
      return thunkapi.rejectWithValue(errorMsg);
    }
  }
);
export const fetchReciters =  createAsyncThunk(
  "quran/fetchReciters",
  async(_, thunkapi) => {
    try {
      const response = await Api.get(`/reciters?language=ar`);
     
      return response.data;
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || error?.response?.data?.error;
      notifyError(errorMsg);
      return thunkapi.rejectWithValue(errorMsg);
    }
  }
);





const initialState = {
  data: [],
  suwar : [],
  riwayat : [],
  moshaf:[],
  reciters:[]
};

const quran = createSlice({
  name: "quran",
  initialState,
  extraReducers: (builder) => {
      builder.addCase(fetchLanguages.fulfilled, (state, action) => {
        state.data = action.payload 
      })
      builder.addCase(fetchsuwar.fulfilled, (state, action) => {
        state.suwar = action.payload 
      })
      builder.addCase(fetchRiwayat.fulfilled, (state, action) => {
        state.riwayat = action.payload 
      })
      builder.addCase(fetchMoshaf.fulfilled, (state, action) => {
        state.moshaf = action.payload 
      })
      builder.addCase(fetchReciters.fulfilled, (state, action) => {
        state.reciters = action.payload 
      })
  },
});

export const {} = quran.actions;

export default quran.reducer;
