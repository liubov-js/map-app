import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { LatLngExpression } from 'leaflet';

interface Address {
  marker: LatLngExpression,
  title: string,
  description: string,
}

interface MapCenter {
  lat: number,
  lng: number,
}

export interface MapState {
  addresses: Address[],
  center: MapCenter,
}

const initialState: MapState = {
  addresses: [],
  center: {
    lat: 51.505,
    lng: -0.09,
  },
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    add(state, action: PayloadAction<Address>) {
      state.addresses.push(action.payload);
    },
    setCenter(state, action: PayloadAction<MapCenter>) {
      state.center = action.payload;
    },
    reset: () => initialState,
  },
});

export const { add, setCenter, reset } = mapSlice.actions;

export default mapSlice.reducer;
