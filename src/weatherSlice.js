import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchWeather = createAsyncThunk("myThunkFunction", async () => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?lat=30.7327&lon=31.7195&appid=bf4607506d31251ba45192322f6cb9b5"
  );
  console.log(response);
  const temp = Math.round(response.data.main.temp - 273);
  const tempMin = Math.round(response.data.main.temp_min - 273);
  const tempMax = Math.round(response.data.main.temp_max - 273);
  const icon = response.data.weather[0].icon;
  const description = response.data.weather[0].description;
  const weather = {
    temp,
    tempMin,
    tempMax,
    icon,
    description,
  };
  return weather;
});
export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    value: "empty",
    weather: {},
    isLoading: false,
  },
  reducers: {
    changeValue: (state, action) => {
      state.value = "change";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        console.log(state);
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.weather = action.payload;
      });
  },
});
export const { changeValue } = weatherSlice.actions;

export default weatherSlice.reducer;
