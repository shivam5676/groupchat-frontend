import { createSlice } from "@reduxjs/toolkit";

const data = {
  Allmsg: {},
  groupId: [],
  groupdetails: {},
  groupList: [],
  isWindowOpen: false,
  isLoggedIn: false,
};
const DataSlice = createSlice({
  name: "messagedata",
  initialState: data,
  reducers: {
    addMsg(state, action) {
      const groupNameExist = state.Allmsg[action.payload.groupId];

      const message = action.payload;

      if (groupNameExist) {
        const isMsgIsAlreadyPresent = groupNameExist.find(
          (current) => current.messageid === message.messageid
        );

        if (!isMsgIsAlreadyPresent) {
          const UpdatedData = [...groupNameExist];
          UpdatedData.push(message);

          state.Allmsg[action.payload.groupId] = UpdatedData;
        }
      } else state.Allmsg[action.payload.groupId] = [action.payload];
    },
    addGroupId(state, action) {
      state.groupId = action.payload;
    },
    addGroupList(state, action) {
      const groupArray = [...state.groupList];

      const isGroupPresent = state.groupList.find((current) => {
        return current[0].id === action.payload[0].id;
      });
      if (!isGroupPresent) {
        state.groupList = [...state.groupList, action.payload];
      }
    },
    activateChatWindow(state) {
      state.isWindowOpen = true;
    },
    deactivateChatWindow(state) {
      state.isWindowOpen = false;
    },
    groupDetails(state, action) {
      state.groupdetails = action.payload;
    },
    addGroupName(state, action) {},
    login(state) {
      state.isLoggedIn = true;
    },
    reset(state) {
      state.Allmsg = {};
      state.groupId = [];
      state.groupName = [];
      state.isWindowOpen = false;
      state.isLoggedIn = false;
    },
  },
});
export const dataSliceActions = DataSlice.actions;
export default DataSlice.reducer;
