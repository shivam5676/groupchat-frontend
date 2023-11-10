import { createSlice } from "@reduxjs/toolkit";

const data = { Allmsg: [], groupId: [],groupName:[] };
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
    addGroupId(state, action) {
      console.log(action.payload);
      state.groupId = action.payload;
    },
    addGroupName(state,action){
      state.groupName=action.payload
    }
  },
});
export const dataSliceActions = DataSlice.actions;
export default DataSlice.reducer;
