import { createSlice } from "@reduxjs/toolkit";

const data = { Allmsg: {}, groupId: [], groupName: [], isWindowOpen: false };
const DataSlice = createSlice({
  name: "messagedata",
  initialState: data,
  reducers: {
    addMsg(state, action) {
    
     
      const groupNameExist = state.Allmsg[action.payload.groupId];
      const message = action.payload;
      if (groupNameExist) {
        const UpdatedData = [...groupNameExist];
        UpdatedData.push(message);
        console.log("UpdatedData", UpdatedData);
        state.Allmsg[action.payload.groupId] = UpdatedData;
      } else state.Allmsg[action.payload.groupId] = [action.payload];
    },
    addGroupId(state, action) {
      console.log(action.payload);
      state.groupId = action.payload;
    },
    addGroupName(state, action) {
      state.groupName = action.payload;
    },
    activateChatWindow(state) {
      state.isWindowOpen = true;
    },
    deactivateChatWindow(state) {
      state.isWindowOpen = false;
    },
  },
});
export const dataSliceActions = DataSlice.actions;
export default DataSlice.reducer;
