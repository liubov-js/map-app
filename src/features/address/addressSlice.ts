import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AddressState {
  markers: any[][],
}

const initialState: AddressState = {
  markers: [],
};

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    add(state, action: PayloadAction<any[]>) {
      state.markers.push(action.payload);
    },
  },
});

export const { add } = addressSlice.actions;

export default addressSlice.reducer;
