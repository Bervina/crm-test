import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leftMenuIsOpened: true,
  headerTitle: 'HOME PAGE',
};

const generalSlice = createSlice({
  name: 'generalSlice',
  initialState,
  reducers: {
    setLeftMenuState: (state, action) => {
      state.leftMenuIsOpened = action.payload;
    },
    setHeaderTitle: (state, action) => {
      state.headerTitle = action.payload;
    },
  },
});

export default generalSlice.reducer;
export const { setLeftMenuState, setHeaderTitle } = generalSlice.actions;
