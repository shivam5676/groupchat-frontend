import { createSlice } from "@reduxjs/toolkit";

const data = { Allmsg: [] };
const DataSlice = createSlice({
  name: "messagedata",
  initialState: data,
  reducers: {
    addMsg(state, action) {
      const msgTobeAdded = state.Allmsg.find((current) => {
        return current.id === action.payload.id;
      });
      if (msgTobeAdded) {
        return state.Allmsg.push(action.payload);
      }
      return state.Allmsg;
    },
  },
});
export const dataSliceActions = DataSlice.actions;
export default DataSlice.reducer;
