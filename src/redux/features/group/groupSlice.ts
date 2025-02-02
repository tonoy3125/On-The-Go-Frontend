import { TGroup } from "@/types/group.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  group: TGroup | null;
} = {
  group: null,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroupData(state, action: PayloadAction<TGroup | null>) {
      state.group = action.payload;
    },
  },
});

export const { setGroupData } = groupSlice.actions;
export default groupSlice.reducer;
